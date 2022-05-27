package com.example.music_meet.validate;

import java.util.regex.Pattern;

public class Validate {
    public boolean isId(String ID)
    {
        if (ID == null)
            return false;
        String str1 =  "^[a-zA-Z]{1}[a-zA-Z0-9]{4,19}$"; // 아이디 (5~20자)
        boolean res1 = Pattern.matches(str1, ID);
        //System.out.println("res1가 " + res1 + "을 반환함");
        return res1;
    }

    public boolean isPw(String PW)
    {
        if (PW == null)
            return false;
        String str2 = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,16}$"; // 비밀번호(8~16자)
        boolean res2 = Pattern.matches(str2, PW);
        //System.out.println("res2가 " + res2 + "을 반환함");
        return res2;
    }

    public boolean isEmail(String EMAIL)
    {
        if (EMAIL == null)
            return false;
        String str3 = "\\w+@\\w+\\.\\w+(\\.\\w+)?"; // 이메일 (10~20자)
        boolean res3;
        if (10 <= EMAIL.length() && EMAIL.length() < 21)
        {
            res3 = Pattern.matches(str3, EMAIL);
        }
        else
            res3 = false;
        //System.out.println("res3가 " + res3 + "을 반환함");
        return res3;
    }

    public boolean isValidDate(String ID,String PW,String EMAIL)
    {
        return isId(ID) && isPw(PW) && isEmail(EMAIL);
    }
}
