package com.example.music_meet.service;

import com.example.music_meet.AES256Util;
import com.example.music_meet.SHA256;
import com.example.music_meet.dto.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@Repository
//@EnableWebSecurity // 웹 보안 활성화를 위한 어노테이션
public class LoginService
{
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(); // 암호화 객체
    private AES256Util aes256Util; // AES256 변수 (암호화, 복호화에 사용)
    private SHA256 sha256 = new SHA256(); // SHA256 변수 (이메일 인증에 사용 암호문에 /가 안들어감)
    private String mysqlurl = "jdbc:mysql://localhost:3306/music_meet?serverTimezone=UTC&characterEncoding=UTF-8";
    private String mysqlid = "root";
    private String mysqlpassword = "0000";
    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;


    public Map<String,String> getUserPw(User user)
    {
        String result = null;
        Map<String,String> map = new HashMap<>();

        sql = "select usernum,pw,nickname from user where id = ?";

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
                map.put("usernum",Integer.toString(rs.getInt(1)));
                map.put("pw", rs.getString(2));
                map.put("nickname", rs.getString(3));
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
