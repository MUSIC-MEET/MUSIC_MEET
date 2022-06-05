package com.JPA.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor // 모든 멤버를 포함하는 생성자 생성
@NoArgsConstructor // 기본 생성자 생성
@Getter
@Setter
//@ToString // toString() 사용 가능하게 하는 어노테이션
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



    // 로그인 엔티티 대체 확인
    public Account(String id, String pw)
    {
        this.id = id;
        this.pw= pw;
        this.email = null;
        this.nickname = null;
    }
}
