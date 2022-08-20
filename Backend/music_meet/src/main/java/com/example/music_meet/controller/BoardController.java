package com.example.music_meet.controller;

import com.example.music_meet.dto.Request.Request_WriteGenreBoard;
import com.example.music_meet.dto.Response.Response_getBoardForGenreNum;
import com.example.music_meet.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin("*")
@Slf4j
public class BoardController
{
    @Autowired
    private BoardService boardService;

    private Request_WriteGenreBoard requestWriteGenreBoard;

    @Value("${server.url}")
    private String serverURL;

    @Value("${server.port}")
    private String serverPort;

    //@Value("${file.image.temp}")
    private String temp = System.getProperty("user.dir") + File.separator + "temp" + File.separator;






    //
    // 장르게시판 글 작성하는 API
    //
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
        final int usernum = Integer.parseInt((String) request.getAttribute("userNum"));

        requestWriteGenreBoard = new Request_WriteGenreBoard(genre,title,content,usernum);

        boardService.WriteGenreBoard(requestWriteGenreBoard);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //
    //  장르 게시판에 글 작성할 때 이미지 추가할 경우에 사용되는 API
    //  이미지를 받아서 temp에 저장하는 기능을 함
    @RequestMapping( path = "/genreboard/image", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> GenreBoarImage(@RequestParam(value = "image") MultipartFile image)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final String file = new Date().getTime() + "_" + image.getOriginalFilename();

        File newFile = new File(temp + file);
        try{
            image.transferTo(newFile);
        } catch (Exception e) {

        }

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("imgSrc", serverURL + ":" + serverPort + "/image/" + file);

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    //
    // 해당 장르의 글들을 페이지에 뿌려주는 API
    //
    @RequestMapping( path = "/board/{genre}", method = RequestMethod.POST)
    public ResponseEntity<Object> getGenreBoarList()
    {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //
    // 해당 장르의 특정 번호의 글을 불러오는 API
    //
    @RequestMapping(path = "/board/{genre}/{num}", method = RequestMethod.GET)
    public ResponseEntity<Object> getBoardForGenreNum(@PathVariable("genre") final String genre, @PathVariable("num") final String num)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final String userNum = (String) request.getAttribute("userNum");
        Response_getBoardForGenreNum response_getBoardForGenreNum = new Response_getBoardForGenreNum();

        Map<String, String> map = boardService.getBoardForGenreNum(genre, num);

        response_getBoardForGenreNum.setUserimage( serverURL + ":" + serverPort + "/" + "user" + "/" + "image" + "/" + map.get("userimage"));
        response_getBoardForGenreNum.setTitle(map.get("title"));
        response_getBoardForGenreNum.setContent(map.get("content"));
        response_getBoardForGenreNum.setView(Integer.parseInt(map.get("view")));
        response_getBoardForGenreNum.setCreatedat(map.get("createdat"));
        response_getBoardForGenreNum.setVote(Integer.parseInt(map.get("vote")));

        return new ResponseEntity<>(response_getBoardForGenreNum, HttpStatus.OK);
    }




}
