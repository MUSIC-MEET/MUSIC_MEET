package com.example.music_meet.controller;

import JPA.Upload;
import com.example.music_meet.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
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
    // 개별 업로드 글 조회_요약.md
    //
    @RequestMapping(value = "/cover/summary/{uploadNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserUploadSmall(@PathVariable("uploadNum") final int uploadNum){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        Map<String, String> map = uploadService.getUserUploadSmall(userNum, uploadNum);
        if (map.get("title") == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(map, HttpStatus.OK);
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
    @RequestMapping(value = "/cover/{uploadNum}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> changeUploadState(@PathVariable("uploadNum") final int uploadNum){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        if (uploadService.changUploadState(userNum, uploadNum)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }



    /**
     * 개별 업로드 글 수정.md
     * @param uploadNum 업로드 글 고유 번호
     * @param title 업로드 글 제목
     * @param description 글 내용(설명)
     * @param mp3File fileObject (없을 수도 있음)
     * @param fileName String 타입의 파일 이름(무조건 존재 DB에서 origin_file) 따로 가공해야됨
     * @return
     */
    @RequestMapping(value = "/cover/{uploadNum}", method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> modifyUpload(@PathVariable("uploadNum") final int uploadNum,
                                               @RequestParam("title")final String title,
                                               @RequestParam("description")final String description,
                                               @RequestParam("mp3File")final MultipartFile mp3File,
                                               @RequestParam("fileName")final String fileName) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));

        Map<String, String> map = uploadService.getFileName(userNum, uploadNum, fileName);

        if (map.get("origin_file").equals(fileName)){
            uploadService.modifyUpload(userNum, uploadNum, title, description, mp3File,null);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            
            if (uploadService.deleteMp3File(map.get("file")) &&
                    uploadService.modifyUpload(userNum, uploadNum, title, description, mp3File, fileName)){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }



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




    //
    // 개별 업로드 댓글 수정.md
    //
    @RequestMapping(value = "/cover/comment/{uploadCommentNum}", method = RequestMethod.PUT)
    public ResponseEntity<Object> changeUploadComment(@PathVariable("uploadCommentNum") final int uploadCommentNum,
                                                      @RequestBody final Map<String, String> requestMap){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));
        final String comment = requestMap.get("comment");

        if (uploadService.modifyUploadCommentState(uploadCommentNum, userNum,comment)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }



    //
    // 개별 업로드 댓글 삭제.md
    //
    @RequestMapping(value = "/cover/comment/{uploadCommentNum}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUploadComment(@PathVariable("uploadCommentNum") final int uploadCommentNum){

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));
        if (uploadService.deleteUploadComment(uploadCommentNum, userNum)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    //
    // 메인페이지 유저 업로드 인기.md
    //
    @RequestMapping(value = "/cover/popular/{num}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUploadListVote(@PathVariable("num") final int num){
        ArrayList<Map<String , String>> uploads;
        uploads = uploadService.getUploadListForMain(num, "popular");
        return new ResponseEntity<>(uploads, HttpStatus.OK);
    }

    //
    // 메인페이지 유저 업로드 최신.md
    //
    @RequestMapping(value = "/cover/latest/{num}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUploadList(@PathVariable("num") final int num){
        ArrayList<Map<String , String>> uploads;
        uploads = uploadService.getUploadListForMain(num, "latest");
        return new ResponseEntity<>(uploads, HttpStatus.OK);
    }

}
