// 회원가입 컨트롤러

package com.example.music_meet.Controller;

import com.example.music_meet.AES256Util;
import com.example.music_meet.DTO.ResetPw;
import com.example.music_meet.DTO.User;
import com.example.music_meet.Error.SignupErrorForm;
import com.example.music_meet.Service.UserService;
import com.example.music_meet.Utile.MailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Controller
@CrossOrigin("*")
@Slf4j
public class CreateUserController {
    private AES256Util aes256Util;

    //
    // 회원가입
    //
    @RequestMapping(method = RequestMethod.POST, path = "/createuser")
    public static ResponseEntity<Object> createAccountFunc(@RequestBody User user)
    {
        SignupErrorForm signupErrorForm = new SignupErrorForm();
        UserService userService = new UserService();

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
        UserService userService = new UserService();
        MailService mailService = new MailService();
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
    @RequestMapping(path = "findpw", method = RequestMethod.POST)
    public ResponseEntity<Object> findPwfunc(@RequestBody ResetPw json)
    {
        UserService userService = new UserService();
        final String id = json.getId();
        final String email = json.getEmail();
        String str;
        try{
            str = userService.checkIdAndEmail(id,email);
            if (str ==null)
                return new ResponseEntity<>(HttpStatus.OK);

            MailService mailService = new MailService();
            mailService.sendUserKeyFunc(email,str);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){


            return new ResponseEntity<>(HttpStatus.OK);
        }

    }



    //
    // ID 조회
    //
    @RequestMapping("/search/id/{userid}")
    public ResponseEntity<Object> searchIdFunc(@PathVariable("userid") String id)
    {

        UserService userService = new UserService();
        User user = new User(id);

        if (userService.isDuplicateIdFunc(user))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        else
            return new ResponseEntity<>(HttpStatus.OK);

        // ERROR 11564 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet] 에러가 뜬다면
        // 이 함수의 반환타입을 String 으로 바꾸고 return "";하면 에러가 사라짐
    }

    //
    // nickname 조회
    //
    @RequestMapping("/search/nickname/{usernickname}")
    public ResponseEntity<Object> searchNicknameFunc(@PathVariable("usernickname") String nickname)
    {

        UserService userService = new UserService();
        User user = new User();
        user.setNickname(nickname);

        if (userService.isDuplicateNicknameFunc(user))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        else
            return new ResponseEntity<>(HttpStatus.OK);

        // ERROR 11564 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet] 에러가 뜬다면
        // 이 함수의 반환타입을 String 으로 바꾸고 return "";하면 에러가 사라짐

    }

    //
    // email 조회
    //
    @RequestMapping("/search/email/{useremail}")
    public ResponseEntity<Object> searchEmailFunc(@PathVariable("useremail") String email)
    {
        User user = new User("","",email,"");
        UserService userService = new UserService();

        if (userService.isDuplicateEmailFunc(user))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(HttpStatus.OK);
    }

    //
    // 테스트
    //
    @RequestMapping(path = "/test", method = RequestMethod.POST)
    public void testFunc(@RequestBody User user)
    {
        UserService userService = new UserService();


    }



}


