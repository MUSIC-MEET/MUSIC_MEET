package com.example.music_meet.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor // 모든 멤버를 포함하는 생성자 생성
@NoArgsConstructor // 기본 생성자 생성
@ToString // toString() 사용 가능하게 하는 어노테이션
public class Account
{
    @Id
    private String id;
    @Column
    private String pw;
    @Column
    private String email;
    @Column
    private String nickname;
    @Column
    private int state;
}
