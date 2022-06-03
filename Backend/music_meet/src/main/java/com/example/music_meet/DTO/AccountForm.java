package com.example.music_meet.DTO;

import com.example.music_meet.Entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
@Setter
public class AccountForm {
    private String id;
    private String pw;
    private String email;
    private String nickname;
    private Boolean agree1;
    private Boolean agree2;
    private Boolean agree3;
    private int state; // 계정상태 (탈퇴, 활동 등등)


    public Account toEntity()
    {
        return new Account(id,pw,email,nickname,state);
    }
}
