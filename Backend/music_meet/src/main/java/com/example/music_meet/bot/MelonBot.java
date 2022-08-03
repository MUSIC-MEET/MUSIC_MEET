package com.example.music_meet.bot;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.ArrayList;

public class MelonBot implements Bot{
    ArrayList<Song> songs;
    @Override
    public void start() {
        songs = new ArrayList<>();
        try {
            this.parse();
        } catch(Exception e) {

            }
    }

    private void parse() throws IOException {
        Document doc = Jsoup.connect("https://www.melon.com/chart/index.htm").get();
        ArrayList<Element> song1 = doc.getElementsByClass("lst50");
        ArrayList<Element> song2 = doc.getElementsByClass("lst100");
        ArrayList<Element> songsEle = new ArrayList<>();
        songsEle.addAll(song1);
        songsEle.addAll(song2);
        int rank = 1;
        for(Element ele : songsEle) {
            final int site = 1;
            final String title = ele.select("div.ellipsis > span:nth-child(1)").text();
            final String singer = ele.select("div.ellipsis.rank02 > a ").text();
            final String imgSrc = ele.select("img").attr("src");
            Song song = new Song();
            song.setSite(site);
            song.setRank(rank++);
            song.setTitle(title);
            song.setSinger(singer);
            song.setImgSrc(imgSrc);
            songs.add(song);
        }
    }

    @Override
    public ArrayList<Song> getSongList() {
        return songs;
    }

}
