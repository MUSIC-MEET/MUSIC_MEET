package com.example.music_meet.controller;

import com.example.music_meet.dto.Request.RequestWriteGenreBoard;
import com.example.music_meet.service.BoardService;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class BoardController
{
    @Autowired
    private BoardService boardService;


    private RequestWriteGenreBoard requestWriteGenreBoard;









    @RequestMapping( path = "/genreboard", method = RequestMethod.POST)
    public ResponseEntity<Object> CreateGenreBoard(@RequestBody Map<String,String> reqeustMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final String genre = reqeustMap.get("genre");
        final String title = reqeustMap.get("title");
        final String content = reqeustMap.get("content");
        final int usernum = (int) request.getAttribute("userNum");

        requestWriteGenreBoard = new RequestWriteGenreBoard(genre,title,content,usernum);

        boardService.WriteGenreBoard(requestWriteGenreBoard);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
