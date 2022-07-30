package com.example.music_meet.bot;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class BotMain {
    @Scheduled(fixedRate = 1000 * 60 * 30)
    public void botMain() throws IOException {
        BotController botController = new BotController();
        botController.addBot(new MelonBot());
        botController.addBot(new GeineBot());
        botController.addBot(new BugsBot());
        botController.start();
    }
}
