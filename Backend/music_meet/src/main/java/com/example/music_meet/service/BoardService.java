package com.example.music_meet.service;

import com.example.music_meet.dto.Request.RequestWriteGenreBoard;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;

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

    public void WriteGenreBoard(RequestWriteGenreBoard requestWriteGenreBoard)
    {
        try
        {
            sql = "INSERT INTO Board(genre, title, usernum, content, createdat) VALUES((SELECT genre FROM genrestate WHERE name = ?),?,?,?,?)";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, requestWriteGenreBoard.getGenre());
            pstmt.setString(2, requestWriteGenreBoard.getTitle());
            pstmt.setInt(3, requestWriteGenreBoard.getUsernum());
            pstmt.setString(4, requestWriteGenreBoard.getContent());
            pstmt.setTimestamp(5, date);

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
