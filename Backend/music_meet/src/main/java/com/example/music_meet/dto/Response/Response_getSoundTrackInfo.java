package com.example.music_meet.dto.Response;

import lombok.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Response_getSoundTrackInfo
{
    private String imgSrc;
    private String title;
    private String singer;
    private String album;
    private String releaseDate;
    private String lyrics;
    private int voteCount;
    private boolean isVote;
    private String genre;

    public boolean getIsVote() {
        return this.isVote;
    }

    public void setIsVote(boolean b){
        this.isVote = b;
    }



}
