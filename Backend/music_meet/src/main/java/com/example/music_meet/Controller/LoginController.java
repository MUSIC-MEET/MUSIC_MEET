package com.example.music_meet.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@CrossOrigin("*")
public class LoginController {

    @RequestMapping("/login/{userid}{uesrpw}")
    public String loginFunc(@PathVariable("userid") String id, @PathVariable("userpw") String pw)
    {
        String str = loginFunc(id,pw);

        return "";
    }




}
