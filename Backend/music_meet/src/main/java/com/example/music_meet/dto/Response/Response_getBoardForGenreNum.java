package com.example.music_meet.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Response_getBoardForGenreNum
{
    private String imgSrc;
    private String Nickname;
    private String title;
    private String content;
    private String createdAt;
    private int view;
    private int vote;
}
