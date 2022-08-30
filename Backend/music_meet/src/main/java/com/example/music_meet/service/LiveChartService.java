package com.example.music_meet.service;

import com.example.music_meet.dto.ResponseChart;
import com.example.music_meet.dto.ResponseSong;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LiveChartService {

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



    //
    // 차트
    //
    public ResponseChart getChart(String siteCode, String _rank)
    {
        final int site = Integer.parseInt(siteCode);
        int rank = 0;
        String title, singer, img_src, updateTime = null;
        ResponseChart responseChart = new ResponseChart();
        ArrayList<ResponseSong> songs = new ArrayList<>();

        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            switch (site)
            {
                case 1:
                    sql = "SELECT `rank` , `title`, `singer`, `img_src` FROM melonchart LIMIT ?";
                    break;
                case 2:
                    sql = "SELECT `rank`, `title`, `singer`, `img_src` FROM geniechart LIMIT ?";
                    break;
                case 3:
                    sql = "SELECT `rank`, `title`, `singer`, `img_src` FROM bugschart LIMIT ?";
                    break;
                case 4:
                    sql = "SELECT `rank`, `title`, `singer`, `img_src` FROM flochart LIMIT ?";
                default:
                    break;
            }
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(_rank));
            rs = pstmt.executeQuery();
            while (rs.next())
            {
                rank = rs.getInt(1);
                title = rs.getString(2);
                singer = rs.getString(3);
                img_src = rs.getString(4);

                ResponseSong song = new ResponseSong();
                song.setRank(rank);
                song.setTitle(title);
                song.setSinger(singer);
                song.setImgSrc(img_src);

                songs.add(song);
            }

            switch (site)
            {
                case 1:
                    sql = "SELECT `time` FROM melonchart LIMIT 1";
                    break;
                case 2:
                    sql = "SELECT `time` FROM geniechart LIMIT 1";
                    break;
                case 3:
                    sql = "SELECT `time` FROM bugschart LIMIT 1";
                    break;
                case 4:
                    sql = "SELECT `time` FROM flochart LIMIT 1";
                    break;
                default:
                    break;
            }
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            while(rs.next())
            {
                updateTime = rs.getString(1);
            }

            responseChart.setSongs(songs);
            responseChart.setUpdateTime(updateTime);


        } catch (Exception e) {
            System.out.println("BotService.insertDB()에서 예외처리로 빠짐");
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
        return responseChart;

    }
}
