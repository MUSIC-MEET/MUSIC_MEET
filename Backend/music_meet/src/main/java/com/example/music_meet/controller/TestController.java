package com.example.music_meet.controller;

import com.example.music_meet.service.MusicCrawlingBotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin("*")
public class TestController {

    private MusicCrawlingBotService musicCrawlingBot = new MusicCrawlingBotService();


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
