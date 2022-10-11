package com.example.music_meet.service;

import JPA.Upload;
import JPA.UploadRepository;
import com.example.music_meet.bean.BeanConfig;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Getter
@Setter
@NoArgsConstructor
public class UploadService {

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

    @Autowired
    private BeanConfig beanConfig;

    @Autowired
    private java.sql.Timestamp date;



    /**
     * 회원 개별 업로드에서 사용
     * upload 번호를 입력받아 해당 업로드 글을 가져오는 함수
     * @param uploadNum upload number
     * @return 정상적으로 찾아올시 true, 글이 없거나 비정상 작동시 false
     */
    @Synchronized
    public Upload getUserUpload(final int uploadNum, final int userNum) {
        Upload upload = new Upload();

        sql = "select a.`uploadnum`, a.`usernum`,a.`title`, b.`nickname`, a.`comment`, a.`file`, a.`vote`, a.`view`," +
                " b.`userimage`, DATE_FORMAT(a.`createdat`, '%Y-%m-%d') AS createdat, (SElECT COUNT(*) FROM uploadvote WHERE uploadnum = ? AND usernum = ?) AS isvote" +
                " FROM upload a, user b WHERE a.uploadnum = ? AND a.state = 0 AND a.usernum = b.usernum";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, uploadNum);
            pstmt.setInt(2, userNum);
            pstmt.setInt(3, uploadNum);
            rs = pstmt.executeQuery();

            if(rs.next()){
                upload.setId(rs.getInt("uploadnum"));
                upload.setUsernum(rs.getInt("usernum"));
                upload.setTitle(rs.getString("title"));
                upload.setUser(rs.getString("nickname"));
                upload.setDescription(rs.getString("comment"));
                upload.setMp3Src(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.MP3_FILE_API_URL + rs.getString("file"));
                upload.setVoteCount(rs.getInt("vote"));
                upload.setViewCount(rs.getInt("view"));
                upload.setImgSrc(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.USER_IMAGE_API_URL + rs.getString("userimage"));
                upload.setCreatedAt(rs.getString("createdat"));
                upload.setIsVote(rs.getInt("isvote"));
            }
            else {
                upload.setId(-100);
            }

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

        return upload;

    }



    /**
     * 회원 개별 업로드 글 목록을 페이지 단위로 보여주는 함수
     * @param page 보여줄 페이지 번호
     * @return
     */
    public ArrayList<Map<String,String>> getUploadList(final int page) {
        ArrayList<Map<String,String>> uploads = new ArrayList<>();

        sql = "select a.`uploadnum`, a.`title`, b.`nickname`, a.`vote`, a.`view`, DATE_FORMAT(a.`createdat`, '%Y-%m-%d') AS createdat, b.`userimage`"+
                " FROM upload a, user b WHERE a.`state` = 0 AND a.`usernum` = b.`usernum` ORDER BY a.`createdat` DESC LIMIT ?,10";
        try {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, (page - 1) * 10);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                Map<String, String> map = new HashMap<>();
                map.put("id", String.valueOf(rs.getInt("uploadnum")));
                map.put("title", rs.getString("title"));
                map.put("user", rs.getString("nickname"));
                map.put("createdAt", rs.getString("createdat"));
                map.put("viewCount", String.valueOf(rs.getInt("view")));
                map.put("voteCount", String.valueOf(rs.getInt("vote")));
                map.put("imgSrc", beanConfig.getServerUrl() + ":" + beanConfig.getServerPort()
                        + beanConfig.USER_IMAGE_API_URL + rs.getString("userimage"));
                uploads.add(map);
            }

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
        return uploads;
    }



    /**
     * uploadVote 테이블에서 해당 업로드 번호와 유저 번호가 매칭되는 값이 있는지 확인하는 함수
     * @param uploadNum 업로드 번호
     * @param userNum 유저 번호
     * @return 값이 존재하면 true, 없으면 false
     */
    public int isUploadVote(final int uploadNum, final int userNum) {

        int result = 0;

        sql = "SELECT COUNT(votenum) FROM uploadVote WHERE uploadnum = ? AND usernum = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, uploadNum);
            pstmt.setInt(2, userNum);
            rs = pstmt.executeQuery();

            if(rs.next()){
                result = rs.getInt(1);
            }
            else {
                result = rs.getInt(1);
            }

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
        return result;
    }



    /**
     * uploadVote 테이블에 값을 추가하는 함수
     * @param uploadNum 업로드 번호
     * @param userNum 해당 유저 번호
     */
    public void createUploadVote(final int uploadNum, final int userNum) {

        sql = "INSERT INTO uploadvote(uploadnum, usernum) VALUES(?,?)";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, uploadNum);
            pstmt.setInt(2, userNum);
            rsInt = pstmt.executeUpdate();
        } catch (Exception e) {
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



    /**
     * uploadvote 테이블에서 uploadNum과 userNum을 AND 조건으로 같은 같은 값을 삭제하는 함수
     * @param uploadNum
     * @param userNum
     */
    public void deleteUploadVote(final int uploadNum, final int userNum) {
        sql = "DELETE FROM uploadvote WHERE uploadnum = ? AND usernum = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, uploadNum);
            pstmt.setInt(2, userNum);
            rsInt = pstmt.executeUpdate();
        } catch (Exception e) {
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



    /**
     * upload 테이블의 vote 값을 넘어온 정수형 변수 만큼 추가함
     * @param i 추가할 값
     */
    public void patchVote(final int uploadNum,final int i) {

        sql = "UPDATE upload set vote = vote + ? WHERE uploadnum = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, i);
            pstmt.setInt(2, uploadNum);
            rsInt = pstmt.executeUpdate();
        } catch (Exception e) {
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



    /**
     * uploadNum에 해당하는 글의 state를 변경함
     * @param userNum 해당 유저 번호
     * @param uploadNum 업로드 번호
     * @param state 변경할 상태 값
     * @return 정상 처리시 true, 비정상 처리시 false
     */
    public boolean changUploadState(int userNum, int uploadNum, int state) {
        boolean result;

        sql = "UPDATE upload set state = ? WHERE uploadnum = ? AND usernum = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt =  conn.prepareStatement(sql);
            pstmt.setInt(1, state);
            pstmt.setInt(2, uploadNum);
            pstmt.setInt(3, userNum);
            rsInt = pstmt.executeUpdate();
            if (rsInt == 1){
                result = true;
            }
            else {
                result = false;
            }


        } catch (Exception e) {
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



    /**
     * upload 테이블에서 해당 업로드 글의 상태값을 가져오는 함수
     * @param uploadNum 특정 업로드 글 번호
     * @return 해당 글의 상태 코드
     */
    public int getUploadState(final int uploadNum) {
        int result = 0;

        sql = "SELECT state FROM upload WHERE uploadNum = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt =  conn.prepareStatement(sql);
            pstmt.setInt(1, uploadNum);
            rs = pstmt.executeQuery();

            if (rs.next()){
                result = rs.getInt("state");
            }
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
        return result;
    }



    /**
     * 회원 개별 업로드에 댓글을 작성하는 함수
     * @param userNum 유저 고유 번호
     * @param uploadNum 업로드 글 고유 번호
     * @param comment 내용
     * @return 정상 처리시 true, 비정상 처리시 false 리턴
     */
    public boolean addUploadComment(int userNum, int uploadNum, String comment) {
        boolean result;
        date = new java.sql.Timestamp(new java.util.Date().getTime());
        sql = "INSERT INTO uploadcomment(usernum, uploadnum, comment,createdat) VALUES (?,?,?,?)";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt =  conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            pstmt.setInt(2, uploadNum);
            pstmt.setString(3, comment);
            pstmt.setTimestamp(4, date);
            rsInt = pstmt.executeUpdate();

            if (rsInt == 1){
                result = true;
            }
            else {
                result = false;
            }

        } catch (Exception e) {
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



    /**
     * 해당 업로드 글의 댓글들을 호출하는 함수
     * @param uploadNum 업로드 글 번호
     * @return
     */
    @Synchronized
    public ArrayList<Map<String, String>> getUploadComment(final int uploadNum) {
        ArrayList<Map<String, String>> comments = new ArrayList<>();

        sql = "SELECT a.`uploadCommentNum`, a.`comment`, b.`nickname`, b.`userimage` FROM uploadComment a, user b " +
                " WHERE a.`uploadnum` = ? AND a.`state` = 0 AND a.usernum = b.usernum ORDER BY a.`createdat` DESC";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt =  conn.prepareStatement(sql);
            pstmt.setInt(1, uploadNum);
            rs = pstmt.executeQuery();

            while (rs.next()){
                Map<String, String> comment = new HashMap<>();
                comment.put("user", rs.getString("nickname"));
                comment.put("comment", rs.getString("comment"));
                comment.put("id", String.valueOf(rs.getInt("uploadCommentNum")));
                comment.put("imgSrc", beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.USER_IMAGE_API_URL + rs.getString("userimage"));
                comments.add(comment);
            }

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
        return comments;
    }
}
