package com.example.music_meet.bot;

import com.example.music_meet.GsonType.Body;
import com.example.music_meet.GsonType.Data;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.simple.parser.JSONParser;
import org.jsoup.Jsoup;

import java.io.IOException;
import java.util.ArrayList;


public class FloBot implements Bot
{
    ArrayList<Song> songs;


    FloBot()
    {
        songs = new ArrayList<>();
    }
    private void parse() throws IOException{

        String doc = Jsoup.connect("https://www.music-flo.com/api/display/v1/browser/chart/1/track/list?size=100")
                .header("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36")
                .ignoreContentType(true)
                .get().body().text();
        //System.out.println(doc);
        try {
            JSONParser jsonParser = new JSONParser();
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            Body body = gson.fromJson(doc, Body.class);
            //System.out.println(body.data.trackList.size());

            for (int i = 0; i <= body.data.trackList.size(); i++)
            {
                final int site = 4;
                final int rank = i+1;
                final String title =  body.data.trackList.get(i).name;
                final String singer = body.data.trackList.get(i).representationArtist.name;
                final String imgSrc = body.data.trackList.get(i).album.imgList.get(0).url;

                //System.out.println(rank); // 통과
                //System.out.println(title); // 통과
                //System.out.println(singer); // 통과
                //System.out.println(imgSrc); // 통과
                //System.out.println(rank + " : " + title + " : " + singer + " : " + imgSrc); // 통과

                Song song = new Song();
                song.setSite(site);
                song.setRank(rank);
                song.setTitle(title);
                song.setSinger(singer);
                song.setImgSrc(imgSrc);

                songs.add(song);
            }


        }catch (Exception e){

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
