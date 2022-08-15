package com.example.music_meet.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RequestWriteGenreBoard
{
    private String genre;
    private String title;
    private String content;
    private int usernum;
}
