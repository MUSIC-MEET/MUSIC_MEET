package com.example.music_meet.service;


import com.example.music_meet.dto.Request.Request_boardCommentVote;
import com.example.music_meet.dto.Request.Request_createBoardComment;
import com.example.music_meet.dto.Response.Response_GetBoardCommentList_Comment;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class CommentService
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



    @Value("${server.url}")
    private String serverURL;

    @Value("${server.port}")
    private String serverPort;

    //
    // 댓글 작성
    //
    public boolean createBoardComment(Request_createBoardComment request_createBoardComment)
    {
        java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
        boolean result = false;
        final String genreBoard = request_createBoardComment.getGenre() + "board";
        final String genreComment = request_createBoardComment.getGenre() + "comment";
        int state = 0;

        try
        {
            sql = "SELECT state FROM " + genreBoard + " WHERE boardnum = ?";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, request_createBoardComment.getBoardNum());
            rs = pstmt.executeQuery();
            while (rs.next())
            {
                state = rs.getInt("state");
            }

            if (state == 0) {
                sql = "INSERT INTO " + genreComment + "(usernum, boardnum, content, createdat) VALUES(?,?,?,?)";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, request_createBoardComment.getUserNum());
                pstmt.setInt(2, request_createBoardComment.getBoardNum());
                pstmt.setString(3, request_createBoardComment.getComment());
                pstmt.setTimestamp(4, date);

                rsInt = pstmt.executeUpdate();
            }

            if (rsInt != 0)
                result = true;
            else
                result = false;

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
        return result;
    }

    //
    // 댓글 목록 호출
    //
    public ArrayList<Response_GetBoardCommentList_Comment> getBoardCommentList(String genre, int boardNum)
    {
        //java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
        java.sql.Timestamp date = new java.sql.Timestamp((System.currentTimeMillis()));

        ArrayList<Response_GetBoardCommentList_Comment> comments = new ArrayList<>();
        final String genreBoard = genre + "board";
        final String genreComment = genre + "comment";
        try
        {
            sql = "SELECT * FROM " + genreBoard + " WHERE boardnum = ? AND state = 0";

            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, boardNum);
            rs = pstmt.executeQuery();

            boolean result = false;
            if (rs.next())
                result = true;

            if (result == true)
            {
                sql = "SELECT a.commentnum, a.content, DATE_FORMAT(a.`createdat`, '%Y-%m-%d %T') AS createdat," +
                        " a.upvote, a.downvote, b.nickname, b.userimage FROM " + genreComment +
                        " a, user b WHERE a.usernum = b.usernum AND a.state = 0 AND a.boardnum = ? " +
                        "ORDER BY a.createdat ASC";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, boardNum);
                rs = pstmt.executeQuery();

                while (rs.next())
                {
                    Response_GetBoardCommentList_Comment comment = new Response_GetBoardCommentList_Comment();
                    comment.setCommentNum(rs.getInt("commentnum"));
                    comment.setComment(rs.getString("content"));
                    comment.setCreatedAt(rs.getString("createdat"));
                    comment.setNickname(rs.getString("nickname"));
                    comment.setUpvote(rs.getInt("upvote"));
                    comment.setDownvote(rs.getInt("downvote"));
                    comment.setUserImage(serverURL + ":" + serverPort + "/user" + "/image/" + rs.getString(  "userimage"));
                    comments.add(comment);
                }
            }
            // 글이 없는 경우
            else {
                comments = null;
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
        return comments;
    }

    //
    // 댓글 추천, 비추천 선택
    //
    public boolean boardCommentVote(String sql, Request_boardCommentVote request_boardCommentVote)
    {
        boolean result = false;
        final String genreComment = request_boardCommentVote.getGenre() + "comment";
        try
        {
            /*if (request_boardCommentVote.getVote().equals("upvote"))
                sql = "UPDATE " + genreComment + " SET upvote = upvote +1 WHERE commentnum = ? AND state = 0";
            else
                sql = "UPDATE " + genreComment + " SET downvote = downvote +1 WHERE commentnum = ? AND state = 0";*/
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, request_boardCommentVote.getCommentNum());
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

    //
    // 댓글 수정
    //
    public boolean modifyboardComment(String genre, int userNum, String content, int commentNum)
    {
        boolean result = false;
        final String genreComment = genre + "comment";
        try
        {
            sql = "UPDATE " + genreComment + " SET content = ? WHERE commentnum = ? AND state = 0 AND usernum = ?";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1,content);
            pstmt.setInt(2, commentNum);
            pstmt.setInt(3, userNum);

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

    //
    // 댓글 삭제
    //
    public boolean deleteBoardComment(String genre, int userNum,int commentNum)
    {
        boolean result = false;
        final String genreComment = genre + "comment";
        try
        {
            sql = "UPDATE " + genreComment + " SET state = 1 WHERE commentnum = ? AND usernum = ?";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, commentNum);
            pstmt.setInt(2, userNum);

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

    
    //
    // 장르BoardcommentVote 테이블에서 값 확인
    //
    public int isSelectVote(int userNum,Request_boardCommentVote request_boardCommentVote)
    {
        int result = 2;
        final String genreBoardCommentVote = request_boardCommentVote.getGenre() + "BoardCommentVote";
        try
        {
            sql = "SELECT vote FROM " + genreBoardCommentVote + " WHERE usernum = ? AND commentnum = ?";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, userNum);
            pstmt.setInt(2, request_boardCommentVote.getCommentNum());

            rs = pstmt.executeQuery();
            if (rs.next())
            {
                result = rs.getInt("vote");
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
        return result;
    }



    //
    // 장르BoardcommentVote 테이블에 값 삽입
    //
    public void insertVoteTable(int userNum, Request_boardCommentVote request_boardCommentVote)
    {
        final String genreBoardCommentVote = request_boardCommentVote.getGenre() + "BoardCommentVote";
        try
        {
            sql = "INSERT INTO " + genreBoardCommentVote + "(usernum, commentnum,  vote) VALUES(?,?,?)";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, userNum);
            pstmt.setInt(2, request_boardCommentVote.getCommentNum());
            if (request_boardCommentVote.getVote().equals("upvote"))
                pstmt.setInt(3, 0);
            else
                pstmt.setInt(3, 1);

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
