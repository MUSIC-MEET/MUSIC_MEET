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
    private String nickname;
    private String createdAt;
    private int view;
    private int upvote;
    private int downvote;
}
