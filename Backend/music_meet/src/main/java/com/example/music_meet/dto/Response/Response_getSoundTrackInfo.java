package com.example.music_meet.dto.Response;

import lombok.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Response_getSoundTrackInfo
{
    private String imgsrc;
    private String origin_title;
    private String origin_singer;
    private String album;
    private String releaseDate;
    private String lyrics;
    private int vote;
    private String genre;

}
