package com.example.music_meet.dto.Response;

import lombok.*;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Response_getBoardCommentList_Comments
{
    private ArrayList<Response_GetBoardCommentList_Comment> comments = new ArrayList<>();
}