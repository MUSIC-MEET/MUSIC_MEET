package com.example.music_meet.controller;

import com.example.music_meet.MusicCrawling.MusicCrawlingBot;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin("*")
public class TestController {

    private MusicCrawlingBot musicCrawlingBot = new MusicCrawlingBot();


    //
    // 테스트
    //
    @RequestMapping(path = "/tests", method = RequestMethod.GET)
    public ResponseEntity<Object> test()
    {
        musicCrawlingBot.start();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
