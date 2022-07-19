package com.example.music_meet.service;

import com.example.music_meet.util.AES256Util;
import com.example.music_meet.util.CustomAnnotationConfig;
import com.example.music_meet.util.SHA256;
import com.example.music_meet.dto.User;
//import io.jsonwebtoken.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.music_meet.util.CustomAnnotationConfig.*;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@Service
//@EnableWebSecurity // 웹 보안 활성화를 위한 어노테이션
public class LoginService
{
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder; // 암호화 객체

    private AES256Util aes256Util; // AES256 변수 (암호화, 복호화에 사용)
    @Autowired
    private SHA256 sha256; // SHA256 변수 (이메일 인증에 사용 암호문에 /가 안들어감)

    @Value("${jwt.token.key}")
    private String jwtSecurityKey; // jwt 키
    
    @Value("${spring.datasource.url}")
    private String mysqlurl;
    @Value("${spring.datasource.username}")
    private String mysqlid;
    @Value("${spring.datasource.password}")
    private String mysqlpassword;

    @Value("${spring.datasource.driver-class-name}")
    private String classForName;


    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;


    public Map<String,String> getUserPw(User user)
    {
        String result = null;
        Map<String,String> map = new HashMap<>();

        sql = "select usernum,pw,nickname,state from user where id = ?";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getId());
            rs = pstmt.executeQuery();

            if (!rs.next())
                System.out.println("getUserPw()에서 rs가 없음");
            else
            {
                map.put("userNum",Integer.toString(rs.getInt(1)));
                map.put("pw", rs.getString(2));
                map.put("nickName", rs.getString(3));
                map.put("userState", Integer.toString(rs.getInt(4)));
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

        return map;
    }






}
