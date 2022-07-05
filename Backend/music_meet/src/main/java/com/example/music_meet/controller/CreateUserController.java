// 회원가입 컨트롤러

package com.example.music_meet.controller;

import com.example.music_meet.service.JwtService;
import com.example.music_meet.service.LoginService;
import com.example.music_meet.dto.ResetPw;
import com.example.music_meet.dto.User;
import com.example.music_meet.error.SignupErrorForm;
import com.example.music_meet.service.UserService;
import com.example.music_meet.service.MailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }




    //
    // 테스트
    //
    @RequestMapping(path = "/test", method = RequestMethod.POST)
    public void testFunc(@RequestBody Map<String, String> token)
    {
        final String jwt = token.get("jwtToken");
        Map<String, String> map;
        map = loginService.loginStateCheck(jwt);


        JwtService jwtService = new JwtService();
        jwtService.validateToken(jwt);
    }


}


