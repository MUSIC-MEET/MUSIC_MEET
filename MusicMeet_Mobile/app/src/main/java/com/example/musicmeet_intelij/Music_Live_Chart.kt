package com.example.musicmeet_intelij

import retrofit2.Call
import retrofit2.http.GET
import java.net.URL

//멜론 차트100
interface melon{
    @GET("/livechart/melon/100")

    fun MelonLiveChart():
            Call<melonsonginfo>
}
data class melonsonginfo (
    var songs: ArrayList<melonimgurl>
)

data class melonimgurl(
    var title: String? = null,
    var singer: String? = null,
    var rank: String? = null,
    var imgSrc: URL? =null
)

//지니 차트100
interface genie{
    @GET("/livechart/genie/100")

    fun geineLiveChart():
            Call<geniesonginfo>
}
data class geniesonginfo (
    var songs: ArrayList<geineimgurl>
)

data class geineimgurl(
    var title: String? = null,
    var singer: String? = null,
    var rank: String? = null,
    var imgSrc: URL? =null
)

//벅스 차트100
interface bugs{
    @GET("/livechart/bugs/100")

    fun bugsLiveChart():
            Call<geniesonginfo>
}
data class bugssonginfo (
    var songs: ArrayList<bugsimgurl>
)

data class bugsimgurl(
    var title: String? = null,
    var singer: String? = null,
    var rank: String? = null,
    var imgSrc: URL? =null
)