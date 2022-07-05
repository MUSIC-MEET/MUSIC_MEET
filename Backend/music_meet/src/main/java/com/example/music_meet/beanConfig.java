package com.example.music_meet;

import com.JPA.Repository.AccountRepository;
import com.example.music_meet.service.UserService;
import com.example.music_meet.validate.Validate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;

@Configuration
public class beanConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("amusicmeet@gmail.com");
        javaMailSender.setPassword("jozrsgfvjbdkhxez");
        javaMailSender.setProtocol("smtp");

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

    
    private AES256Util aes256Util; // AES256 변수 (암호화, 복호화에 사용)
    private SHA256 sha256; // SHA256 변수 (이메일 인증에 사용 암호문에 /가 안들어감)
    private String mysqlurl = "jdbc:mysql://localhost:3306/music_meet?serverTimezone=UTC&characterEncoding=UTF-8";
    private String mysqlid = "root";
    private String mysqlpassword = "0000";
    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;

    private AccountRepository accountRepository;
    private Validate validate = new Validate();

    private java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());

}
