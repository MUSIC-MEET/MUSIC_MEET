package com.example.music_meet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class MusicMeetApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicMeetApplication.class, args);
	}

}
