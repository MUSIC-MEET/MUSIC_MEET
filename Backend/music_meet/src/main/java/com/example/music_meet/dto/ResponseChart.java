package com.example.music_meet.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@NoArgsConstructor
@Getter
@Setter
public class ResponseChart {

    private String updateTime;
    private ArrayList<ResponseSong> songs;
}
