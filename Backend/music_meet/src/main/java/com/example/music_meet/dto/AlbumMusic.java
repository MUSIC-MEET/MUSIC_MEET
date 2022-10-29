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
public class AlbumMusic {
    private Integer id;
    private String imgSrc;
    private String originTitle;
    private String artist;
    private String title;
    private String releaseDate;
    private String lyrics;
    private String fileName;
    private Integer view;
    private Integer count;
    private String genre;
    private Integer state;
    private String mp3Src;
    private String album;
    private boolean isVote;


    public void setIsVote(boolean vote){
        this.isVote = vote;
    }

    public boolean getIsVote(){
        return this.isVote;
    }
}
