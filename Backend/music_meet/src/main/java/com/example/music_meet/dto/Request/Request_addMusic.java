package com.example.music_meet.dto.Request;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Request_addMusic
{
    private String imgSrc;
    private String origin_Title;
    private String origin_Singer;
    private String title;
    private String singer;
    private String album;


}
