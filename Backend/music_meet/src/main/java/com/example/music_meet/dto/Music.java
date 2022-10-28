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
    private Integer id;
    private String imgSrc;
    private String originTitle;
    private String user;
    private String title;
    private String singer;
    private String createdAt;
    private String lyrics;
    private String fileName;
    private Integer view;
    private Integer vote;
    private Integer genre;
    private Integer state;
}
