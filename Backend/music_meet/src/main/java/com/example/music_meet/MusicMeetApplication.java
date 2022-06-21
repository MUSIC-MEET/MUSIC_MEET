package com.example.music_meet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class MusicMeetApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicMeetApplication.class, args);

		/*BCryptPasswordEncoder b = new BCryptPasswordEncoder();
		String pw = "codevang";
		String encodedPw1 = b.encode(pw);
		String encodedPw2 = b.encode(pw);

		System.out.println("원본 : " + pw);
		System.out.println("첫번 째 인코딩 : " + encodedPw1);
		System.out.println("두번 째 인코딩 : " + encodedPw2);

		System.out.println("단순 문자열 비교 : "
				+ encodedPw1.equals(b.encode("codevang")));*/





	}

}
