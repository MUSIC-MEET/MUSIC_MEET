package com.example.music_meet.controller;

import com.example.music_meet.dto.Request.Request_createBoardComment;
import com.example.music_meet.service.CommentService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@CrossOrigin("*")
@Slf4j
public class CommentController
{
    private CommentService commentService = new CommentService();




    @RequestMapping(path = "/board/comment", method = RequestMethod.POST)
    public ResponseEntity<Object> createBoardComment(@RequestBody Map<String,String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt( (String) request.getAttribute("userNum"));
        final String genre = requestMap.get("genre");
        final int boardNum = Integer.parseInt(requestMap.get("boardNum"));
        final String comment = requestMap.get("comment");

        if (commentService.createBoardComment(new Request_createBoardComment(genre,boardNum, userNum,comment)))
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
