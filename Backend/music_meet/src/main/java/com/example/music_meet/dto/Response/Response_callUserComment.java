package com.example.music_meet.dto.Response;

import lombok.*;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Response_callUserComment implements Comparator<String>{
    private int musicNum;
    private String imgSrc;
    private String createdAt;
    private String content;
    private String title;
    private String singer;


    @Override
    public int compare(String o1, String o2) {
        String name1 = o1;
        String name2 = o2;
        return name1.compareTo(name2);
    }
}
