package com.example.music_meet.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Response_GetGenreBoardForGenreNum
{
    private String imgSrc;
    private String user;
    private String title;
    private String content;
    private String createdAt;
    private int view;
    private int upvote;
    private int downvote;
}
