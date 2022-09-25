package com.example.music_meet.dto.Response;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Response_callUserComment {
    private int musicNum;
    private String imgSrc;
    private String createdAt;
    private String content;
    private String title;
    private String singer;
}
