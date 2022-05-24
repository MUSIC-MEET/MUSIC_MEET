// 회원가입 컨트롤러

package com.example.music_meet.Controller;


import com.example.music_meet.Model.Account;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@CrossOrigin("*")
public class CreateAccount {


    @RequestMapping(method = RequestMethod.POST, path = "/createaccount")
    public String createAccountFunc(@RequestBody Account re)
    {


        return "";
    }
}


