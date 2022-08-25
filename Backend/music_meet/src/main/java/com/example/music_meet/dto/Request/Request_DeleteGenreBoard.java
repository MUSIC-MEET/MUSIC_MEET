package com.example.music_meet.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Request_DeleteGenreBoard
{
    private String genre;
    private String boardNum;
    private String userNum;
}
