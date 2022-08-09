// 회원가입 컨트롤러

package com.example.music_meet.controller;

import com.example.music_meet.dto.ResetPw;
import com.example.music_meet.dto.ResponseChart;
import com.example.music_meet.dto.User;
import com.example.music_meet.error.SignupErrorForm;
import com.example.music_meet.service.JwtService;
import com.example.music_meet.service.LoginService;
import com.example.music_meet.service.MailService;
import com.example.music_meet.service.UserService;
import com.example.music_meet.util.AES256Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.time.LocalTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Controller
@CrossOrigin("*")
@Slf4j
public class CreateUserController
{
    @Value("${email.key}")
    private String emailKey;
    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private java.sql.Timestamp date;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;// 암호화 객체


    private AES256Util aes256Util;


    //
    // 회원가입
    //
    @RequestMapping(method = RequestMethod.POST, path = "/createuser")
    public ResponseEntity<Object> createAccountFunc(@RequestBody User user)
    {
        SignupErrorForm signupErrorForm = new SignupErrorForm();
        //UserService userService1 = new UserService();
        // 아이디 중복검사
        if (user.isSignUpUserFunc())
        {
            boolean idcheck = userService.isDuplicateIdFunc(user);
            boolean nicknamecheck = userService.isDuplicateNicknameFunc(user);
            boolean emailcheck = userService.isDuplicateEmailFunc(user);
            if (idcheck || nicknamecheck || emailcheck)             // 중복됨
            {
                signupErrorForm.setMsg("1");
                if (idcheck == true)                  // 아이디 중복
                {
                    signupErrorForm.setCode("1");
                }
                else if(nicknamecheck == true)        // 닉네임 중복
                {
                    signupErrorForm.setCode("4");
                }
                else                       // 이메일 중복
                {
                    signupErrorForm.setCode("3");
                }

                return new ResponseEntity<>(signupErrorForm, HttpStatus.BAD_REQUEST);

            }

            else { // 중복이 안됨 ( 아이디 패스워드 정상)

                userService.createUserFunc(user);

                return new ResponseEntity<>(null, HttpStatus.OK);
            }
        }
        else // 유효성 하지 않은 정보들
        {
            //System.out.println("else문 들어옴");
            String errorstr = user.getErrorFunc();
            signupErrorForm.setCode(errorstr);
            signupErrorForm.setMsg("2");
            return new ResponseEntity<>(signupErrorForm, HttpStatus.BAD_REQUEST);

        }


    }

    //
    // 아이디 찾기
    //
    @RequestMapping(path = "/findid", method = RequestMethod.POST)
    public ResponseEntity<Object> findIdfunc(@RequestBody Map<String,String> jsonEmail)
    {
        final String email = jsonEmail.get("email");

        try {
            String id = userService.findIdFunc(email);
            mailService.sendUserIdFunc(id, email);

            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    //
    // 비밀번호 찾기
    //
    @RequestMapping(path = "/findpw", method = RequestMethod.POST)
    public ResponseEntity<Object> findPwfunc(@RequestBody ResetPw json)
    {
        final String id = json.getId();
        final String email = json.getEmail();
        String str;
        try{
            str = userService.checkIdAndEmail(id,email);
            if (str == null) {
                System.out.println("str == null 들어옴");
                return new ResponseEntity<>(HttpStatus.OK);
            }
            mailService.sendUserKeyFunc(email,str);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.OK);
        }

    }

    //
    // ID 조회
    //
    @RequestMapping("/search/id/{userid}")
    public ResponseEntity<Object> searchIdFunc(@PathVariable("userid") String id)
    {

        User user = new User(id);

        if (userService.isDuplicateIdFunc(user) || !user.publicIsID())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        else
            return new ResponseEntity<>(HttpStatus.OK);

    }

    //
    // nickname 조회
    //
    @RequestMapping("/search/nickname/{usernickname}")
    public ResponseEntity<Object> searchNicknameFunc(@PathVariable("usernickname") String nickname)
    {

        User user = new User();
        user.setNickname(nickname);

        if (userService.isDuplicateNicknameFunc(user) || !user.publicIsNickname())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        else
            return new ResponseEntity<>(HttpStatus.OK);

    }

    //
    // email 조회
    //
    @RequestMapping("/search/email/{useremail}")
    public ResponseEntity<Object> searchEmailFunc(@PathVariable("useremail") String email)
    {
        User user = new User(null,"","",email,"");

        if (userService.isDuplicateEmailFunc(user) || !user.publicIsEmail())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(HttpStatus.OK);
    }

    //
    // new 비밀번호를 입력받아서 user테이블의 비밀번호를 수정하는 부분
    //
    @RequestMapping(path="/user/password", method = RequestMethod.PATCH)
    public ResponseEntity<Object> setUserPw(@RequestBody Map<String,String> resetPw)
    {
        int state = 0;
        final String newPw = resetPw.get("newPw");
        String value = null;

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            state = 1;
            value = resetPw.get("encoding_value");
        }
        else
        {
            state = 2;
            value = (String) request.getAttribute("userNum");
        }



        User user = new User();
        user.setPw(newPw);

        if (user.publicIsPw())
        {
            if (state == 1)
            {
                userService.setUserPw(newPw, value,state);
                userService.deletepwAuthFunc(value);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else
            {
                userService.setUserPw(newPw, value, state);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    //
    //  마이페이지에 아이디, 비밀번호, 닉네임, 이미지 출력해주는 컨트롤러
    //
    @RequestMapping(path="/user/myinfo", method = RequestMethod.GET)
    public ResponseEntity<Object> callUserInfo()
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        final String authorization = request.getHeader("authorization");

        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Map<String,String> userMap;
        userMap = jwtService.getClaimsFromJwt(authorization); // userMap에 userNum 추가
        userMap.putAll(userService.findUserInfo(userMap.get("userNum")));

        Map<String,String> findEmailFuncRequestMap = new HashMap<>();
        findEmailFuncRequestMap.put("userNum",userMap.get("userNum"));
        findEmailFuncRequestMap.put("email",null);

        final String email = userService.findEmailFunc(findEmailFuncRequestMap);
        userMap.remove("userNum");
        userMap.put("email",email);

        return new ResponseEntity<>(userMap,HttpStatus.OK);
    }

    //
    // 이메일 바꾸는 API
    //
    @RequestMapping(path="/user/email", method = RequestMethod.PUT)
    public ResponseEntity<Object> changeEmail(@RequestBody Map<String,String> requestValue)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final String newEmail = requestValue.get("email");
        final String encodingEmail;

        final String userNum = (String)request.getAttribute("userNum");

        Map<String, String> userMap = new HashMap<>();
        userMap.putAll( userService.findUserInfo(userNum));

        final String id = userMap.get("id");
        final String email = userMap.get("email");
        final String nickname = userMap.get("nickname");

        try {
            aes256Util = new AES256Util();
            encodingEmail = aes256Util.encrypt(newEmail);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        try {

            Map<String,String> findEmailFuncRequestMap = new HashMap<>();
            findEmailFuncRequestMap.put("userNum",null);
            findEmailFuncRequestMap.put("email",email);

            // 이메일 중복검사(다른 사용자가 사용하면 안되고, 현재 이메일이면 안됨)
            userService.findEmailFunc(findEmailFuncRequestMap);

            // 메일 보내고 emailauth 테이블에 추가하는 함수 호출
            userService.emailAuthFunc(new User(userNum, id,null, newEmail, nickname));

            // 해당 유저의 state를 3번으로 교체
            userService.setUserStateValue(userNum,3);

        }catch (Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // userMap 이용해서 디비에서 바꾸는 부분
        userService.changeUserEmail(userNum , encodingEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //
    //  닉네임 바꾸는 API
    //
    @RequestMapping(path = "/user/nickname", method = RequestMethod.PUT)
    public ResponseEntity changeNickname(@RequestBody Map<String, String> requestNewNickname)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final String userNum = (String) request.getAttribute("userNum");
        final String newNickname = requestNewNickname.get("nickname");

        // 닉네임 중복검사
        if (userService.isDuplicateNicknameFunc(new User(null, null,null,null, newNickname)) == true) // 중복임
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // 닉네임 변경
        if(userService.setUserNickname(userNum, newNickname) == false)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 변경 실패
        else
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 변경 성공

    }

    //
    // 마이페이지에서 이미지 변경하는 컨트롤러 (좀 더 알아보고 구현 예정)
    //
    @RequestMapping(path="/user/image", method = RequestMethod.PUT ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> changeUserImage(@RequestParam(value = "image") MultipartFile image)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final String userNum = (String) request.getAttribute("userNum");
        final String path = System.getProperty("user.dir") + File.separator + "src" + File.separator + "main" + File.separator
                + "resources" + File.separator + "static" + File.separator + "profileimage" + File.separator;
        final String file = new Date().getTime() + "_" + image.getOriginalFilename();

        File newFile = new File(path + file);

        try{
            image.transferTo(newFile);
        } catch (Exception e) {

        }

        // DB에 해당 유저의 이미지 경로 수정
        userService.changeUserImnagePath(userNum, file);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //
    // 회원탈퇴 API
    //
    @RequestMapping(path = "/user", method = RequestMethod.DELETE)
    public ResponseEntity<Object> userExit(@RequestBody Map<String, String> password)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final String userNum = (String) request.getAttribute("userNum");
        final String pw = password.get("password");
        String findPw = userService.findPassWord(userNum);

        if (bCryptPasswordEncoder.matches(pw,findPw))
        {
            userService.setUserStateValue(userNum, 1);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }


    //
    // 차트 호출
    //
    @RequestMapping(path = "/livechart/{site}/{rank}", method = RequestMethod.GET)
    public ResponseEntity<Object> callChart(@PathVariable("site") String site, @PathVariable("rank") String rank)
    {
        String siteCode = null;

        if (site.equals("melon"))
            siteCode = "1";
        else if (site.equals("genie"))
            siteCode = "2";
        else if (site.equals("bugs"))
            siteCode = "3";
        else if (site.equals("flo")) {
            siteCode = "4";
        } else
            {return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}

        ResponseChart responseChart = userService.getChart(siteCode, rank);

        return new ResponseEntity<>(responseChart, HttpStatus.OK);
    }




}


