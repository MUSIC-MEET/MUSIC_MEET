package com.example.music_meet.service;

import com.example.music_meet.bean.BeanConfig;
import com.example.music_meet.dto.PlayList;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;

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
     * @param USERNUM 호출한 유저
     * @return
     */
    public Object getPlayList(final int USERNUM) {
        ArrayList<PlayList> playLists = new ArrayList<>();
        try {
            sql = "SELECT ";
            Class.forName(beanConfig.classForName());
            conn = DriverManager.getConnection(beanConfig.mysqlurl(), beanConfig.mysqlid(), beanConfig.mysqlpassword());
            pstmt = conn.prepareStatement(sql);

            while(rs.next()){





            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
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
     * @param id 추가할 음악 혹은 업로드 번호
     * @return DB에 정상 삽입시 ture, 삽입 실패시 false 리턴
     */
    public boolean addPlayListMusic(int userNum, int id) {
        boolean result = false;
        try {
            sql = "INSERT INTO playlist(usernum, musicnum) VALUES(?,?)";
            Class.forName(beanConfig.classForName());
            conn = DriverManager.getConnection(beanConfig.mysqlurl(), beanConfig.mysqlid(), beanConfig.mysqlpassword());
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, userNum);
            pstmt.setInt(2, id);

            rsInt = pstmt.executeUpdate();
            if (rsInt >= 1){
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
