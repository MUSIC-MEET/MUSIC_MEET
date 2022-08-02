package com.example.music_meet.bot;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.ArrayList;

public class GeineBot implements Bot{
    ArrayList<Song> songs;

    GeineBot() {
        songs = new ArrayList<>();
    }
    private void parse() throws IOException {
        int rank = 1;
        for(int i=1; i<=2; i++) {
            Document doc = Jsoup.connect("https://www.genie.co.kr/chart/top200?pg="+i).get();
            ArrayList<Element> list = doc.getElementsByClass("list");
            for( Element ele : list ) {
                if(ele.hasAttr("songid")){
                    final int site = 2;
                    final String title = ele.select("td.info > a:nth-child(1)").text();
                    final String singer = ele.select("td.info > a:nth-child(2)").text();
                    final String imgSrc = "https:" + ele.select(".cover > img").attr("src");
                    Song song = new Song();
                    song.setSite(site);
                    song.setRank(rank++);
                    song.setTitle(title);
                    song.setSinger(singer);
                    song.setImgSrc(imgSrc);
                    songs.add(song);
//                    System.out.println("랭킹 : " + rank++);
                }
            }
        }

    }

    @Override
    public void start() throws IOException {
        this.parse();
    }

    @Override
    public ArrayList<Song> getSongList() {
        return songs;
    }
}
