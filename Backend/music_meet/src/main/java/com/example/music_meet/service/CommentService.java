package com.example.music_meet.service;


import com.example.music_meet.dto.Request.Request_createBoardComment;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class CommentService
{
    @org.springframework.beans.factory.annotation.Value("${spring.datasource.url}")
    private String mysqlurl;
    @org.springframework.beans.factory.annotation.Value("${spring.datasource.username}")
    private String mysqlid;
    @org.springframework.beans.factory.annotation.Value("${spring.datasource.password}")
    private String mysqlpassword;
    @Value("${spring.datasource.driver-class-name}")
    private String classForName;

    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;

    private java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());

    public boolean createBoardComment(Request_createBoardComment request_createBoardComment)
    {
        boolean result = false;
        final String genreComment = request_createBoardComment.getGenre() + "comment";
        try
        {
            sql = "INSERT INTO " + genreComment + "(usernum, boardnum, content, createdat)" +
                    " VALUES(?,?,?,?)";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, request_createBoardComment.getUserNum());
            pstmt.setInt(2, request_createBoardComment.getBoardNum());
            pstmt.setString(3, request_createBoardComment.getComment());
            pstmt.setTimestamp(4, date);

            rsInt = pstmt.executeUpdate();

            if (rsInt != 0)
                result = true;

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
        return result;
    }


}
