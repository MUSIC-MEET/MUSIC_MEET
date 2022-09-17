package com.example.music_meet.controller;

import com.example.music_meet.dto.Request.*;
import com.example.music_meet.dto.Response.*;
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
import java.util.*;

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
    //  장르 게시판 글 작성.md
    //
    @RequestMapping( path = "/board", method = RequestMethod.POST)
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

        if (1 <= title.length() && title.length() <= 20 && 1 <= content.length() && content.length() <= 1000) {
            requestWriteGenreBoard = new Request_WriteGenreBoard(genre, title, content, usernum);
            boardService.WriteGenreBoard(requestWriteGenreBoard);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //
    //  장르 게시판 이미지 처리.md
    //
    @RequestMapping( path = "/board/image", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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
        responseMap.put("imgSrc", serverURL + ":" + serverPort + "/board" + "/image/" + file);

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    //
    //  장르 게시판 글 수정.md
    //
    @RequestMapping( path = "/board", method = RequestMethod.PUT)
    public ResponseEntity<Object> ModifyGenreBoar(@RequestBody Map<String, String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final String genre = requestMap.get("genre");
        final String boardNum = requestMap.get("boardNum");
        final String title = requestMap.get("title");
        final String content = requestMap.get("content");
        final String userNum = (String) request.getAttribute("userNum");

        if (boardService.ModifyGenreBoard(new Request_ModifyGenreBoard(genre,boardNum,title, content, userNum)))
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //
    //  장르 게시판 글 삭제.md
    //
    @RequestMapping( path = "/board", method = RequestMethod.DELETE)
    public ResponseEntity<Object> DeleteGenreBoard(@RequestBody Map<String, String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final String genre = requestMap.get("genre");
        final String boardNum = requestMap.get("boardNum");
        final String userNum = (String) request.getAttribute("userNum");
        boardService.DeleteGenreBoard(new Request_DeleteGenreBoard(genre, boardNum, userNum));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //
    // 장르게시판 글 목록 호출.md
    //
    @RequestMapping( path = "/boards/{genre}/{page}", method = RequestMethod.GET)
    public ResponseEntity<Object> getGenreBoarList(@PathVariable("genre")String genre, @PathVariable("page")final int page)
    {
        ArrayList<Response_GetGenreBoardList> genreboards;
        genreboards = boardService.getGenreBoarList(new Request_GetGenreBoardList(genre, page));
        return new ResponseEntity<>(genreboards, HttpStatus.OK);
    }

    //
    // 장르 게시판 글 호출.md
    //
    @RequestMapping(path = "/board/{genre}/{num}", method = RequestMethod.GET)
    public ResponseEntity<Object> getBoardForGenreNum(@PathVariable("genre") final String genre, @PathVariable("num") final String num)
    {
        Response_GetGenreBoardForGenreNum response_getGenreBoardForGenreNum = new Response_GetGenreBoardForGenreNum();

        Map<String, String> map = boardService.getBoardForGenreNum(genre, num);

        if (map.get("userimage").equals("NoData"))
        {
            return new ResponseEntity<>(response_getGenreBoardForGenreNum, HttpStatus.NOT_FOUND);
        }
        else
        {
            response_getGenreBoardForGenreNum.setImgSrc( serverURL + ":" + serverPort + "/" + "user" + "/" + "image" + "/" + map.get("userimage"));
            response_getGenreBoardForGenreNum.setNickname(map.get("nickname"));
            response_getGenreBoardForGenreNum.setTitle(map.get("title"));
            response_getGenreBoardForGenreNum.setContent(map.get("content"));
            response_getGenreBoardForGenreNum.setView(Integer.parseInt(map.get("view")));
            response_getGenreBoardForGenreNum.setCreatedAt(map.get("createdAt"));
            response_getGenreBoardForGenreNum.setUpvote(Integer.parseInt(map.get("upvote")));
            response_getGenreBoardForGenreNum.setDownvote(Integer.parseInt(map.get("downvote")));
            return new ResponseEntity<>(response_getGenreBoardForGenreNum, HttpStatus.OK);
        }
    }

    //
    // 장르 게시판 추천,비추천 선택.md
    //
    @RequestMapping(path = "/board/vote", method = RequestMethod.PUT)
    public ResponseEntity<Object> genreBoardVote(@RequestBody Map<String,String> requestMap)
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getAttribute("userNum") == null)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        final String userNum = (String) request.getAttribute("userNum");
        final String genre = requestMap.get("genre");
        final int boardNum = Integer.parseInt(requestMap.get("boardNum"));
        final String vote = requestMap.get("vote");
        Request_GenreBoardVote request_genreBoardVote = new Request_GenreBoardVote(genre,boardNum,vote);
        String sql = "";

        // genreVoteTable에 해당 유저 번호, 해당 글의 데이터가 있는지 조회
        int voteState = boardService.isSelectVote(userNum, request_genreBoardVote);

        if (voteState == 2) // 추천, 비추천을 한번도 누른적이 없다.
        {
            boardService.insertVoteTable(userNum, request_genreBoardVote);
            if (vote.equals("upvote"))
                sql = "UPDATE " + genre + "board SET upvote = upvote + 1 WHERE boardnum = ? AND state = 0";
            else
                sql = "UPDATE " + genre + "board SET downvote = downvote + 1 WHERE boardnum = ? AND state = 0";

            // genreBoard DB에 반영
            boardService.genreBoardPlusVote(sql, request_genreBoardVote);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else                         // 추천, 비추천을 누른적이 있다. 프론트로 알려줄 것
        {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }


    //
    // 장르 게시판 글 호출_Small.md
    //
    @RequestMapping(path = "/board/{genre}/{num}/small", method = RequestMethod.GET)
    public ResponseEntity<Object> getGenreBoard_Small(@PathVariable("genre") String genre, @PathVariable("num") int boardNum)
    {
        Map<String, String> responseMap = boardService.getGenreBoard_Small(genre,boardNum);
        if (responseMap.get("title") == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    //
    // 장르 게시판 글 제목으로 검색.md
    //
    @RequestMapping(path = "/board/search/{genre}/title/{title}", method = RequestMethod.GET)
    public ResponseEntity<Object> searchGenreBoard_Title(@PathVariable("genre") String genre ,@PathVariable("title") String title)
    {
        Response_searchGenreBoard_Title genreboards = new Response_searchGenreBoard_Title();
        genreboards.setBoards(boardService.searchGenreBoard_Title(genre,title));
        if (genreboards == null)
            return new ResponseEntity<>(genreboards,HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(genreboards,HttpStatus.OK);
    }

    //
    // 장르 게시판 글 닉네임으로 검색.md
    //
    @RequestMapping(path = "/board/search/{genre}/nickname/{nickname}", method = RequestMethod.GET)
    public ResponseEntity<Object> searchGenreBoard_Nickname(@PathVariable("genre") String genre, @PathVariable("nickname") String nickname)
    {
        Response_searchGenreBoard_Nickname genreboards = new Response_searchGenreBoard_Nickname();
        genreboards.setBoards(boardService.searchGenreBoard_Nickname(genre,nickname));

        if (genreboards == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(genreboards,HttpStatus.OK);
    }

    //
    // 장르 게시판 글 제목+닉네임으로 검색.md
    //
    @RequestMapping(path = "/board/search/{genre}/titleandnickname/{text}", method = RequestMethod.GET)
    public ResponseEntity<Object> searchGenreBoard_TitleandNickname(@PathVariable("genre") String genre , @PathVariable("text") String text)
    {

        Response_searchGenreBoard_TitleandNickname genreboards = new Response_searchGenreBoard_TitleandNickname();
        genreboards.setBoards(boardService.searchGenreBoard_TitleAndNickname(genre, text));

        if (genreboards == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<>(genreboards, HttpStatus.OK);
    }

}
