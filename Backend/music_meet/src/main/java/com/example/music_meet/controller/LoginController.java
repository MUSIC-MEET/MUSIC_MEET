package com.example.music_meet.controller;


import com.example.music_meet.dto.User;
import com.example.music_meet.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@Slf4j
public class LoginController {

    public LoginService loginService = new LoginService();

    @RequestMapping(method = RequestMethod.POST, path = "/login")
    public String loginFunc(@RequestBody User user)
    {
        System.out.println(user);
        String str = loginService.loginFunc(user.getId(), user.getPw());

        return str;
    }

}
