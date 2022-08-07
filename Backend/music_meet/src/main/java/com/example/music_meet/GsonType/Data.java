package com.example.music_meet.GsonType;

import lombok.ToString;

import java.util.ArrayList;

@ToString
public class Data {
    public String basedOnUpdate;
    public String createDateTime;
    public String description;
    public int id;
    public String imgList;
    public String likeYn;
    public String name;
    public String tasteMix;
    public int totalCount;
    public ArrayList<TrackList> trackList;
    public String type;
    public String updateDateTime;
}
