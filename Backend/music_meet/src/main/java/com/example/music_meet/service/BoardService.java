package com.example.music_meet.service;

import com.example.music_meet.dto.Request.Request_WriteGenreBoard;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class BoardService
{
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

    private java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());

    //
    //  글을 DB에 저장하는 함
    //
    public void WriteGenreBoard(Request_WriteGenreBoard requestWriteGenreBoard)
    {
        final String genreBoard = requestWriteGenreBoard.getGenre() + "board";
        try
        {
            sql = "INSERT INTO " + genreBoard + "(title, usernum, content, createdat) VALUES(?,?,?,?) ";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            //pstmt.setString(1, board);
            pstmt.setString(1, requestWriteGenreBoard.getTitle());
            pstmt.setInt(2, requestWriteGenreBoard.getUsernum());
            pstmt.setString(3, requestWriteGenreBoard.getContent());
            pstmt.setTimestamp(4, date);

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
    // 해당 글 번호 가져오는 함수
    //
    public Map<String, String> getBoardForGenreNum(String genre, String num)
    {
        Map<String, String> responseMap = new HashMap<>();
        final String genreBoard = genre + "board";
        try
        {
             sql = "SELECT a.userimage, a.nickname, b.title, b.content, DATE_FORMAT(b.`createdat`, '%y-%m-%d %T') AS createdat, b.`view`, b.vote FROM user a, "
                     + genreBoard + " b WHERE a.usernum = b.usernum AND b.num = ? AND b.`state` = 0;";

            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(num));

            rs = pstmt.executeQuery();
            if(rs.next())
            {
                responseMap.put("userimage", rs.getString("userimage"));
                responseMap.put("nickname", rs.getString("nickname"));
                responseMap.put("title", rs.getString("title"));
                responseMap.put("content", rs.getString("content"));
                responseMap.put("createdAt", rs.getString("createdat"));
                responseMap.put("view", rs.getString("view"));
                responseMap.put("vote", rs.getString("vote"));
            }
            else
            {
                responseMap.put("userimage", "NoData");
            }

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
        return responseMap;
    }
}
