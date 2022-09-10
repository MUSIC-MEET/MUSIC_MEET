package com.example.music_meet.controller;

import com.example.music_meet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin("*")
public class EmailAuthController {

    @Autowired
    private UserService userService;

    //
    // 이메일 인증 컨트롤러
    //
    @RequestMapping(path = "/auth/id/{keyValue}")
    public ResponseEntity<Object> emailAuthForIdFunc(@PathVariable("keyValue") String value)
    {
        try {
            userService.responseEmailAuthFunc(value);   // 인코딩 값 확인
            userService.setUserStateFunc(value);        // 인코딩 값 인증 완료이므로 user의 state를 이메일 인증 확인 상태로 바꿈
            userService.deleteEmailAuthFunc(value);     // emailauth 테이블에서 해당 인코딩 값을 삭제함

            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            System.out.println("EmailAuthController -> emailAuthForIdFunc에서 예외처리로 빠짐");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    //
    // 비밀번호 찾기 이메일 인증 컨트롤러
    //
    @RequestMapping(path = "/auth/pw/{keyValue}")
    public ResponseEntity<Object> emailAuthForPwFunc(@PathVariable("keyValue") String value)
    {
        if (userService.responsePwEmailAuthFunc(value) == true)
           return new ResponseEntity<>(HttpStatus.OK);
        else
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }





}
