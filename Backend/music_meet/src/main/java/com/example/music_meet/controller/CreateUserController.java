// 회원가입 컨트롤러

package com.example.music_meet.controller;

import com.example.music_meet.dto.ResetPw;
import com.example.music_meet.dto.User;
import com.example.music_meet.error.SignupErrorForm;
import com.example.music_meet.service.JwtService;
import com.example.music_meet.service.LoginService;
import com.example.music_meet.service.MailService;
import com.example.music_meet.service.UserService;
import com.example.music_meet.util.AES256Util;
import com.example.music_meet.util.CustomAnnotationConfig;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.condition.ProducesRequestCondition;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.Map;


@Controller
@CrossOrigin("*")
@Slf4j
public class CreateUserController
{

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtService jwtService;


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
    @RequestMapping(path="/resetpw", method = RequestMethod.POST)
    public ResponseEntity<Object> setUserPw(@RequestBody ResetPw resetPw)
    {
        User user = new User();

        user.setPw(resetPw.getNewPw());
        if (user.publicIsPw())
        {
            userService.setUserPw(resetPw);
            userService.deletepwAuthFunc(resetPw.getEncoding_value());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //
    //  마이페이지에 아이디, 비밀번호, 닉네임 출력해주는 컨트롤러
    //
    //@CustomAnnotationConfig.jwtCheck
    @RequestMapping(path="/user/myinfo", method = RequestMethod.GET)
    public ResponseEntity<Object> callUserInfo()
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        final String authorization = request.getHeader("authorization");

        Map<String,String> userMap;
        userMap = jwtService.getClaimsFromJwt(authorization);
        userMap.putAll(userService.findUserInfo(userMap.get("userNum")));

        if (userMap.get("id") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else
        {
            final String email = userService.findEmailFunc(userMap.get("userNum"));
            userMap.remove("userNum");
            userMap.put("email",email);
            return new ResponseEntity<>(userMap,HttpStatus.OK);
        }
    }

    //
    // 이메일 바꾸는 API
    //
    //@CustomAnnotationConfig.jwtCheck
    @RequestMapping(path="/user/email", method = RequestMethod.PUT)
    public ResponseEntity<Object> changeEmail(@RequestBody final String email)
    {
        final String encodingEmail;
        try {
            encodingEmail = aes256Util.encrypt(email);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        final String authorization = request.getHeader("authorization");
        Map<String, String> userMap;
        // 이메일 중복 검사
        try {
            userMap = userService.findUserInfo(authorization);
            String findEmail = userService.findEmailFunc(email);

            if (!(userMap.get("email") == null) && !(findEmail == null))
            {


            }

            //mailService.registerAuthSendMailFunc();
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // 메일 발송



        // userMap 이용해서 디비에서 바꾸는
        userService.changeUserEmail(authorization , encodingEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //
    //
    //







    //
    // 마이페이지에서 이미지 변경하는 컨트롤러 (좀 더 알아보고 구현 예정)
    //
    @CustomAnnotationConfig.jwtCheck
    @RequestMapping(path="/user/change/image", method = RequestMethod.GET)
    public ResponseEntity<Object> changeUserImage(@RequestBody JsonObject jsonObject)
    {
        jsonObject.get("image");

        return new ResponseEntity<>(HttpStatus.OK);
    }
    //
    // 테스트
    //
    @RequestMapping(path = "/testtttttt", method = RequestMethod.POST)
    public void testFunc(@RequestBody Map<String, String> token)
    {

    }


}


