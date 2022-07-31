package com.example.music_meet.bot;

public class Song implements ISong{
    private String title;
    private String singer;
    private String imgSrc;
    private int rank;
    private int site;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSinger() {
        return singer;
    }

    public void setSinger(String singer) {
        this.singer = singer;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public void setSite(int site) { this.site = site;}

    public int getSite() {return this.site; }


    @Override
    public void print() {
        System.out.println("사이트 : " + this.site);
        System.out.println("순위 : " + this.rank);
        System.out.println("제목 : " + this.title);
        System.out.println("가수 : " +  this.singer);
        System.out.println("이미지 : " + this.imgSrc);
        System.out.println();
    }
}
