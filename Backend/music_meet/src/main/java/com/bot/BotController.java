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

    }


}
