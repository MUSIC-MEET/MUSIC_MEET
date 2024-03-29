package com.example.music_meet.bean;

import com.example.music_meet.service.InterceptorService;
import com.example.music_meet.validate.Validate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.util.Properties;

@Configuration
@PropertySource("classpath:application.properties")
@Getter
public class BeanConfig implements WebMvcConfigurer
{
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new InterceptorService()).addPathPatterns("/**") // 해당 경로에 접근하기 전에 인터셉터가 가로챈다.
        .excludePathPatterns("/boards"); // 해당 경로는 인터셉터가 가로채지 않는다.

    }

    @Value("${spring.datasource.url}")
    private String mysqlurl;

    @Value("${spring.datasource.username}")
    private String mysqlid;

    @Value("${spring.datasource.password}")
    private String mysqlpassword;

    @Value("${spring.datasource.driver-class-name}")
    private String classForName;

    @Value("${spring.mail.host}")
    private String mailHost;

    @Value("${spring.mail.port}")
    private String mailPort;

    @Value("${spring.mail.username}")
    private String mailUserName;
    @Value("${spring.mail.password}")
    private String mailPw;

    @Value("${spring.mail.protocol}")
    private String mailProtocol;

    @Value("${server.port}")
    private String serverPort;

    @Value("${server.url}")
    private String serverUrl;


    public final String USER_IMAGE_API_URL = "/user/image/";
    public final String MP3_FILE_API_URL = "/uploads/play/";

    public final String MUSIC_IMAGE_URL = "/music/image/";

    public final String MUSIC_MP3_URL = "/musics/play/";

    public final String PROFILE_IMAGE_PATH = System.getProperty("user.dir") + File.separator + "profileimage" + File.separator;
    public final String UPLOAD_MP3FILE_PATH = System.getProperty("user.dir") + File.separator + "upload" + File.separator;
    public final String TEMP_PATH = System.getProperty("user.dir") + File.separator + "temp" + File.separator;
    public final String MUSIC_IMAGE_PATH = System.getProperty("user.dir") + File.separator + "music_image" + File.separator;

    public final String MUSIC_MP3_PATH = System.getProperty("user.dir") + File.separator + "music_mp3" + File.separator;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(mailHost);
        javaMailSender.setPort(Integer.parseInt(mailPort));
        javaMailSender.setUsername(mailUserName);
        javaMailSender.setPassword(mailPw);
        javaMailSender.setProtocol(mailProtocol);

        Properties prop = new Properties();
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.debug", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.EnableSSL.enable", "true");
        javaMailSender.setJavaMailProperties(prop);

        return javaMailSender;
    }

    // 암호화 객체
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){ return new BCryptPasswordEncoder(); }


    @Bean
    public Validate validate() {return new Validate();}

    @Bean
    public java.sql.Timestamp date(){return new java.sql.Timestamp(new java.util.Date().getTime());}

    @Bean
    public String classForName(){return this.classForName; }

    @Bean
    public String mysqlurl(){return this.mysqlurl; }

    @Bean
    public String mysqlid(){return this.mysqlid; }

    @Bean
    public String mysqlpassword(){return this.mysqlpassword; }


}
