package com.example.music_meet.controller;


import com.example.music_meet.dto.User;
import com.example.music_meet.service.JwtService;
import com.example.music_meet.service.LoginService;
import com.example.music_meet.util.JwtConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin("*")
@Slf4j
public class LoginController
{
    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @RequestMapping(method = RequestMethod.POST, path = "/user/login")
    public ResponseEntity<Object> loginFunc(@RequestBody User user)
    {
        Map<String,String> map = loginService.getUserPw(user);
        final String encodingPw = map.get("pw");
        final String userNum = map.get("usernum");
        final String nickname = map.get("nickname");

        if (!bCryptPasswordEncoder.matches(user.getPw(), encodingPw))
        {
            System.out.println("로그인 실패");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else
        {
            Map<String,String> responseMap = new HashMap<>();
            responseMap.put("token", jwtService.generateJwtToken(userNum));
            responseMap.put("nickname", nickname);

            return new ResponseEntity<>( responseMap, HttpStatus.CREATED );
        }
    }
}