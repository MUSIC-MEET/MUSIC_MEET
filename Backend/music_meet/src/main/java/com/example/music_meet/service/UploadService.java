package com.example.music_meet.service;

import JPA.Upload;
import com.example.music_meet.bean.BeanConfig;
import com.example.music_meet.dto.UploadComment;
import com.example.music_meet.dto.UploadMusic;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
     * 회원 개별 업로드 글 호출
     * upload 번호를 입력받아 해당 업로드 글을 가져오는 함수
     * @param uploadNum upload number
     * @return 정상적으로 찾아올시 true, 글이 없거나 비정상 작동시 false
     */
    @Synchronized
    public UploadMusic getUserUpload(final int uploadNum, final int userNum) {
        UploadMusic upload = new UploadMusic();

        sql = "select a.`uploadnum`, a.`origin_title`, b.`nickname`, a.`comment`, a.`file`, a.`vote`, a.`view`," +
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
                upload.setId(rs.getInt("uploadNum"));
                upload.setTitle(rs.getString("origin_title"));
                upload.setUser(rs.getString("nickname"));
                upload.setDescription(rs.getString("comment"));
                upload.setMp3Src(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.MP3_FILE_API_URL + rs.getString("file"));
                upload.setCount(rs.getInt("vote"));
                upload.setView(rs.getInt("view"));
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
    public Object getUploadList(final int page) {
        ArrayList<UploadMusic> uploads = new ArrayList<>();
        Map<String, Object> responseMap = new HashMap<>();
        int totalPage = 0;

        sql = "select a.`uploadnum`, a.`origin_title`, b.`nickname`, a.`vote`, a.`view`, DATE_FORMAT(a.`createdat`, '%Y-%m-%d') AS createdat, b.`userimage`"+
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

            while (rs.next()) {
                UploadMusic upload = new UploadMusic();
                upload.setId(rs.getInt("uploadnum"));
                upload.setTitle(rs.getString("origin_title"));
                upload.setUser(rs.getString("nickname"));
                upload.setCreatedAt( rs.getString("createdat"));
                upload.setView(rs.getInt("view"));
                upload.setCount(rs.getInt("vote"));
                upload.setImgSrc(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort()
                        + beanConfig.USER_IMAGE_API_URL + rs.getString("userimage"));
                uploads.add(upload);
            }

            sql = "SELECT COUNT(uploadNum) AS totalPage FROM upload WHERE state = 0";
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            if (rs.next()){
                totalPage = rs.getInt("totalPage");
                if (totalPage % 10 == 0){
                    totalPage = totalPage / 10;
                }
                else{
                    totalPage = (totalPage/ 10) + 1;
                }
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
        responseMap.put("list", uploads);
        responseMap.put("endPage", totalPage);
        return responseMap;
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
     * @return 정상 처리시 true, 비정상 처리시 false
     */
    public boolean changUploadState(int userNum, int uploadNum) {
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
            pstmt.setInt(1, 1);
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
     * @return 해당 게시글의 활성화된 모든 댓글들
     */
    @Synchronized
    public ArrayList<UploadComment> getUploadComment(final int uploadNum) {
        ArrayList<UploadComment> comments = new ArrayList<>();

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
                UploadComment comment = new UploadComment();
                comment.setUser(rs.getString("nickname"));
                comment.setComment(rs.getString("comment"));
                comment.setId(rs.getInt("uploadCommentNum"));
                comment.setImgSrc(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.USER_IMAGE_API_URL + rs.getString("userimage"));
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


    /**
     * 업로드 댓글 고유 번호를 인자로 넘겨받아 해당 댓글의 내용을 수정하는 함수
     * @param uploadCommentNum 업로드 댓글 고유 번호
     * @param userNum 유저의 고유 번호
     * @param comment 변경할 내용
     * @return 정상 처리시 true, 비 정상처리시 false
     */
    public Boolean modifyUploadCommentState(int uploadCommentNum, int userNum, String comment) {
        boolean result;

        sql = "UPDATE uploadComment SET comment = ? WHERE uploadCommentNum = ? AND usernum = ? AND state = 0";
        try {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, comment);
            pstmt.setInt(2, uploadCommentNum);
            pstmt.setInt(3, userNum);


            rsInt = pstmt.executeUpdate();

            if (rsInt >= 1) {
                result = true;
            }else {
                result = false;
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
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
     * 업로드 댓글 고유 번호를 인자로 넘겨받아 해당 댓글을 삭제하는 함수
     * @param uploadCommentNum 업로드 댓글 고유 번호
     * @param userNum 유저 고유 번호
     * @return 정상 처리시 true, 비정상 처리시 false
     */
    public boolean deleteUploadComment(final int uploadCommentNum, final int userNum) {

        boolean result;
        sql = "UPDATE uploadComment SET state = ? WHERE uploadCommentNum = ? AND usernum = ? AND state = 0";
        try {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, 1);
            pstmt.setInt(2, uploadCommentNum);
            pstmt.setInt(3, userNum);
            rsInt = pstmt.executeUpdate();

            if (rsInt >= 1) {
                result = true;
            }else {
                result = false;
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
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
     * 회원 업로드 글을 수정하는 함수
     * @param uploadNum 유저 고유 번호
     * @param title 바꿀 제목
     * @param description 바꿀 설명
     * @param fileName 파일의 이름
     * @return 정상 처리시 true, 비정상 처리시 false 반환
     */
    @Synchronized
    public boolean modifyUpload(int userNum, int uploadNum, String title, String description, Long nowDate,String fileName) {
        boolean result;

        if (nowDate == null) { // 파일 수정 안함
            sql = "UPDATE upload SET origin_title = ?, comment = ? , title = ? WHERE uploadNum = ? AND usernum = ? AND state = 0";
        }else {                 // 파일 수정
            sql = "UPDATE upload SET origin_title = ?, comment = ?, title = ? ,file = ?, origin_file = ? WHERE uploadNum = ? AND usernum = ? AND state = 0";
        }

        try {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            if (fileName == null){
                pstmt.setString(1,title);
                pstmt.setString(2, description);
                pstmt.setString(3, title.replaceAll(" ", ""));
                pstmt.setInt(4,uploadNum);
                pstmt.setInt(5, userNum);
            }else {

                pstmt.setString(1,title);
                pstmt.setString(2, description);
                pstmt.setString(3,title.replaceAll(" ", ""));
                pstmt.setString(4, nowDate + "_" + fileName.replaceAll(" ", ""));
                pstmt.setString(5, fileName);
                pstmt.setInt(6,uploadNum);
                pstmt.setInt(7, userNum);
            }
            rsInt = pstmt.executeUpdate();

            if (rsInt >= 1) {
                result = true;
            }else {
                result = false;
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                rsInt = 0;
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }


    /**
     * upload 테이블에서 인자로 넘겨받은 filename과 origin_file을 비교하는 함수
     * @param userNum 유저 고유 번호
     * @param uploadNum 업로드 글 고유 번호
     * @return 있으면 true, 없으면 false
     */
    public UploadMusic getFileName(int userNum, int uploadNum) {

        UploadMusic upload = new UploadMusic();

        sql = "SELECT origin_file, file FROM upload WHERE usernum = ? AND uploadnum = ? AND state = 0";
        try {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, userNum);
            pstmt.setInt(2, uploadNum);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                upload.setFileName(rs.getString("file"));
                upload.setOriginFile(rs.getString("origin_file"));
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
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
     * upload 폴더의 해당 파일을 지우는 함수
     * @param deleteFile 지울 파일의 이름
     * @return 정상 처리시 true, 비정상 처리시 false 반환
     */
    public boolean deleteMp3File(String deleteFile) {
        try {
            File newFile = new File(beanConfig.UPLOAD_MP3FILE_PATH + deleteFile);
            newFile.delete();
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }



    /**
     * 인자로 넘어온 업로드 고유 번호를 조회하여 정보를 약식으로 가져옴
     * @param uploadNum 업로드 고유 번호
     * @return
     */
    public UploadMusic getUserUploadSmall(final int userNum, final int uploadNum) {

        UploadMusic upload = new UploadMusic();
        sql = "SELECT origin_title, comment, origin_file FROM upload WHERE usernum = ? AND uploadnum = ? AND state = 0";
        try {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            pstmt.setInt(2, uploadNum);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                upload.setTitle( rs.getString("origin_title"));
                upload.setDescription(rs.getString("comment"));
                upload.setFileName( rs.getString("origin_file"));
            }
            else {
                upload.setTitle(null);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
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
     * 메인페이지에 표시할 uploadList를 최신, 인기 순으로 호출하는 함수
     * @param num 최대 불러올 갯수
     * @param type 인기 = "popular", 최신 = "latest"
     * @return ArrayList<Map<String, String>> 타입의 변수
     */
    @Synchronized
    public ArrayList<UploadMusic> getUploadListForMain( int num, final String type) {

        ArrayList<UploadMusic> uploads = new ArrayList<>();

        if (type.equals("popular")){
            sql = "SELECT a.uploadnum, b.userimage, a.origin_title, b.nickname FROM upload a, user b WHERE a.state = 0 AND a.usernum = b.usernum ORDER BY a.vote DESC" +
                    " LIMIT ?,?";
        }
        else if (type.equals("latest")){
            sql = "SELECT a.uploadnum, b.userimage, a.origin_title, b.nickname FROM upload a, user b WHERE a.state = 0 AND a.usernum = b.usernum ORDER BY a.createdat DESC" +
                    " LIMIT ?,?";
        } else {
            sql = "SELECT a.uploadnum, b.userimage, a.origin_title, b.nickname FROM upload a, user b WHERE a.state = 0 AND a.usernum = b.usernum ORDER BY a.createdat DESC" +
                    " LIMIT ?,?";
        }
        if (num > 20){
            num = 10;
        }

        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, 0);
            pstmt.setInt(2, num);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                UploadMusic upload = new UploadMusic();
                upload.setId(rs.getInt("uploadnum"));
                upload.setImgSrc(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.getUSER_IMAGE_API_URL() + rs.getString("userimage"));
                upload.setTitle(rs.getString("origin_title"));
                upload.setUser(rs.getString("nickname"));
                uploads.add(upload);
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
        return uploads;
    }


    /**
     * 회원 업로드 검색
     * @param type
     * @param keyword
     * @return
     */
    public ArrayList<Map<String, String>> SearchUpload(String type, String keyword) {
        ArrayList<Map<String, String>> uploads = new ArrayList<>();
        if (type.equals("user")) {
            sql = "SELECT a.uploadNum, a.title, b.nickname, DATE_FORMAT(a.`createdat`, '%Y-%m-%d') AS createdat, a.view, a.vote" +
                    " FROM upload a, user b WHERE a.usernum = b.usernum AND a.state = 0 AND b.nickname = %?%";
        }
        else if (type.equals("title")){
            sql = "SELECT a.uploadNum, a.title, b.nickname, DATE_FORMAT(a.`createdat`, '%Y-%m-%d') AS createdat, a.view, a.vote" +
                    " FROM upload a, user b WHERE a.usernum = b.usernum AND a.state = 0 AND a.title = %?%";
        }
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, keyword);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                Map<String, String> map = new HashMap<>();
                map.put("id", String.valueOf(rs.getInt("uploadNum")));
                map.put("title", rs.getString("title"));
                map.put("user", rs.getString("nickname"));
                map.put("createdAt", rs.getString("createdAt"));
                map.put("vote", String.valueOf(rs.getInt("vote")));
                map.put("view", String.valueOf(rs.getInt("view")));
                uploads.add(map);
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
        return uploads;
    }


    /**
     * 업로드 글을 조회시 view를 증가시키는 함수
     * @param uploadNum 증가시킬 업로드 글 번호
     */
    @Synchronized
    public void addUploadView(int uploadNum) {
        try
        {
            sql = "UPDATE upload SET `view` = `view` + 1 WHERE uploadNum = ?";

            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, uploadNum);
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


    /**
     * 파일 수정시 새로운 파일을 생성하는 함수
     * @param mp3File 새로 생성할 파일 오브젝트
     * @param nowDate 현재 시간
     * @return 정상 생성시 true, 실패시 false
     */
    public boolean createMp3File(MultipartFile mp3File, Long nowDate) {
        boolean result;

        try{
        File newFile = new File(beanConfig.UPLOAD_MP3FILE_PATH +
                nowDate +
                "_" +
                mp3File.getOriginalFilename().replaceAll(" ", ""));
        mp3File.transferTo(newFile);
        result = true;
        }catch (Exception e){
            e.printStackTrace();
            result = false;
        }
        return result;
    }
}
