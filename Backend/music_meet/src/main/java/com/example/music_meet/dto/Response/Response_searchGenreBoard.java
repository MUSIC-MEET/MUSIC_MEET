package com.example.music_meet.dto.Response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Response_searchGenreBoard
{
    private int boardNum;
    private String title;
    private String user;
    private String createdAt;
    private int view;
    private int vote;
}
