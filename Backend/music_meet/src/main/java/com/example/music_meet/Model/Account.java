package com.example.music_meet.Model;

public class Account {
    private String id;
    private String pw;
    private String email;
    private Boolean agree1;
    private Boolean agree2;
    private Boolean agree3;

    @Override
    public String toString() {
        return "Account{" +
                "id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                ", email='" + email + '\'' +
                ", agree1=" + agree1 +
                ", agree2=" + agree2 +
                ", agree3=" + agree3 +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getAgree1() {
        return agree1;
    }

    public void setAgree1(Boolean agree1) {
        this.agree1 = agree1;
    }

    public Boolean getAgree2() {
        return agree2;
    }

    public void setAgree2(Boolean agree2) {
        this.agree2 = agree2;
    }

    public Boolean getAgree3() {
        return agree3;
    }

    public void setAgree3(Boolean agree3) {
        this.agree3 = agree3;
    }
}
