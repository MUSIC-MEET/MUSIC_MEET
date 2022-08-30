package com.example.music_meet.controller;

import com.example.music_meet.dto.Request.Request_boardCommentVote;
import com.example.music_meet.dto.Request.Request_createBoardComment;
import com.example.music_meet.dto.Response.Response_GetBoardCommentList;
import com.example.music_meet.service.CommentService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class CommentController
{
    @Autowired
    private CommentService commentService;



    //
    // 댓글 작성.md
    //
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
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

    //
    // 댓글 호출.md
    //
    @RequestMapping(path = "/board/comment/{genre}/{boardnum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getBoardCommentList(@PathVariable("genre") String genre, @PathVariable("boardnum") int boardNum)
    {
        ArrayList<Response_GetBoardCommentList> comments = commentService.getBoardCommentList(genre, boardNum);
        if (comments.get(0).getCommentNum() == -1)
            return new ResponseEntity<>(comments,HttpStatus.BAD_REQUEST);
        else if (comments.size() != 0)
            return new ResponseEntity<>(comments, HttpStatus.OK);
        else
        {
            comments = null;
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
    }

    //
    // 댓글 추천, 비추천 선택.md
    //
    @RequestMapping(path = "/board/comment/vote", method = RequestMethod.PUT)
    public ResponseEntity<Object> boardCommentVote(@RequestBody Request_boardCommentVote request_boardCommentVote)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (commentService.boardCommentVote(request_boardCommentVote))
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //
    // 댓글 수정.md
    //
    @RequestMapping(path = "/board/comment", method = RequestMethod.PUT)
    public ResponseEntity<Object> modifyboardComment(@RequestBody Map<String, String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt( (String)request.getAttribute("userNum"));
        final String genre = requestMap.get("genre");
        final String content = requestMap.get("content");
        final int commentNum = Integer.parseInt(requestMap.get("commentNum"));

        if (commentService.modifyboardComment(genre, userNum, content, commentNum))
            return new ResponseEntity<>(HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }


    //
    // 댓글 삭제.md
    //
    @RequestMapping(path = "/board/comment", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteboardComment(@RequestBody Map<String, String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt( (String)request.getAttribute("userNum"));
        final String genre = requestMap.get("genre");
        final int commentNum = Integer.parseInt(requestMap.get("commentNum"));

        if (commentService.deleteBoardComment(genre,userNum,commentNum))
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
