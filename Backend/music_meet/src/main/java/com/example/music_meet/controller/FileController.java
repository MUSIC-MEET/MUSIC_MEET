package com.example.music_meet.controller;

import com.example.music_meet.bean.BeanConfig;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@Controller
@CrossOrigin("*")
@Slf4j
public class FileController {

    @Autowired
    private BeanConfig beanConfig;


    //
    // 유저 프로필 이미지 출력.md
    //
    @RequestMapping(path="/user/image/{imageName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    @Synchronized
    public ResponseEntity<byte[]> sendImage(@PathVariable("imageName") final String imageName) throws IOException
    {
        InputStream imageStream = new FileInputStream(beanConfig.PROFILE_IMAGE_PATH + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    //
    // 게시판 이미지 출력.md
    //
    @RequestMapping(path = "/board/image/{imageName}", method = RequestMethod.GET)
    @Synchronized
    public ResponseEntity<Object> returnBoardImage(@PathVariable("imageName") final String imageName) throws IOException
    {

        InputStream imageStream = new FileInputStream(beanConfig.TEMP_PATH + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    //
    // 음악 이미지 출력.md
    //
    @RequestMapping(path = "/music/image/{imageName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    @Synchronized
    public ResponseEntity<Object> returnMusicImage(@PathVariable("imageName") final String imageName) throws IOException
    {

        InputStream imageStream = new FileInputStream(beanConfig.MUSIC_IMAGE_PATH + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }

    //
    // 회원 개별 업로드 MP3 파일 재생
    //
    @RequestMapping(path = "{type}/play/{mp3filename}", method = RequestMethod.GET)
    @Synchronized
    public ResponseEntity<Object> returnMP3File(@PathVariable("type")final String type,
                                                @PathVariable("mp3filename") final String mp3FileName) throws Exception{
        File file;
        if (type.equals("uploads")){
            file = new File(beanConfig.UPLOAD_MP3FILE_PATH + mp3FileName);
        }
        else if (type.equals("musics")){
            file = new File(beanConfig.MUSIC_MP3_PATH + mp3FileName);
        }
        else {
            file = new File(beanConfig.UPLOAD_MP3FILE_PATH + mp3FileName);
        }

        InputStream inputStream = new FileInputStream(file);
        byte[] imageByteArray = IOUtils.toByteArray(inputStream);
        inputStream.close();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.asMediaType(MimeType.valueOf("audio/mpeg")));
        httpHeaders.setCacheControl(CacheControl.noCache().getHeaderValue());
        httpHeaders.set("Accept-Ranges", "bytes");

        return new ResponseEntity<>(imageByteArray, httpHeaders, HttpStatus.OK);
    }

}
