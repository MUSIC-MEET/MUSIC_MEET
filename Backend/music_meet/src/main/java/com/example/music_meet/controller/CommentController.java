package com.example.music_meet.controller;

import com.example.music_meet.dto.Request.Request_boardCommentVote;
import com.example.music_meet.dto.Request.Request_createBoardComment;
import com.example.music_meet.dto.Response.Response_GetBoardCommentList_Comment;
import com.example.music_meet.dto.Response.Response_getBoardCommentList_Comments;
import com.example.music_meet.service.CommentService;
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
        ArrayList<Response_GetBoardCommentList_Comment> comments = commentService.getBoardCommentList(genre, boardNum);
        Response_getBoardCommentList_Comments responseComments = new Response_getBoardCommentList_Comments();

        if (comments == null)   // 글이 없음
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else                    // 정상
        {
            responseComments.setComments(comments);
            return new ResponseEntity<>(responseComments, HttpStatus.OK);
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

        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        String sql = "";

        if (commentService.isSelectVote(userNum, request_boardCommentVote) == 2) // 2면 없음, 있으면 1 or 0임
        {
            commentService.insertVoteTable(userNum, request_boardCommentVote);

            if (request_boardCommentVote.getVote().equals("upvote"))
            {
                sql = "UPDATE " + request_boardCommentVote.getGenre() + "comment SET upvote = upvote + 1 WHERE commentnum = ? AND state = 0";
            }
            else if (request_boardCommentVote.getVote().equals("downvote"))
            {
                sql = "UPDATE " + request_boardCommentVote.getGenre() + "comment SET downvote = downvote + 1 WHERE commentnum = ? AND state = 0";
            }
            else
            {
                sql = null;
            }

            commentService.boardCommentVote(sql, request_boardCommentVote);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
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
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
