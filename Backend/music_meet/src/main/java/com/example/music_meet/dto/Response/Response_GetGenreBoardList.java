package com.example.music_meet.dto.Response;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Response_GetGenreBoardList
{
    private int boardNum;
    private String title;
    private String user;
    private String createdAt;
    private int view;
    private int vote;
}
