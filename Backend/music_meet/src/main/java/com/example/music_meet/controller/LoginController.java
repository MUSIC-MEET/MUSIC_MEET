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

    //
    //  로그인.md
    //
    @RequestMapping(method = RequestMethod.POST, path = "/user/login")
    public ResponseEntity<Object> loginFunc(@RequestBody User user)
    {
        Map<String,String> map = loginService.getUserPw(user);
        final String encodingPw = map.get("pw");
        final String userNum = map.get("userNum");
        final String nickname = map.get("nickName");
        final String userState = map.get("userState");

        if (bCryptPasswordEncoder.matches(user.getPw(), encodingPw) && userState.equals("0"))     // 로그인 성공
        {
            Map<String,String> responseMap = new HashMap<>();
            responseMap.put("token", jwtService.generateJwtToken(userNum));                       // 토큰 생성
            responseMap.put("nickname", nickname);

            return new ResponseEntity<>( responseMap, HttpStatus.CREATED );
        }
        else                                                                                      // 로그인 실패
        {
            if (bCryptPasswordEncoder.matches(user.getPw(), encodingPw) && userState.equals("3")) // 이메일 미인증 상태
            {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED );
            }
            else                                                                                  // 나머지 이메일 인증 실패
            {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

    }
}