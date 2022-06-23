package com.example.music_meet.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EmailAuthController {

    private String str = null;
    //private AES256Util aes256Util = new AES256Util();

    @RequestMapping(path = "/auth/")
    public void EmailAuthFunc(@PathVariable("useremail") String email)
    {


    }



}
