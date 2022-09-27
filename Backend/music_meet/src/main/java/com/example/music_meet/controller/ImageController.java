package com.example.music_meet.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.io.*;

@Controller
@CrossOrigin("*")
@Slf4j
public class ImageController {

    //@Value("${file.image.profileimage}")
    final private String profileimage = System.getProperty("user.dir") + File.separator + "profileimage" + File.separator;

    //@Value("${file.image.temp}")
    final private String temp = System.getProperty("user.dir") + File.separator + "temp" + File.separator;
    final private String music_image = System.getProperty("user.dir") + File.separator + "music_image" + File.separator;


    //
    // 유저 프로필 이미지 출력.md
    //
    @RequestMapping(path="/user/image/{imageName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> sendImage(@PathVariable("imageName") final String imageName) throws IOException
    {
        InputStream imageStream = new FileInputStream(profileimage + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    //
    // 게시판 이미지 출력.md
    //
    @RequestMapping(path = "/board/image/{imageName}", method = RequestMethod.GET)
    public ResponseEntity<Object> returnBoardImage(@PathVariable("imageName") final String imageName) throws IOException
    {

        InputStream imageStream = new FileInputStream(temp + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    //
    // 음악 이미지 출력.md
    //
    @RequestMapping(path = "/music/image/{imageName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Object> returnMusicImage(@PathVariable("imageName") final String imageName) throws IOException
    {

        InputStream imageStream = new FileInputStream(music_image + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


}
