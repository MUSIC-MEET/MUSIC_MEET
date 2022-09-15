package com.example.music_meet.MusicCrawling;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

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
    private ArrayList<Element> song2 = new ArrayList<>();


    public ArrayList<MusicCrawlingSong> start()
    {
        try{
            for (int j = 0; j<genreCode.length; j++) {
                doc = Jsoup.connect("https://www.melon.com/genre/song_list.htm?gnrCode=" + genreCode[j]).get();

                //song1 = doc.select("table > tbody > tr > td > div > input");
                song1 = doc.getElementsByClass("input_check ");

                for (int i = 0; i < 15; i++)
                {
                    //System.out.println( i + "번째 : "+ song1.get(i).attr("value"));
                    System.out.println( genreCode[j] + " : " + i + "번째 : " + song1.get(i).attr("value"));
                    //System.out.println(song1.get(i).attr("value"));

                    MusicCrawlingSong musicCrawlingSong = new MusicCrawlingSong();
                    doc = Jsoup.connect("https://www.melon.com/song/detail.htm?songId=" + song1.get(i).attr("value")).get();

                    musicCrawlingSong.setTitle(doc.getElementsByClass("song_name").text().replace("곡명 ", "").replace("19금 ",""));
                    musicCrawlingSong.setSinger(doc.getElementsByClass("artist").select("a").attr("title"));
                    musicCrawlingSong.setAlbum(doc.getElementsByClass("list").select("dd").get(0).text());
                    musicCrawlingSong.setReleaseDate(doc.getElementsByClass("list").select("dd").get(1).text());
                    musicCrawlingSong.setImgSrc(doc.getElementsByClass("image_typeAll").select("img").attr("src"));
                    //System.out.println(doc.getElementById("d_video_summary"));
                    if (doc.getElementById("d_video_summary") == null) {
                        musicCrawlingSong.setLyrics("가사를 불러올 수 없거나 부적절한 내용이 첨부되어 있습니다.");
                    } else {
                        musicCrawlingSong.setLyrics(doc.getElementById("d_video_summary").text()); // 여기부터 문제

                    }
                    musicCrawlingSongs.add(musicCrawlingSong);
                    System.out.println(musicCrawlingSong);
                    System.out.println();
                }
            }
        }catch (Exception e){
            System.out.println("MusicCrawlingBot.start()에서 예외처리로 빠짐");
        }


        return musicCrawlingSongs;
    }
}
