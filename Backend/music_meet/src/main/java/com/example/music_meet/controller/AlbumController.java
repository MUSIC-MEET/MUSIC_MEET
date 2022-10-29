package com.example.music_meet.controller;

import com.example.music_meet.dto.Response.Response_getMusicComment;
import com.example.music_meet.dto.Response.Response_getSoundTrackInfo;
import com.example.music_meet.dto.Response.Response_searchSoundTrack_Window;
import com.example.music_meet.service.AlbumService;
import lombok.Synchronized;
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
public class AlbumController
{
    @Autowired
    private AlbumService albumService;


    //
    // 뮤직 크롤링 실행.md
    //
    @RequestMapping(path = "/music/crawling/{get}", method = RequestMethod.GET)
    public ResponseEntity<Object> startMusicCrawling(@PathVariable("get")final String key)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (Integer.parseInt((String) request.getAttribute("userNum")) == 2 && key.equals("music_meet"))
        {
            if (albumService.start())
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
        else if (requestMap.get("content").getBytes().length >= 99){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            final int usernum = Integer.parseInt((String) request.getAttribute("userNum"));
            final String comment = requestMap.get("content");
            final int musicNum = Integer.parseInt(requestMap.get("musicNum"));


            if (albumService.createSoundTrackComment(usernum, musicNum, comment))
                return new ResponseEntity<>(HttpStatus.CREATED);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
        else if (requestMap.get("content").getBytes().length >= 99 ){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            final int userNum = Integer.parseInt((String) request.getAttribute("userNum"));
            final String comment = requestMap.get("content");
            final int commentNum = Integer.parseInt(requestMap.get("commentNum"));

            if (albumService.modifySoundTrackComment(userNum, commentNum, comment))
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

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
        final int commentNum =  Integer.parseInt(requestMap.get("commentNum"));

        if (albumService.deleteSoundTrackComment(userNum, commentNum))
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
        ArrayList<Response_searchSoundTrack_Window> musics = albumService.searchSoundTrack_Window(keyword);

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

        Response_getSoundTrackInfo response_getSoundTrackInfo =  albumService.getSoundTrackInfo(userNum, musicNum);

        if (response_getSoundTrackInfo.getTitle() == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(response_getSoundTrackInfo,HttpStatus.OK);
    }


    //
    // 음악 정보 좋아요.md
    //
    @Synchronized
    @RequestMapping(path = "/music/vote", method = RequestMethod.PUT)
    public ResponseEntity<Object> addMusicCommentVote(@RequestBody Map<String, String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final int usernum = Integer.parseInt((String)request.getAttribute("userNum"));
        final int musicNum = Integer.parseInt(requestMap.get("musicNum"));

        if (albumService.isSelectVote(usernum, musicNum))
        {
            if (albumService.deleteMusicCommentVote(usernum, musicNum))
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
        else
        {
            if (albumService.addMusicCommentVote(usernum, musicNum))
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
        ArrayList<Response_getMusicComment> response_getMusicComments = albumService.getMusicComment(musicNum);

        if (response_getMusicComments.size() == 0)
            return new ResponseEntity<>(response_getMusicComments, HttpStatus.OK);
        else
            return new ResponseEntity<>(response_getMusicComments, HttpStatus.OK);
    }


    //
    // 메인페이지 음원 업로드 호출_인기.md
    //
    @RequestMapping(value = "/music/popular/{num}", method = RequestMethod.GET)
    public ResponseEntity<Object> getMusicListVote(@PathVariable("num") final int num){
        ArrayList<Map<String, String>> musics = albumService.getMusicList(num, "popular");
        return new ResponseEntity<>(musics, HttpStatus.OK);
    }

    //
    // 메인페이지 음원 업로드 호출_최신.md
    //
    @RequestMapping(value = "/music/latest/{num}", method = RequestMethod.GET)
    public ResponseEntity<Object> getMusicListLatest(@PathVariable("num") final int num){
        ArrayList<Map<String, String>> musics = albumService.getMusicList(num, "latest");
        return new ResponseEntity<>(musics, HttpStatus.OK);
    }

    //
    // 음악 리스트 호출.md
    //
    @RequestMapping("/musics/list")
    public ResponseEntity<Object> getMusicListToPage(@RequestParam("page") final int PAGE,
                                                     @RequestParam(value = "type",required = false) String TYPE,
                                                     @RequestParam(value = "search", required = false) String search) {
        if (TYPE == null){
            TYPE = "latest";
        }
        if (search == null){
            search = "";
        }
        return new ResponseEntity<>(albumService.getMusicListToPage(PAGE, TYPE, search), HttpStatus.OK);
    }
}
