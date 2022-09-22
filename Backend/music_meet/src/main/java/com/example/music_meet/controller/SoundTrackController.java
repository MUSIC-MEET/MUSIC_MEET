package com.example.music_meet.controller;

import com.example.music_meet.dto.Response.Response_searchSoundTrack_Window;
import com.example.music_meet.service.SoundTrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Map;

@Controller
@CrossOrigin("*")
public class SoundTrackController
{
    @Autowired
    private SoundTrackService soundTrackService;

    //
    // 뮤직 크롤링 실행.md
    //
    @RequestMapping(path = "/music/{get}", method = RequestMethod.GET)
    public ResponseEntity<Object> startMusicCrawling(@PathVariable("get")final String key)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (Integer.parseInt((String) request.getAttribute("userNum")) == 2 && key.equals("music_meet"))
        {
            if (soundTrackService.start())
                return new ResponseEntity<>(HttpStatus.OK);          // 성공
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 실패
        }
        else
        {
            System.out.println("누군가 music 크롤링에 접근 !!!");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }


    //
    // 음악 댓글 작성.md
    //
    @RequestMapping(path = "/music/comment", method = RequestMethod.POST)
    public ResponseEntity<Object> createSoundTrackComment(@RequestBody Map<String,String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int usernum = Integer.parseInt((String)request.getAttribute("userNum"));
        final String comment = requestMap.get("content");
        final int musicNum =  Integer.parseInt(requestMap.get("musicnum"));


        soundTrackService.createSoundTrackComment(usernum, musicNum, comment);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    //
    // 음악 검색창.md
    //
    @RequestMapping(path = "/music/search/{keyword}", method = RequestMethod.GET)
    public ResponseEntity<Object> searchSoundTrack_Window(@PathVariable("keyword")final String keyword)
    {
        ArrayList<Response_searchSoundTrack_Window> musics = soundTrackService.searchSoundTrack_Window(keyword);

        if (musics.size() == 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(musics,HttpStatus.OK);
    }







}
