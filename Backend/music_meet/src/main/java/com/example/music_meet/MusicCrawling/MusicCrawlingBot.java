package com.example.music_meet.MusicCrawling;

import com.example.music_meet.bot.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.*;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MusicCrawlingBot
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
                    case 0: genreState = 0;
                    case 1: genreState = 1;
                    case 2: genreState = 2;
                    case 3: genreState = 3;
                    case 4: genreState = 5;
                    case 5: genreState = 6;
                    case 6: genreState = 7;
                    case 7: genreState = 8;
                    case 8: genreState = 10;
                    case 9: genreState = 11;
                    default:
                        genreState = 100; // 정의되지 않은 장르
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
                System.out.println( musicCrawlingSongs.get(i).getGenre() + " : " + musicCrawlingSongs.get(i).getTitle() + " : " + i);
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
    public void start()
    {
        this.deleteDB();                 // 한번 지우고
        ArrayList<MusicCrawlingSong> musicCrawlingSongs1 = getCrawling();
        this.insertDB(musicCrawlingSongs1);    // 실행
    }



}
