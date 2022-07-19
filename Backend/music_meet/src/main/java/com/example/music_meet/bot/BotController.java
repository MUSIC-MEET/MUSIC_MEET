package com.example.music_meet.bot;

import java.util.ArrayList;

public class BotController {
    ArrayList<Bot> bots;

    BotController() {
        bots = new ArrayList<>();
    }
    public void addBot(Bot bot) {
        bots.add(bot);
    }

    public void start() {
        for(Bot bot: bots) {
            ArrayList<Song> songs;
            try {
                bot.start();
                songs = bot.getSongList();
                this.printSongs(songs);

            } catch (Exception e) {

            }
        }
    }
    public void printSongs(ArrayList<Song> songs) {
        for(Song song: songs) {
            song.print();
        }
    }
    public void insertDB(ArrayList<Song> songs) {
        // insert;
        // 데이터가 날라오는데 어느 사이트에서 날라오는 데이터인지 식별이 안됨
        // 얘 호출하는 곳에서 String 타입으로 사이트 이름 가져올것

    }


}
