package com.example.music_meet.GsonType;

import lombok.ToString;

@ToString
public class TrackList {
    public int id;
    public String name;
    public String updateDateTime;
    public RepresentationArtist representationArtist;
    public Album album;
}
