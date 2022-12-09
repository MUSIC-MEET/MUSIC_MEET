package com.example.musicmeet_intelij

import com.google.gson.annotations.SerializedName
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path
import java.net.URL

//멜론 차트100
interface melon{
    @GET("/livechart/melon/100")

    fun MelonLiveChart(): Call<melonSongs>
}
data class melonSongs (
    val updateTime : String,
    var songs: ArrayList<songType>
)

class songType(
    var title: String? = null,
    var singer: String? = null,
    var rank: String? = null,
    var imgSrc: String? = null
)

//지니 차트100
interface genie{
    @GET("/livechart/genie/100")

    fun geineLiveChart():
            Call<geniesonginfo>
}
data class geniesonginfo (
    var geniesongs: ArrayList<genieimgurl>
)

data class genieimgurl(
    var title: String? = null,
    var singer: String? = null,
    var rank: String? = null,
    var imgSrc: URL? =null
)

//벅스 차트100
interface bugs{
    @GET("/livechart/bugs/100")

    fun bugsLiveChart():
            Call<bugssonginfo>
}
data class bugssonginfo (
    var bugssongs: ArrayList<bugsimgurl>
)

class bugsimgurl(
    var title: String? = null,
    var singer: String? = null,
    var rank: String? = null,
    var imgSrc: URL? =null
)

interface autoCompleteTextView
{
@GET("/music/search/{keyword}")
    fun serch(@Path("keyword") keyword : String):
        Call<ArrayList<SerchMusic>>
}
data class SerchMusic(
    val musicInfo:ArrayList<Music>
)
data class Music(
    @SerializedName("musicNum")
    var musicNum : String? = null,
    @SerializedName("title")
    var title: String? = null,
    @SerializedName("singer")
    var singer:String? = null
)

val Baseurl = ("http://192.168.219.122:8080")