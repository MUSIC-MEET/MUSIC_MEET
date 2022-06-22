// 회원가입 컨트롤러

package com.example.music_meet.Controller;

import com.example.music_meet.DTO.User;
import com.example.music_meet.Error.SignupErrorForm;
import com.example.music_meet.Service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin("*")
@Slf4j
public class CreateUserController {


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
            boolean idcheck = userService.findIdFunc(user);
            boolean nicknamecheck = userService.findNicknameFunc(user);

            if (idcheck || nicknamecheck) // 중복됨
            {
                signupErrorForm.setMsg("1");
                if (idcheck == true) // 아이디 중복
                {
                    signupErrorForm.setCode("1");
                }
                else        // 닉네임 중복
                {
                    signupErrorForm.setCode("4");
                }
                return new ResponseEntity<>(signupErrorForm, HttpStatus.BAD_REQUEST);

            }

            else { // 중복이 안됨 ( 아이디 패스워드 정상)

                userService.encodingFunc(user);
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
    // ID 조회
    //
    @RequestMapping("/search/id/{userid}")
    public ResponseEntity<Object> searchIdFunc(@PathVariable("userid") String id)
    {

        UserService userService = new UserService();
        User user = new User(id);

        if (userService.findIdFunc(user))
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

        if (userService.findNicknameFunc(user))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        else
            return new ResponseEntity<>(HttpStatus.OK);

        // ERROR 11564 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet] 에러가 뜬다면
        // 이 함수의 반환타입을 String 으로 바꾸고 return "";하면 에러가 사라짐

    }






    //
    // 테스트
    //
    @RequestMapping(path = "/test", method = RequestMethod.POST)
    public void testFunc(@RequestBody User user)
    {

    }



}


