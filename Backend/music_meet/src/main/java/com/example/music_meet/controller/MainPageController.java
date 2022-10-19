package com.example.music_meet.controller;


import com.example.music_meet.service.MainPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class MainPageController {

    @Autowired
    private MainPageService mainPageService;




}
