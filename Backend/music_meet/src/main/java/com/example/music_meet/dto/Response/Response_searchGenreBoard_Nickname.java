package com.example.music_meet.dto.Response;

import lombok.*;

import java.util.ArrayList;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Response_searchGenreBoard_Nickname
{
    ArrayList<Response_searchGenreBoard> boards;
}
