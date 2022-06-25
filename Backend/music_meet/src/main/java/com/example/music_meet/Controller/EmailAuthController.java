package com.example.music_meet.Controller;

import com.example.music_meet.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin("*")
public class EmailAuthController {

    UserService userService = new UserService();

    //
    // 이메일 인증 컨트롤러
    //
    @RequestMapping(path = "/auth/id/{keyValue}")
    public ResponseEntity<Object> emailAuthForIdFunc(@PathVariable("keyValue") String value)
    {
        try {
            userService.responseEmailAuthFunc(value);
            userService.setUserStateFunc(value);
            userService.deleteEmailAuthFunc(value);

            return new ResponseEntity<>(null, HttpStatus.OK);
        }catch (Exception e) {
            System.out.println("EmailAuthController -> EmailAuthFunc에서 예외처리로 빠짐");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    //
    // 비밀번호 찾기 이메일 인증 컨트롤러
    //
    @RequestMapping(path = "/auth/pw/{keyValue}")
    public ResponseEntity<Object> emailAuthForPwFunc(@PathVariable("keyValue") String value)
    {
        if (userService.responsePwEmailAuthFunc(value) == true)
           return new ResponseEntity<>(null, HttpStatus.OK);
        else
           return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

}
