package com.example.music_meet.controller;

import com.example.music_meet.service.PlayListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin("*")
public class PlayListController {

    @Autowired
    private PlayListService playListService;

    //
    // 재생목록 호출하는 API
    //
    @RequestMapping(value = "/playlist", method = RequestMethod.GET)
    public ResponseEntity<Object> getPlayList(){

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));


        playListService.getPlayList(userNum);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //
    // 재생목록에 노래 추가하는 API
    //
    @RequestMapping(value = "/playlist", method = RequestMethod.POST)
    public ResponseEntity<Object> addPlayListMusic(@RequestParam("id")final int ID){

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        if (playListService.addPlayListMusic(userNum, ID)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }



    }
}
