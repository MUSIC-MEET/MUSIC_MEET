package com.JPA.Entity;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor // 모든 멤버를 포함하는 생성자 생성
@NoArgsConstructor // 기본 생성자 생성
@ToString // toString() 사용 가능하게 하는 어노테이션
public class LoginEntity {
    @Id
    private int id;



}