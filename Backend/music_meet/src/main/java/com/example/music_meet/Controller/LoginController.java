package com.example.music_meet.Controller;


import com.example.music_meet.DTO.User;
import com.example.music_meet.Service.LoginService;
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
