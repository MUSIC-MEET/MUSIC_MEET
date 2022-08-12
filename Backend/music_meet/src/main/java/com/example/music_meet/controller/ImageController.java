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

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Controller
@CrossOrigin("*")
@Slf4j
public class ImageController {

    final private String filePath = System.getProperty("user.dir")+ File.separator + "src" + File.separator + "main" + File.separator
            + "resources" + File.separator + "profileimage" + File.separator;


    //
    // 이미지 보내주는 컨트롤러
    //
    @RequestMapping(path="/user/image/{imageName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> sendImage(@PathVariable("imageName") String imageName) throws IOException
    {
       /* String path = System.getProperty("user.dir")+ File.separator + "src" + File.separator + "main" + File.separator
                + "resources" + File.separator + "profileimage" + File.separator + imageName;*/
        InputStream imageStream = new FileInputStream(filePath + imageName);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
    }
}
