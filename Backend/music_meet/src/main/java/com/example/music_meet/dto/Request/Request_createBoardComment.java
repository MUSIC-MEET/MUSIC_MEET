package com.example.music_meet.dto.Request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Request_createBoardComment
{
    private String genre;
    private int boardNum;
    private int userNum;
    private String comment;

}
