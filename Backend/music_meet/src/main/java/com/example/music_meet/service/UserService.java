package com.example.music_meet.service;

import com.JPA.Repository.AccountRepository;
import com.example.music_meet.AES256Util;
import com.example.music_meet.dto.ResetPw;
import com.example.music_meet.dto.User;
import com.example.music_meet.SHA256;
import com.example.music_meet.validate.Validate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.util.Date;

@Repository
@Getter
@Setter
public class UserService {


    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(); // 암호화 객체
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
    Validate validate = new Validate();

    java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());

    //
    // 아이디 찾기
    //
    public String findIdFunc(String email)
    {
        String id;
        String sql = "select id from user where email = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            aes256Util = new AES256Util();
            String value = aes256Util.encrypt(email);
            pstmt.setString(1, value);

            rs = pstmt.executeQuery();


            if (!rs.next())
            {
                throw new Exception("findIdFunc 에서 rs가 null 값으로 예외처리에 빠짐");
            }
            else
            {
                id = rs.getString(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

        return id;
    }


    //
    // 아이디 중복 검사 (id가 DB에 있으면 true 리턴)
    //
    public boolean isDuplicateIdFunc(User user)
    {

        sql = "select id from user where id = ?";
        boolean result = false;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getId());

            rs = pstmt.executeQuery();
            while (rs.next()) {
                result = true;
            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        finally
        {
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
    public boolean isDuplicateNicknameFunc(User user)
    {
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
        finally {
            if (pstmt != null && conn != null) {
                try {
                    rs.close();
                    pstmt.close();
                    conn.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return result;
    }

    //
    // email 중복 검사 (닉네임이 DB에 있으면 true 리턴)
    //
    public boolean isDuplicateEmailFunc(User user)
    {
        String value= null;
        try {
            aes256Util = new AES256Util();
            value = aes256Util.encrypt(user.getEmail());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

        sql = "select email from user where email = ?";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, value);

            rs = pstmt.executeQuery();

            if (!rs.next())
                return false;
            else
                return true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

        }
    }

    //
    // 회원가입 전용 이메일 인증
    //
    public void emailAuthFunc(User user)
    {
        int a = 202007055 + 201607082 + 202007058 + 201607083 + 201807054;
        String key = ""+a;
        String encodingValue;
        String str = user.getId() + user.getNickname() + user.getEmail() + key;
        
        try {
            sha256 = new SHA256();
            encodingValue = sha256.encrypt(str);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        
        MailService mailService = new MailService();
        mailService.registerAuthSendMailFunc(user.getEmail(), encodingValue);

        String sql = "insert into emailauth(id,encoding_value) values(?,?)";
        try {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getId());
            pstmt.setString(2, encodingValue);

            rsInt = pstmt.executeUpdate();


        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // 회원가입 전용 이메일 응답 처리
    //
    public void responseEmailAuthFunc(String value)
    {
        String sql = "select encoding_value from emailauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, value);

            rs = pstmt.executeQuery();

            if (!rs.next())
            {
                throw new Exception("responseEmailAuthFunc 에서 rs가 null 값으로 예외처리에 빠짐");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // 회원 추가
    //
    public void createUserFunc (User user)
    {
            String email = user.getEmail();
            user.setPw(bCryptPasswordEncoder.encode(user.getPw())); // 비밀번호 단방향 암호화
            encodingFunc(user);
            String sql = "insert into user values(?,?,?,?,?,?,?,?,?,?,?)";
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
                pstmt.setInt(11, 3);     // 이메일 미인증 상태

                rsInt = pstmt.executeUpdate();

                if (rsInt == 1) {
                    user.setEmail(email);
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
    // user의 state 상태를 바꿈
    //
    public void setUserStateFunc(String value)
    {
        String sql = "update user set state = 0 where id =(select id from emailauth where encoding_value = ?)";
        try
        {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // user가 비밀번호를 찾을때 아이디와 이메일을 입력받아서 아이디와 이메일이 DB에 있는지 확인하는 함수
    //
    public String checkIdAndEmail(String id, String email)
    {
        User user = new User(id,"",email,"");
        String value;
        String endcoding_email;

        String sql = "select id from user where id = ? and email = ?";
        try
        {
            aes256Util = new AES256Util();
            value = aes256Util.encrypt(user.getId() + user.getEmail() + new Date().toString());
            endcoding_email = aes256Util.encrypt(email);
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, id);
            pstmt.setString(2, endcoding_email);

            rs = pstmt.executeQuery();

            if (!rs.next())
            {
                throw new Exception("findIdFunc 에서 rs가 null 값으로 예외처리에 빠짐");
            }
            else
            {
                id = rs.getString(1);


            }
            sql = "insert into pwauth(id, email, encoding_value) values(?,?,?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2, endcoding_email);
            pstmt.setString(3, value);

            rsInt = pstmt.executeUpdate();

            if (rsInt == 1)
            {

            }
            else
                System.out.println("\"/auth/pw/{keyValue}\" URL의 checkIdAndEmail에서 문제 발생");

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return value;

    }
    
    //
    // emailauth에서 인증이 끝난 데이터 삭제
    //
    public void deleteEmailAuthFunc(String value)
    {
        String sql = "delete from emailauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // pwauth에서 인증이 끝난 데이터 삭제
    //
    public void deletepwAuthFunc(String value)
    {
        String sql = "delete from pwauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

    }


    //
    // AES256 양방향 암호화 함수
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
    // AES256 양방향 복호화 함수
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

    //
    // "/auth/pw/{keyValue}"에서 날라온 key 확인 후 boolean 리턴하는 함수
    //
    public boolean responsePwEmailAuthFunc(String value)
    {
        boolean result;

        String sql = "select * from pwauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rs = pstmt.executeQuery();
            if (!rs.next())
            {
                result = false;
            }
            else
                result = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

        }
        return result;
    }

    //
    // 유효성 검사 통과한 새로운 비밀번호를 user테이블에 세팅해 줌
    //
    public void setUserPw(ResetPw resetPw)
    {
        String sql = "update user set pw = ? where id =(select id from pwauth where encoding_value = ?)";
        try
        {
            //
            // DB구간
            //
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, bCryptPasswordEncoder.encode(resetPw.getNewPw()));
            pstmt.setString(2, resetPw.getEncoding_value());

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}



