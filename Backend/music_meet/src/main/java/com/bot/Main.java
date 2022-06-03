import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BotController botController = new BotController();
//        botController.addBot(new MelonBot());
        botController.addBot(new GeineBot());
//        botController.addBot(new VibeBot());
        botController.start();

    }
}
