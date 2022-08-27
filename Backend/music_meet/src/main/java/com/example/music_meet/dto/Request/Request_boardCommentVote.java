package com.example.music_meet.dto.Request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Request_boardCommentVote
{
    private String genre;
    private int boardNum;
    private int commentNum;
    private String vote;
}
