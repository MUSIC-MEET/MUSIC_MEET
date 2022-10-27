package com.example.music_meet.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.jboss.jandex.PrimitiveType;

import java.security.PrivateKey;

@Getter
@Setter
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Music {
    private Integer musicNum;
    private String imgSrc;
    private String originTitle;
    private String originSinger;
    private String title;
    private String singer;
    private String releasedate;
    private String lyrics;
    private String fileName;
    private Integer vote;
    private Integer genre;
    private Integer state;
}
