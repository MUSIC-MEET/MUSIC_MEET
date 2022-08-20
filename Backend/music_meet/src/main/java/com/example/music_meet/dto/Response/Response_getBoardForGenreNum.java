package com.example.music_meet.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Response_getBoardForGenreNum
{
    private String userimage;
    private String title;
    private String content;
    private String createdat;
    private int view;
    private int vote;
}
