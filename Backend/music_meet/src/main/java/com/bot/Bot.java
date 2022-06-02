import java.io.IOException;
import java.util.ArrayList;

public interface Bot {
    void start() throws IOException;
    ArrayList<Song> getSongList();

}
