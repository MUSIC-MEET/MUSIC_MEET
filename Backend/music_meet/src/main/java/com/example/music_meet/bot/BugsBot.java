package com.example.music_meet.bot;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.ArrayList;

public class BugsBot implements  Bot{
    ArrayList<Song> list;
    BugsBot() {
        list = new ArrayList<>();
    }

    private void parse() throws IOException {
        Document doc = Jsoup.connect("https://music.bugs.co.kr/chart").get();
        ArrayList<Element> list = doc.select("table.list > tbody > tr");

        for (Element ele : list)
        {
            final String rank = ele.select("div.ranking > strong").text();
            final String title = ele.select("p.title > a").text();
            final String singer = ele.select("p.artist > a").text();
            final String img = ele.select("a.thumbnail > img").attr("src");
            //System.out.println( rank +" : " + title + " : " + singer + " : " + img);
            Song song = new Song();
            song.setRank(Integer.parseInt(rank));
            song.setTitle(title);
            song.setSinger(singer);
            song.setImgSrc(img);
            song.setSite(3);
            this.list.add(song);
        }

    }
    @Override
    public void start() throws IOException {
        this.parse();
    }

    @Override
    public ArrayList<Song> getSongList() {
        return list;
    }
}
