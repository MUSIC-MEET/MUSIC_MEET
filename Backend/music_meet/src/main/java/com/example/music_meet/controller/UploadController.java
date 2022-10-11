package com.example.music_meet.controller;

import JPA.Upload;
import com.example.music_meet.service.UploadService;
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
public class UploadController {

    @Autowired
    private UploadService uploadService;


    //
    // 개별 업로드 글 조회.md
    //
    @RequestMapping(value = "/cover/{uploadNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserUpload(@PathVariable("uploadNum") final int uploadNum){
        int usernum;
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            usernum = -1;
        }
        else {
            usernum = Integer.parseInt((String) request.getAttribute("userNum"));
        }

        Upload upload = uploadService.getUserUpload(uploadNum, usernum);
        if (upload.getId() == -100){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(upload ,HttpStatus.OK);
        }
    }


    //
    // 개별 업로드 글 목록 조회.md
    //
    @RequestMapping(value = "/cover/list/{page}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserUploadList(@PathVariable("page") final int page){
        return new ResponseEntity<>(uploadService.getUploadList(page), HttpStatus.OK);
    }




    //
    // 개별 업로드 글 삭제.md
    //
    @RequestMapping(value = "/cover/{uploadNum}", method = RequestMethod.PUT)
    public ResponseEntity<Object> changeUploadState(@PathVariable("uploadNum") final int uploadNum){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        int voteState;
        if (uploadService.getUploadState(uploadNum) == 0){
            voteState = 1;
        }else {
            voteState = 0;
        }
        System.out.println(voteState);
        if (uploadService.changUploadState(userNum, uploadNum, voteState)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


    //
    // 개별 업로드 글 수정.md
    //




    //
    // 개별 업로드 글 좋아요.md
    //
    @RequestMapping(value = "/cover/vote/{num}", method = RequestMethod.PUT)
    public ResponseEntity<Object> addUploadVote(@PathVariable("num") final int uploadNum){

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        //검사
        if (uploadService.isUploadVote(uploadNum, userNum) >= 1){
            uploadService.patchVote(uploadNum, -1);
            uploadService.deleteUploadVote(uploadNum, userNum);
        }
        else {
            uploadService.patchVote(uploadNum, 1);
            uploadService.createUploadVote(uploadNum, userNum);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //
    // 개별 업로드 글 댓글 작성.md
    //
    @RequestMapping(value = "/cover/comment", method = RequestMethod.POST)
    public ResponseEntity<Object> addUploadComment(@RequestBody Map<String, String> requestMap){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));
        final int uploadNum = Integer.parseInt(requestMap.get("uploadNum"));
        final String comment = requestMap.get("comment");

        if (uploadService.addUploadComment(userNum, uploadNum, comment)){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }






    //
    // 개별 업로드 댓글 호출.md
    //
    @RequestMapping(value = "/cover/{uploadNum}/comment", method = RequestMethod.GET)
    public ResponseEntity<Object> getUploadComment(@PathVariable("uploadNum") final int uploadNum){

        return new ResponseEntity<>(uploadService.getUploadComment(uploadNum) , HttpStatus.OK);
    }


}
