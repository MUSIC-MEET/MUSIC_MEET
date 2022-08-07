package com.example.music_meet.service;

import com.example.music_meet.bot.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Service
public class BotService {

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

    @Autowired
    private java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
    private String table;


    public void insertDB(ArrayList<Song> songs) {
        // insert;
        // 데이터가 날라오는데 어느 사이트에서 날라오는 데이터인지 식별이 안됨
        // 얘 호출하는 곳에서 String 타입으로 사이트 이름 가져올것
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            for (Song song : songs)
            {
                switch (song.getSite())
                {
                    case 1:
                        sql = "insert into melonchart values (?,?,?,?,?,?)";
                        break;
                    case 2:
                        sql = "insert into geniechart values (?,?,?,?,?,?)";
                        break;
                    case 3:
                        sql = "insert into bugschart values (?,?,?,?,?,?)";
                        break;
                    case 4:
                        sql = "insert into flochart values (?,?,?,?,?,?)";
                        break;
                    default:
                        break;
                }

                final int rank = song.getRank();
                final String title = song.getTitle();
                final String singer = song.getSinger();
                final String img_src = song.getImgSrc();
                final int site = song.getSite();


                pstmt = conn.prepareStatement(sql);

                pstmt.setInt(1, rank);
                pstmt.setTimestamp(2, date);
                pstmt.setString(3, title);
                pstmt.setString(4, singer);
                pstmt.setString(5, img_src);
                pstmt.setInt(6, site);

                rsInt = pstmt.executeUpdate();
            }

        } catch (Exception e) {
            System.out.println("BotService.insertDB()에서 예외처리로 빠짐");
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

    public void deleteDB(int siteCode)
    {

        try {
            switch (siteCode)
            {
                case 1:
                    sql = "delete from melonchart";
                    break;
                case 2:
                    sql = "delete from geniechart";
                    break;
                case 3:
                    sql = "delete from bugschart";
                    break;
                case 4:
                    sql = "delete from flochart";
                    break;
                default:
                    break;
            }

            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            rsInt = pstmt.executeUpdate();
        } catch (Exception e) {
            System.out.println("BotService.deleteDB()에서 예외처리로 빠짐");
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












}
