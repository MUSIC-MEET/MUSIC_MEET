package com.example.music_meet.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.webresources.FileResource;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
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

    final private String filePath = System.getProperty("user.dir")+ File.separator + "src" + File.separator + "main" + File.separator
            + "resources" + File.separator + "profileimage" + File.separator;

    final private String jarPath = System.getProperty("user.dir") + File.separator + ".." + File.separator + "resources" + File.separator
            + "main" + File.separator + "profileimage" + File.separator;

    //
    // 이미지 보내주는 컨트롤러
    //
    @RequestMapping(path="/user/image/{imageName}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> sendImage(@PathVariable("imageName") String imageName) throws IOException
    {
        //InputStream imageStream = new FileInputStream(jarPath + imageName);1660313580634_뭐라구요.jpg
        InputStream imageStream = new FileInputStream(jarPath + "1660313580634_뭐라구요.jpg");
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }

    @RequestMapping(path = "/test", method = RequestMethod.GET)
    public ResponseEntity<Object> test() throws IOException {
        //ConfigurationSource.Resource resource = resourceLoader.getResource("classpath:file/hello.html");
        System.out.println(jarPath);

        InputStream imageStream = new FileInputStream(jarPath + "1660313610404_놀자에몽.jpg");
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();

        return new ResponseEntity<>(imageByteArray,HttpStatus.NO_CONTENT);
    }
}
