package com.example.music_meet.controller;

import com.example.music_meet.dto.PlayList;
import com.example.music_meet.service.PlayListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@CrossOrigin("*")
public class PlayListController {

    @Autowired
    private PlayListService playListService;

    //
    // 재생목록 호출.md
    //
    @RequestMapping(value = "/playlist", method = RequestMethod.GET)
    public ResponseEntity<Object> getPlayList() {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));


        playListService.getPlayList(userNum);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //
    // 재생목록에 음악 추가.md
    //
    @RequestMapping(value = "/playlist", method = RequestMethod.POST)
    public ResponseEntity<Object> addPlayListMusic(@RequestBody PlayList playList) {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        if (playListService.addPlayListMusic(userNum, playList.getId())) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    //
    // 재생목록에서 음악 삭제.md
    //
    @RequestMapping(value = "/playlist", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deletePlayListMusic(@RequestParam("id") final int ID) {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        if (playListService.deletePlayListMusic(userNum, ID)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    //
    // 재생목록에 추가할 음악 검색.md
    //
    @RequestMapping(value = "/playlist/search", method = RequestMethod.GET)
    public ResponseEntity<Object> searchPlayListMusic(@RequestParam("keyword") final String KEYWORD) {
        return new ResponseEntity<>(playListService.searchPlayListMusic(KEYWORD), HttpStatus.OK);
    }

    //
    // 재생목록 순서 변경.md
    //
    @RequestMapping(value = "/playlist", method = RequestMethod.PUT)
    public ResponseEntity<Object> modifyPlayListMusic(@RequestBody final String playList) {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        if (playListService.modifyPlayListMusic(userNum, playList)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }


}
