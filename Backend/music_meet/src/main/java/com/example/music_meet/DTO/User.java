package com.example.music_meet.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.regex.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    private String id;
    private String pw;
    private String email;
    private String nickname;

    private boolean isId()
    {
        if (this.id == null)
            return false;
        String str1 =  "^[a-zA-Z]{1}[a-zA-Z0-9]{4,19}$"; // 아이디 (5~20자)
        boolean res1 = Pattern.matches(str1, this.id);
        //System.out.println("res1가 " + res1 + "을 반환함");
        return res1;
    }

    private boolean isPw()
    {
        if (this.pw == null)
            return false;
        String str2 = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,16}$"; // 비밀번호(8~16자)
        boolean res2 = Pattern.matches(str2, this.pw);
        //System.out.println("res2가 " + res2 + "을 반환함");
        return res2;
    }

    private boolean isEmail()
    {
        if (this.email == null)
            return false;
        //String str3 = "\\w+@\\w+\\.\\w+(\\.\\w+)?"; // 이메일 (10~20자)
        String str3 = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"; // 이메일 (10~20자)
        boolean res3;
        if (10 <= this.email.length() && this.email.length() < 21)
        {
            res3 = Pattern.matches(str3, this.email);
        }
        else
            res3 = false;
        //System.out.println("res3가 " + res3 + "을 반환함");
        return res3;
    }

    private boolean isNickname()
    {
        if (this.nickname == null)      return false;

        String str4 = "^[a-zA-Z가-힣]{1}[a-zA-Z0-9가-힣]{1,9}$"; // 닉네임 검증식

        if (2 <= this.nickname.length() && this.nickname.length() < 11)
        {
            return Pattern.matches(str4, this.nickname);
        }
        else
            return false;
    }


    public String getErrorFunc()
    {
        if(!this.isId())     return "1";
        else if (!this.isPw())   return "2";
        else if (!this.isEmail())     return  "3";
        else   return "4";
    }

    public boolean isSignUpUserFunc()
    {
        return isId() && isPw() && isEmail() && isNickname();
    }

    public User(String id)
    {
        this.id = id;
    }




    @Override
    public String toString() {
        return "AccountForm{" +
                "id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }

    // toEntity() 주석처리
    /*public Account toEntity(String id, String pw, String email, String nickname)
    {
        return new Account(this.id, this.pw, this.email, this.nickname);
    }

    public Account toEntity(String id, String pw)
    {
        return new Account(id,pw);
    }*/
}
