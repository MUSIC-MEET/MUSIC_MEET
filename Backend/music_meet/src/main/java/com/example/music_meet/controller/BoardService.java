package com.example.music_meet.controller;

import com.example.music_meet.dto.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@CrossOrigin("*")
@Slf4j
public class BoardService
{
    @RequestMapping( path = "/genreboard/{genre}/{num}", method = RequestMethod.POST)
    public ResponseEntity<Object> createAccountFunc(@RequestParam("genre")String genre, @RequestParam("num")String num, @RequestBody Map<String, String> ReqeustMap)
    {



        return new ResponseEntity<>(HttpStatus.OK);
    }

}
