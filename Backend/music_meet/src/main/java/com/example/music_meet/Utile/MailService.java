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
    public void registerAuthSendMailFunc(String email, String encodingvalue) //
    {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MailConfig.class);
        javaMailSender = (JavaMailSender) ctx.getBean("javaMailSender");

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = "<a href=http://localhost:3000/auth/id/" + encodingvalue + ">링크를 클릭하면 인증이 완료됩니다.</a>";                    // 메일 내용에 삽입될 부분
        //mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        try {
            helper.setTo(email); // 받는 사람
            helper.setSubject("MUSIC_MEET 인증 메일입니다."); // 메일 제목
            helper.setText(htmlMsg, true); // 메일 내용
            helper.setFrom("amusicmeet@gmail.com"); // 보내는 사람
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);
    }

    //
    // 아이디 찾기 전용 메일 보내는 함수
    //
    public void sendUserIdFunc(final String id, final String email)
    {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MailConfig.class);
        javaMailSender = (JavaMailSender) ctx.getBean("javaMailSender");

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = "<p>회원님의 아이디는 <b style=\"color: red\">" + id + "</b> 입니다.</p>";                    // 메일 내용에 삽입될 부분
        //mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        try {
            helper.setTo(email); // 받는 사람
            helper.setSubject("MUSIC_MEET 아이디 찾기 메일입니다."); // 메일 제목
            helper.setText(htmlMsg, true); // 메일 내용
            helper.setFrom("amusicmeet@gmail.com"); // 보내는 사람
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);

    }

    //
    // 비밀번호 찾기 전용 메일 보내는 함수
    //
    public void sendUserKeyFunc(String email, String str)
    {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MailConfig.class);
        javaMailSender = (JavaMailSender) ctx.getBean("javaMailSender");
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg = "<a href = http://localhost:3000/resetpw/" + str + "> 이곳을 눌러서 비밀번호를 변경해 주세요.</a>";                    // 메일 내용에 삽입될 부분
        //mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        try {
            helper.setTo(email); // 받는 사람
            helper.setSubject("MUSIC_MEET 비밀번호 찾기 메일입니다."); // 메일 제목
            helper.setText(htmlMsg, true); // 메일 내용
            helper.setFrom("amusicmeet@gmail.com"); // 보내는 사람
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        javaMailSender.send(mimeMessage);



    }


}
