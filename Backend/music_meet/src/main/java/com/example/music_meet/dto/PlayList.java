package com.example.music_meet.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@ToString
@NoArgsConstructor
public class PlayList {

    private Integer id; // musicNum or uploadNum
    private String imgSrc; // localhost:8080/~~~~~
    private String mp3File; // localhost:8080/
    private String title; // origin_title
    private String singer; //
    private String text; // 음원일시 lyrics 커버일시 comment를 보낼것
}
