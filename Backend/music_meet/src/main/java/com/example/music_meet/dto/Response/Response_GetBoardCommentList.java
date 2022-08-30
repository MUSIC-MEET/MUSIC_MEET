package com.example.music_meet.dto.Response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Response_GetBoardCommentList
{
    private int commentNum;
    private String content;
    private String createdAt;
    private String nickname;
    private String userImage;
    private int upvote;
    private int downvote;
}
