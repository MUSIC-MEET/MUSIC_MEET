package com.example.music_meet.bot;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;

public class VibeBot implements  Bot{
    ArrayList<Song> list;
    VibeBot() {
        list = new ArrayList<>();
    }

    private void parse() throws IOException {
        Document doc = Jsoup.connect("https://vibe.naver.com/chart/total").get();
        Elements ele = doc.getElementsByClass("tracklist");

        ArrayList<Element> Top100List;

        /*for (Element ele : Top100List)
        {


        }*/




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
