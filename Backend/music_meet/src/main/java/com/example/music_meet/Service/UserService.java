package com.example.music_meet.Service;

import com.JPA.Repository.AccountRepository;
import com.example.music_meet.AES256Util;
import com.example.music_meet.DTO.User;
import com.example.music_meet.Utile.MailService;
import com.example.music_meet.validate.Validate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.sql.*;

@Repository
@Getter
@Setter
public class UserService {


    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // 암호화 객체
    private AES256Util aes256Util;
    private String mysqlurl = "jdbc:mysql://localhost:3306/music_meet?serverTimezone=UTC&characterEncoding=UTF-8";
    private String mysqlid = "root";
    private String mysqlpassword = "0000";
    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;

    private AccountRepository accountRepository;
    Validate validate = new Validate();

    java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());


    //
    // 아이디 중복 검사 (id가 DB에 있으면 true 리턴)
    //
    public boolean findIdFunc(User user) {


        sql = "select id from user where id = ?";
        boolean result = false;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getId());

            rs = pstmt.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getString(1));
                result = true;
            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        if (pstmt != null && conn != null) {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }


        return result;
    }

    //
    // 닉네임 중복 검사 (닉네임이 DB에 있으면 true 리턴)
    //
    public boolean findNicknameFunc(User user) {
        sql = "select nickname from user where nickname = ?";
        boolean result = false;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getNickname());

            rs = pstmt.executeQuery();

            while (rs.next()) {
                System.out.println(rs.getString(1));
                result = true;
            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        if (pstmt != null && conn != null) {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }

    //
    // 회원가입 전용 이메일 인증
    //
    public void emailAuthFunc(User user)
    {
        String str = user.getId() + user.getNickname() + user.getEmail();
        try {
            aes256Util = new AES256Util();
            System.out.println(aes256Util.encrypt(str));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

        MailService mailService = new MailService();
        mailService.registerAuthSendMailFunc(user.getEmail());

        String sql = "insert into user values(?,?,?,?,?,?,?,?,?,?)";
        try {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getId());
            pstmt.setString(2, user.getPw());
            pstmt.setString(3, user.getEmail());
            pstmt.setString(4, user.getNickname());
            pstmt.setTimestamp(5, date); // CreatedAt
            pstmt.setTimestamp(6, null); // UpdatedAt
            pstmt.setTimestamp(7, null); // deletedAt
            pstmt.setString(8, "0"); //Createdip
            pstmt.setString(9, "0");//Updatedip
            pstmt.setString(10, null); // deletedip
            //pstmt.setInt(11, 0);     // 상태

            rsInt = pstmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

        //
        // 회원 추가
        //
        public void createUserFunc (User user)
        {

            user.setPw(passwordEncoder.encode(user.getPw())); // 비밀번호 단방향 암호화

            String sql = "insert into user values(?,?,?,?,?,?,?,?,?,?)";
            try {
                //
                // DB구간
                //
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
                pstmt = conn.prepareStatement(sql);

                pstmt.setString(1, user.getId());
                pstmt.setString(2, user.getPw());
                pstmt.setString(3, user.getEmail());
                pstmt.setString(4, user.getNickname());
                pstmt.setTimestamp(5, date); // CreatedAt
                pstmt.setTimestamp(6, null); // UpdatedAt
                pstmt.setTimestamp(7, null); // deletedAt
                pstmt.setString(8, "0"); //Createdip
                pstmt.setString(9, "0");//Updatedip
                pstmt.setString(10, null); // deletedip
                //pstmt.setInt(11, 0);     // 상태

                rsInt = pstmt.executeUpdate();

                if (rsInt == 1) {
                    emailAuthFunc(user);
                }


            } catch (ClassNotFoundException | SQLException e) {
                //e.printStackTrace();
                throw new RuntimeException(e);
            } finally {
                try {
                    if (pstmt != null && conn != null) {
                        rs.close();
                        pstmt.close();
                        conn.close();
                    }
                } catch (Exception e) {
                    //e.printStackTrace();
                }
            }
            System.out.println("계정 생성 정상 처리");
        }


        //
        // 양방향 암호화 함수
        //
        public void encodingFunc (User user)
        {
            String str;
            try {
                aes256Util = new AES256Util();
                user.setEmail(aes256Util.encrypt(user.getEmail()));
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            } catch (GeneralSecurityException e) {
                throw new RuntimeException(e);
            }

        }

        //
        //  양방향 복호화 함수
        //
        public String decodingFunc (String before)
        {
            String str;

            try {
                aes256Util = new AES256Util();
                str = aes256Util.decrypt(before);
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            } catch (GeneralSecurityException e) {
                throw new RuntimeException(e);
            }

            return str;

        }

}



