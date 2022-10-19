package com.example.music_meet.service;

import com.example.music_meet.bean.BeanConfig;
import com.example.music_meet.dto.MusicCrawlingSong;
import com.example.music_meet.dto.Response.Response_GetGenreBoardList;
import com.example.music_meet.dto.Response.Response_getMusicComment;
import com.example.music_meet.dto.Response.Response_getSoundTrackInfo;
import com.example.music_meet.dto.Response.Response_searchSoundTrack_Window;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Synchronized;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class SoundTrackService
{
    private ArrayList<MusicCrawlingSong> musicCrawlingSongs = new ArrayList<>();

    private Document doc;
    private Elements song1;
    private String[] genreCode = {"GN0100", "GN0400", "GN0300", "GN0700", "GN1900", "GN0900", "GN1600", "GN0200", "GN1700", "GN1500"};

    @Autowired
    private String classForName = "com.mysql.cj.jdbc.Driver";

    @Autowired
    private String mysqlurl = "jdbc:mysql://localhost:3306/music_meet?serverTimezone=Asia/Seoul&characterEncoding=UTF-8";

    @Autowired
    private String mysqlid = "root";

    @Autowired
    private String mysqlpassword = "0000";


    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;

    @Value("${server.url}")
    private String serverURL;

    @Value("${server.port}")
    private String serverPort;

    @Autowired
    private BeanConfig beanConfig;



    //
    // 크롤링 시작
    //
    public ArrayList<MusicCrawlingSong> getCrawling()
    {

        try{
            for (int j = 0; j<genreCode.length; j++) {
                doc = Jsoup.connect("https://www.melon.com/genre/song_list.htm?gnrCode=" + genreCode[j]).get();
                song1 = doc.getElementsByClass("input_check ");

                int genreState;
                switch (j)
                {
                    case 0:
                        genreState = 0;
                        break;
                    case 1:
                        genreState = 1;
                        break;
                    case 2:
                        genreState = 2;
                        break;
                    case 3:
                        genreState = 3;
                        break;
                    case 4:
                        genreState = 5;
                        break;
                    case 5:
                        genreState = 6;
                        break;
                    case 6:
                        genreState = 7;
                        break;
                    case 7:
                        genreState = 8;
                        break;
                    case 8:
                        genreState = 10;
                        break;
                    case 9:
                        genreState = 11;
                        break;
                    default:
                        genreState = 100; // 정의되지 않은 장르
                        break;
                }

                for (int i = 0; i < 15; i++)
                {
                    //System.out.println( genreCode[j] + " : " + i + "번째 : " + song1.get(i).attr("value"));

                    MusicCrawlingSong musicCrawlingSong = new MusicCrawlingSong();
                    doc = Jsoup.connect("https://www.melon.com/song/detail.htm?songId=" + song1.get(i).attr("value")).get();

                    musicCrawlingSong.setTitle(doc.getElementsByClass("song_name").text().replace("곡명 ", "").replace("19금 ",""));
                    musicCrawlingSong.setSinger(doc.getElementsByClass("artist").select("a").attr("title"));
                    musicCrawlingSong.setAlbum(doc.getElementsByClass("list").select("dd").get(0).text());
                    musicCrawlingSong.setReleaseDate(doc.getElementsByClass("list").select("dd").get(1).text());
                    musicCrawlingSong.setImgSrc(doc.getElementsByClass("image_typeAll").select("img").attr("src"));
                    musicCrawlingSong.setGenre(genreState);
                    if (doc.getElementById("d_video_summary") == null) {
                        musicCrawlingSong.setLyrics("가사를 불러올 수 없거나 부적절한 내용이 첨부되어 있습니다.");
                    } else {
                        musicCrawlingSong.setLyrics(doc.getElementById("d_video_summary").text()); // 여기부터 문제
                    }
                    this.musicCrawlingSongs.add(musicCrawlingSong);
                    //System.out.println(musicCrawlingSong);
                    //System.out.println();
                }
            }
        }catch (Exception e){
            System.out.println("MusicCrawlingBot.getCrawling()에서 예외처리로 빠짐");
            e.printStackTrace();
        }
        return musicCrawlingSongs;
    }


    //
    // DB에 삽입
    //
    public boolean insertDB(ArrayList<MusicCrawlingSong> musicCrawlingSongs)
    {
        boolean result = false;

        try {
            sql = "INSERT INTO music(ImgSrc, title, singer, Album, releaseDate, lyrics, Genre)" +
                    " VALUES(?,?,?,?,?,?,?)";
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            for(int i = 0; i < musicCrawlingSongs.size(); i++)
            {
                pstmt.setString(1, musicCrawlingSongs.get(i).getImgSrc());
                pstmt.setString(2, musicCrawlingSongs.get(i).getTitle());
                pstmt.setString(3, musicCrawlingSongs.get(i).getSinger());
                pstmt.setString(4, musicCrawlingSongs.get(i).getAlbum());
                pstmt.setString(5, musicCrawlingSongs.get(i).getReleaseDate());
                pstmt.setString(6, musicCrawlingSongs.get(i).getLyrics());
                pstmt.setInt(7, musicCrawlingSongs.get(i).getGenre());
                rsInt = pstmt.executeUpdate();
            }

            if (rsInt > 0 )
            {
                result = true;
            }

        } catch (Exception e) {
            result = false;
            System.out.println("MusicCrawlingBot.insertDB에서 문제 발생");
            e.printStackTrace();
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


    //
    // DB삭제
    //
    public void deleteDB()
    {
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            sql = "DELETE FROM Music";
            pstmt = conn.prepareStatement(sql);

            rsInt = pstmt.executeUpdate();

        } catch (Exception e) {
            System.out.println("MusicCrawlingBot.insertDB에서 문제 발생");
            e.printStackTrace();
        } finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }


    }


    //
    // start
    //
    public boolean start()
    {
        this.deleteDB();                        // 한번 지우고
        ArrayList<MusicCrawlingSong> musicCrawlingSongs1 = getCrawling();
        if(this.insertDB(musicCrawlingSongs1))     // 실행
            return true;
        else
            return false;
    }




    //
    // 음악 댓글 작성.md
    //
    public boolean createSoundTrackComment(final int userNum, final int musicNum, final String comment)
    {
        boolean result = false;
        java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
        try
        {
            sql = "INSERT INTO musicComment(musicnum, usernum, content, createdat)" +
                    " VALUES(?,?,?,?)";

            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, musicNum);
            pstmt.setInt(2, userNum);
            pstmt.setString(3, comment);
            pstmt.setTimestamp(4, date);

            rsInt = pstmt.executeUpdate();

            if (rsInt > 0 )
            {
                result = true;
            }
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
    // 음악 댓글 수정
    //
    public boolean modifySoundTrackComment(int userNum, int musicCommentNum, String comment)
    {
        boolean result = false;
        try
        {
            sql = "UPDATE musicComment SET content = ? WHERE musicCommentNum = ? AND userNum = ? AND state = 0";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, comment);
            pstmt.setInt(2, musicCommentNum);
            pstmt.setInt(3, userNum);

            rsInt = pstmt.executeUpdate();
            if (rsInt > 0)
            {
                result = true;
            }
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
    // 음악 댓글 삭제
    //
    public boolean deleteSoundTrackComment(int userNum, int musicCommentNum)
    {
        boolean result = false;

        try
        {
            sql = "UPDATE musicComment SET state = 1 WHERE musicCommentNum = ? AND userNum = ? AND state = 0";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, musicCommentNum);
            pstmt.setInt(2, userNum);

            rsInt = pstmt.executeUpdate();
            if (rsInt > 0)
            {
                result = true;
            }
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
    // 음악 검색창
    //
    public ArrayList<Response_searchSoundTrack_Window> searchSoundTrack_Window(final String keyWord)
    {
        ArrayList<Response_searchSoundTrack_Window> response_searchSoundTrack_windows = new ArrayList<>();
        try
        {
            sql = "SELECT musicnum, imgsrc, origin_title, origin_singer FROM music WHERE (singer LIKE ? OR title LIKE ?) AND state = 0";

            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, "%" + keyWord.replaceAll(" ","") + "%");
            pstmt.setString(2, "%" + keyWord.replaceAll(" ","") + "%");
            rs = pstmt.executeQuery();

            while(rs.next())
            {
                Response_searchSoundTrack_Window response_searchSoundTrack_window = new Response_searchSoundTrack_Window();
                response_searchSoundTrack_window.setMusicNum(rs.getInt("musicnum"));
                response_searchSoundTrack_window.setImgSrc(serverURL + ":" + serverPort + "/music/image/"+ rs.getString("imgsrc"));
                response_searchSoundTrack_window.setTitle(rs.getString( "origin_title"));
                response_searchSoundTrack_window.setSinger(rs.getString("origin_singer"));
                response_searchSoundTrack_windows.add(response_searchSoundTrack_window);
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
        return response_searchSoundTrack_windows;
    }


    //
    // 음악 정보 호출
    //
    @Synchronized
    public Response_getSoundTrackInfo getSoundTrackInfo(final int userNum, final int musicNum)
    {
        Response_getSoundTrackInfo response_getSoundTrackInfo = new Response_getSoundTrackInfo();
        try
        {
            sql = "SELECT a.imgSrc, a.origin_title, a.origin_singer, a.album, a.releaseDate, a.lyrics, a.vote, b.name" +
                    " FROM music a, genrestate b WHERE a.genre = b.genre AND a.musicnum = ? AND a.state = 0";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, musicNum);
            rs = pstmt.executeQuery();

            while(rs.next())
            {
                response_getSoundTrackInfo.setImgSrc(serverURL + ":" + serverPort + "/music/image/" + rs.getString("imgSrc"));
                response_getSoundTrackInfo.setTitle(rs.getString("origin_title"));
                response_getSoundTrackInfo.setSinger(rs.getString("origin_singer"));
                response_getSoundTrackInfo.setAlbum(rs.getString("album"));
                response_getSoundTrackInfo.setReleaseDate(rs.getString("releaseDate"));
                response_getSoundTrackInfo.setLyrics(rs.getString("lyrics"));
                response_getSoundTrackInfo.setVoteCount(rs.getInt("vote"));
                response_getSoundTrackInfo.setIsVote(false);
                response_getSoundTrackInfo.setGenre(rs.getString("name"));
            }

            sql = "SELECT musicNum FROM MusicVote WHERE userNum = ? AND musicNum = ?";

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            pstmt.setInt(2, musicNum);

            rs = pstmt.executeQuery();

            if(rs.next()) 
            {
                response_getSoundTrackInfo.setIsVote(true);
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
        return response_getSoundTrackInfo;


    }



    //
    // musicVote 테이블에서 중복 확인
    //

    public boolean isSelectVote(int userNum, int musicNum)
    {
        boolean result = false;
        try
        {
            sql = "SELECT musicNum FROM MusicVote WHERE userNum = ? AND musicNum = ?";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            pstmt.setInt(2, musicNum);
            rs = pstmt.executeQuery();

            if (rs.next())
            {
                result = true;
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
    // 음악 정보 좋아요 추가
    //
    public boolean addMusicCommentVote(final int userNum, final int musicNum)
    {
        boolean result = false;
        boolean result2 = false;
        try
        {
            sql = "INSERT INTO MusicVote(MusicNum, userNum) VALUES(?,?)";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, musicNum);
            pstmt.setInt(2, userNum);
            rsInt = pstmt.executeUpdate();

            if (rsInt > 0)
            {
                result = true;
            }

            sql = "UPDATE Music SET vote = " +
                    "(SELECT COUNT(userNum) FROM MusicVote WHERE musicNum = ?) " +
                    "WHERE musicNum = ?";

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, musicNum);
            pstmt.setInt(2, musicNum);

            rsInt = pstmt.executeUpdate();
            if (rsInt > 0){
                result2 = true;
            }

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
        return result && result2;
    }



    //
    // musicvote 테이블에서 좋아요 삭제
    //
    public boolean deleteMusicCommentVote(int userNum, int musicNum)
    {
        boolean result = false;
        boolean result2 = false;
        try
        {
            sql = "DELETE FROM musicVote WHERE userNum = ? AND musicNum = ?";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            pstmt.setInt(2, musicNum);
            rsInt = pstmt.executeUpdate();

            if (rsInt > 0)
            {
                result = true;
            }

            sql = "UPDATE Music SET vote = " +
                    "(SELECT COUNT(userNum) FROM MusicVote WHERE musicNum = ?) " +
                    "WHERE musicNum = ?";

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, musicNum);
            pstmt.setInt(2, musicNum);

            rsInt = pstmt.executeUpdate();
            if (rsInt > 0){
                result2 = true;
            }


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
        return result && result2;
    }


    //
    // 음악 댓글 호출
    //
    @Synchronized
    public ArrayList<Response_getMusicComment> getMusicComment(final int musicNum)
    {
        ArrayList<Response_getMusicComment> response_getMusicComments = new ArrayList<>();
        try
        {
            sql = "SELECT b.musicCommentNum, b.content, b.createdAt, a.nickname, a.userimage FROM user a, musicComment b " +
                    " WHERE b.musicNum = ? AND b.state = 0 AND a.userNum = b.userNum ORDER BY b.createdAt DESC";
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, musicNum);

            rs = pstmt.executeQuery();

            int i = 0;
            while (rs.next())
            {
                Response_getMusicComment response_getMusicComment = new Response_getMusicComment();
                response_getMusicComment.setCommentNum(rs.getInt("musicCommentNum"));
                response_getMusicComment.setComment(rs.getString("content"));
                response_getMusicComment.setUser(rs.getString("nickname"));
                response_getMusicComment.setCreateAt(rs.getTimestamp("createdAt"));
                response_getMusicComment.setImgSrc(serverURL + ":" + serverPort + "/user" + "/image/" + rs.getString("userImage"));
                response_getMusicComments.add(response_getMusicComment);
                i++;
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
        return response_getMusicComments;
    }


    /**
     *
     * @param num
     * @return
     */


    /**
     *메인페이지에 표시할 음원 목록 호출을 좋아요 순으로 num개 호출하는 함수
     * @param num 호출할 갯수
     * @param type popular, latest 중에 하나를 받는 변수
     * @return ArrayList<Map<String, String>> 타입
     */
    @Synchronized
    public ArrayList<Map<String, String>> getMusicList(int num, String type) {
        ArrayList<Map<String, String>> musics = new ArrayList<>();

        if (type.equals("popular")){
            sql = "SELECT musicnum, imgsrc, origin_title, origin_singer FROM music WHERE state = 0 ORDER BY vote DESC" +
                    " LIMIT ?,?";
        }
        else if (type.equals("latest")){

        } else {
            sql = "SELECT musicnum, imgsrc, origin_title, origin_singer FROM music WHERE state = 0 ORDER BY releasedate DESC" +
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
                Map<String, String> map = new HashMap<>();
                map.put("id", String.valueOf(rs.getInt("musicnum")));
                map.put("imgSrc", serverURL + ":" + serverPort + beanConfig.MUSIC_IMAGE_URL + rs.getString("imgsrc"));
                map.put("title", rs.getString("origin_title"));
                map.put("artist", rs.getString("origin_singer"));
                musics.add(map);
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
        return musics;
    }
}
