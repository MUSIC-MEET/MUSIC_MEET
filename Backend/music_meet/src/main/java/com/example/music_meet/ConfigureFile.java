package com.example.music_meet;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration // .xml 기능을 수행할 수 있는 어노테이션
public class ConfigureFile {



    @Bean
    public void setEncodeId()
    {
        // 패스워드 단방향 암호화
        //String id = "passwordEncoder";
    }



}
