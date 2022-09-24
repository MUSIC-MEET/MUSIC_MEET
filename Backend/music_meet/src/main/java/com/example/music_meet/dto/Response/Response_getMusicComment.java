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
    private int musicCommentNum;
    private String comment;
    private String user;
    private Timestamp createAt;
}
