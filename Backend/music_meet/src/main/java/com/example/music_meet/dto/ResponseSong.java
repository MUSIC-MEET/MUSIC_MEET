package com.example.music_meet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ResponseSong {

    private String title;
    private String singer;
    private String imgSrc;
    private int rank;

}
