package com.example.musicmeet_intelij

import retrofit2.Call
import retrofit2.http.GET
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

data class bugsimgurl(
    var title: String? = null,
    var singer: String? = null,
    var rank: String? = null,
    var imgSrc: URL? =null
)