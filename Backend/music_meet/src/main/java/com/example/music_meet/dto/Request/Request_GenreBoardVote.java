package com.example.music_meet.dto.Request;

import lombok.*;
import org.springframework.data.convert.Jsr310Converters;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Request_GenreBoardVote
{
    private String genre;
    private int boardNum;
    private String vote;
}
