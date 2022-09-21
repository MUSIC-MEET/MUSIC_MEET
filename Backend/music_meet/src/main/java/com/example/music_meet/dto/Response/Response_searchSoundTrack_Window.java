package com.example.music_meet.dto.Response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Response_searchSoundTrack_Window
{
    private int musicNum;
    private String imgSrc;
    private String title;
    private String singer;
}
