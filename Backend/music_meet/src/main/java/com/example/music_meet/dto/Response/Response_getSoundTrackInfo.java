package com.example.music_meet.dto.Response;

import lombok.*;

import javax.persistence.criteria.CriteriaBuilder;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Response_getSoundTrackInfo
{
    private Integer id;
    private String imgSrc;
    private String title;
    private String artist;
    private String releaseDate;
    private String lyrics;
    private Integer count;
    private boolean isVote;
    private String genre;
    private String mp3Src;
    private Integer view;

    public boolean getIsVote() {
        return this.isVote;
    }

    public void setIsVote(boolean b){
        this.isVote = b;
    }



}
