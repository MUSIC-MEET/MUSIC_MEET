package com.example.music_meet.dto.Response;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Response_getMusicComment
{
    private int commentNum;
    private String comment;
    private String user;
    private String createdAt;
    private String imgSrc;
}
