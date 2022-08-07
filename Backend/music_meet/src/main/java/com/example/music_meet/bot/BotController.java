package com.example.music_meet.bot;

import com.example.music_meet.service.BotService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

public class BotController {
    ArrayList<Bot> bots;

    //@Autowired
    BotService botService = new BotService();

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
                //this.printSongs(songs);
                botService.deleteDB(songs.get(0).getSite());
                botService.insertDB(songs);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    public void printSongs(ArrayList<Song> songs) {
        for(Song song: songs) {
            song.print();



        }
    }







}
