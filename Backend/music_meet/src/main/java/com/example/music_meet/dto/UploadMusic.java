package com.example.music_meet.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UploadMusic implements Music{
    private Integer id; //uploadNum
    private String imgSrc; // userimage
    private String user;    // nickname
    private String title;   // origin_title
    private String createdAt;
    private String description; // comment
    private String mp3Src;
    private Integer view;
    private Integer count; // vote
    private Integer isVote;
    private Integer state;
    private String file;
    private String originFile;

}
