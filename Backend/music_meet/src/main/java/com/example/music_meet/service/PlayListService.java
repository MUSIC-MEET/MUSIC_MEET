package com.example.music_meet.service;

import com.example.music_meet.bean.BeanConfig;
import com.example.music_meet.dto.PlayList;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 플레이리스트 서비스
 */
@Service
@NoArgsConstructor
public class PlayListService {

    @Autowired
    private BeanConfig beanConfig;

    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;




    /**
     * 재생목록 호출
     * @param userNum 호출한 유저
     * @return
     */
    public Object getPlayList(final int userNum) {
        ArrayList<PlayList> playLists = new ArrayList<>();

        String[] list;
        try {
            sql = "SELECT playlist FROM playlist WHERE usernum = ?";
            Class.forName(beanConfig.classForName());
            conn = DriverManager.getConnection(beanConfig.mysqlurl(), beanConfig.mysqlid(), beanConfig.mysqlpassword());
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            rs = pstmt.executeQuery();
            rs.next();
            list = rs.getString("playlist").replace("[", "").replace("]","").split(",");
            for (int i = 0; i < list.length; i++) {
                sql = "SELECT musicnum, imgsrc, filename, origin_title AS title, origin_singer AS altist, lyrics, `length` " +
                        "FROM music WHERE musicnum = ? AND state = 0";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, Integer.parseInt(list[i]));
                rs = pstmt.executeQuery();
                if (rs.next()) {
                    PlayList music = new PlayList();
                    music.setId(rs.getInt("musicnum"));
                    music.setImgSrc(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.MUSIC_IMAGE_URL + rs.getString("imgSrc"));
                    music.setMp3File(beanConfig.getServerUrl() + ":" + beanConfig.getServerPort() + beanConfig.MUSIC_MP3_URL + rs.getString("filename"));
                    music.setTitle(rs.getString("title"));
                    music.setArtist(rs.getString("altist"));
                    music.setLyrics(rs.getString("lyrics"));
                    music.setLength(rs.getInt("length"));
                    playLists.add(music);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

        return playLists;
    }


    /**
     * 재생목록 음악 추가
     * @param userNum 유저 번호
     * @param id 추가할 음악
     * @return DB에 정상 삽입시 ture, 삽입 실패시 false 리턴
     */
    public boolean addPlayListMusic(int userNum, int id) {
        boolean result = false;
        String playlist = "";
        try {
            sql = "SELECT playlist FROM playlist WHERE usernum = ? LIMIT 0,1";
            Class.forName(beanConfig.classForName());
            conn = DriverManager.getConnection(beanConfig.mysqlurl(), beanConfig.mysqlid(), beanConfig.mysqlpassword());
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, userNum);

            rs = pstmt.executeQuery();
            if (rs.next()){
                playlist = rs.getString("playlist").replace("[","").replace("]","");
                sql = "UPDATE playlist SET playlist = ? WHERE usernum = ?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, "["+ playlist + "," + id + "]");
                pstmt.setInt(2,userNum);
                rsInt = pstmt.executeUpdate();
                if (rsInt >= 1){
                    result = true;
                }
            }else {
                sql = "INSERT INTO playlist(usernum, playlist) VALUES (?,?)";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1,userNum);
                pstmt.setString(2, "[" + id + "]");
                rsInt = pstmt.executeUpdate();
                if (rsInt >= 1){
                    result = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rsInt = 0;
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
     * 재생목록에서 음악 삭제
     * @param userNum 유저 번호
     * @param index 삭제할 음악
     * @return DB에서 정상 삭제시 true, 삭제 실패시 false
     */
    public boolean deletePlayListMusic(int userNum, int index) {
        boolean result = false;
        String[] songs = {""};
        try {
            sql = "SELECT playlist FROM playlist WHERE usernum = ?";
            Class.forName(beanConfig.classForName());
            conn = DriverManager.getConnection(beanConfig.mysqlurl(), beanConfig.mysqlid(), beanConfig.mysqlpassword());
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            rs = pstmt.executeQuery();
            if (rs.next()){
                songs = rs.getString("playlist").replace("[","").replace("]","").split(",");
            } else {
                result = false;
            }

            ArrayList<String> list = new ArrayList<>(List.of(songs));
            list.remove(index);

            sql = "UPDATE playlist SET playlist = ? WHERE usernum = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, list.toString().replace(" ",""));
            pstmt.setInt(2, userNum);
            rsInt = pstmt.executeUpdate();
            if (rsInt >= 1){
                result = true;
            }
            else {
                result = false;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rsInt = 0;
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
     * 재생목록에서 음악 검색
     * @param KEYWORD 찾고자 하는 단어
     * @return ArrayList<PlayList> playList 타입의 변수
     */
    public ArrayList<PlayList> searchPlayListMusic(final String KEYWORD) {
        ArrayList<PlayList> playList = new ArrayList<>();
        try {
            sql = "SELECT musicnum, imgsrc, origin_title AS title, origin_singer AS altist " +
                    "FROM music WHERE title LIKE ? OR origin_singer LIKE ? AND state = 0 LIMIT 0,10";
            Class.forName(beanConfig.classForName());
            conn = DriverManager.getConnection(beanConfig.mysqlurl(), beanConfig.mysqlid(), beanConfig.mysqlpassword());
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, "%" + KEYWORD + "%");
            pstmt.setString(2, "%" + KEYWORD + "%");
            rs = pstmt.executeQuery();
            while(rs.next()) {
                PlayList music = new PlayList();
                music.setId(rs.getInt("musicnum"));
                music.setImgSrc(beanConfig.getServerUrl() + ":"+ beanConfig.getServerPort() + beanConfig.MUSIC_IMAGE_URL + rs.getString("imgsrc"));
                music.setTitle(rs.getString("title"));
                music.setArtist(rs.getString("altist"));
                playList.add(music);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return playList;
    }


    /**
     * 재생목록 순서 변경
     * @param id userNum
     * @return 변경 성공시 true, 실패시 false
     */
    public boolean modifyPlayListMusic(final int id, final String playList) {
        boolean result = false;
        try {
            sql = "UPDATE playlist SET `playlist` = ? WHERE usernum = ?";
            Class.forName(beanConfig.classForName());
            conn = DriverManager.getConnection(beanConfig.mysqlurl(), beanConfig.mysqlid(), beanConfig.mysqlpassword());
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, playList);
            pstmt.setInt(2, id);
            rsInt = pstmt.executeUpdate();
            if (rsInt >= 1) {
                result = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
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

}
