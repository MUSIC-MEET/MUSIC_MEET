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
    private String title;
    private String singer;
    private String album;
    private String releaseDate;
    private String lyrics;
    private int vote;
    private String genre;

}
