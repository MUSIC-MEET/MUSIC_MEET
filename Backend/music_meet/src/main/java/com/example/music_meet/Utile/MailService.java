package com.example.music_meet.Utile;


import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {

    private JavaMailSender javaMailSender;

    //
    //  회원가입 인증 함수
    //
    public void registerAuthSendMailFunc(String email) //
    {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MailConfig.class);
        javaMailSender = (JavaMailSender) ctx.getBean("javaMailSender");

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = "<a href='https://www.naver.com'>Hello World!</a>";                    // 메일 내용에 삽입될 부분
        //mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        try {
            helper.setTo("abc50050@naver.com"); // 받는 사람
            helper.setSubject("MUSIC_MEET 인증 메일입니다."); // 메일 제목
            helper.setText(htmlMsg, true); // 메일 내용
            helper.setFrom("amusicmeet@gmail.com"); // 보내는 사람
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);
    }

}
