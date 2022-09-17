package com.example.music_meet.MusicCrawling;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MusicCrawlingSong
{
    private String imgSrc;      // 이미지
    private String title;       // 노래 제목
    private String singer;      // 가수 이름
    private String album;       // 소속 앨범
    private String releaseDate; // 발매일
    private String lyrics;      // 가사
    private int Genre;       // 장르
}
