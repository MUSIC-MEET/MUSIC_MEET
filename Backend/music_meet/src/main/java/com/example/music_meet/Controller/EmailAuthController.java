package com.example.music_meet.Controller;

import com.example.music_meet.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EmailAuthController {

    UserService userService = new UserService();

    @RequestMapping(path = "/auth/{keyValue}")
    public ResponseEntity<Object> EmailAuthFunc(@PathVariable("keyValue") String value)
    {
        try {
            userService.responseEmailAuthFunc(value);
            userService.setUserState(value);

            return new ResponseEntity<>(null, HttpStatus.OK);
        }catch (Exception e) {
            System.out.println("EmailAuthController -> EmailAuthFunc에서 예외처리로 빠짐");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

}
