package com.example.music_meet.controller;

import com.example.music_meet.dto.Response.Response_getMusicComment;
import com.example.music_meet.dto.Response.Response_getMusicComment_2;
import com.example.music_meet.dto.Response.Response_getSoundTrackInfo;
import com.example.music_meet.dto.Response.Response_searchSoundTrack_Window;
import com.example.music_meet.service.SoundTrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
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
    @RequestMapping(path = "/music/crawling/{get}", method = RequestMethod.GET)
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
        final int musicNum =  Integer.parseInt(requestMap.get("musicNum"));


        if (soundTrackService.createSoundTrackComment(usernum, musicNum, comment))
            return new ResponseEntity<>(HttpStatus.CREATED);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    //
    // 음악 댓글 수정.md
    //
    @RequestMapping(path = "/music/comment", method = RequestMethod.PUT)
    public ResponseEntity<Object> modifySoundTrackComment(@RequestBody Map<String,String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String)request.getAttribute("userNum"));
        final String comment = requestMap.get("content");
        final int musicCommentNum =  Integer.parseInt(requestMap.get("musicCommentNum"));

       if(soundTrackService.modifySoundTrackComment(userNum, musicCommentNum, comment))
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       else
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);


    }


    //
    // 음악 댓글 삭제.md
    //
    @RequestMapping(path = "/music/comment", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteSoundTrackComment(@RequestBody Map<String,String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int userNum = Integer.parseInt((String)request.getAttribute("userNum"));
        final int musicCommentNum =  Integer.parseInt(requestMap.get("musicCommentNum"));

        if (soundTrackService.deleteSoundTrackComment(userNum, musicCommentNum))
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    //
    // 음악 검색창.md
    //
    @RequestMapping(path = "/music/search/{keyword}", method = RequestMethod.GET)
    public ResponseEntity<Object> searchSoundTrack_Window(@PathVariable("keyword")final String keyword)
    {
        ArrayList<Response_searchSoundTrack_Window> musics = soundTrackService.searchSoundTrack_Window(keyword);

        if (musics.size() == 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(musics,HttpStatus.OK);
    }


    //
    // 음악 정보 호출.md
    //
    @RequestMapping(path = "/music/{musicnum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getSoundTrackInfo(@PathVariable("musicnum")final int musicNum)
    {
        int userNum;
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
            userNum = 0;
        else
            userNum = Integer.parseInt((String)request.getAttribute("userNum"));

        Response_getSoundTrackInfo response_getSoundTrackInfo =  soundTrackService.getSoundTrackInfo(userNum, musicNum);

        if (response_getSoundTrackInfo.getTitle() == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(response_getSoundTrackInfo,HttpStatus.OK);
    }


    //
    // 음악 정보 좋아요.md
    //
    @RequestMapping(path = "/music/vote/{musicNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> addMusicCommentVote(@PathVariable("musicNum")final int musicNum)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final int usernum = Integer.parseInt((String)request.getAttribute("userNum"));

        if (soundTrackService.isSelectVote(usernum, musicNum))
        {
            if (soundTrackService.deleteMusicCommentVote(usernum, musicNum))
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
        else
        {
            if (soundTrackService.addMusicCommentVote(usernum, musicNum))
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }





    }


    //
    // 댓글 호출.md
    //
    @RequestMapping(path = "/music/comment/{musicNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getMusicComment(@PathVariable("musicNum")final int musicNum)
    {

        ArrayList<Response_getMusicComment> getMusicComments = soundTrackService.getMusicComment(musicNum);
        Response_getMusicComment_2 response_getMusicComment_2 = new Response_getMusicComment_2();
        response_getMusicComment_2.setMusicComments(getMusicComments);
        if (getMusicComments.size() == 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(response_getMusicComment_2, HttpStatus.OK);
    }



    //
    // 음악 이미지 파일 리턴.md
    //
    @RequestMapping(path = "/music/image/{imagename}", method = RequestMethod.GET)
    public ResponseEntity<Object> returnSoundTrackImage(@PathVariable("imagename")final int imagename)
    {



        return new ResponseEntity<>(HttpStatus.OK);
    }


    //
    // 음악 파일 리턴.md
    //
    @RequestMapping(path = "/music/file/{filename}", method = RequestMethod.GET)
    public ResponseEntity<Object> returnSoundTrackFile(@PathVariable("filename")final int filename)
    {



        return new ResponseEntity<>(HttpStatus.OK);
    }

}
