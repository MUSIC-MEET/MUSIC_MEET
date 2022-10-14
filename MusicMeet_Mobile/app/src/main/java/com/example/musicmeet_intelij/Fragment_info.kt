package com.example.musicmeet_intelij

import App
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.gson.annotations.SerializedName
import retrofit2.http.Body
import retrofit2.http.GET


class Fragment_info : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view: View = inflater.inflate(R.layout.fragment_info, container, false)


       /* var Textid: TextView = view.findViewById(R.id.info_id)
        var Textemail:TextView = view.findViewById(R.id.info_email)
        var imageup: ImageView = view.findViewById(R.id.My_image)

        var Myinfo_D = MyInfoData()

        Myinfo_D.id.toString()
        Myinfo_D.email.toString()
        Myinfo_D.nickname.toString()
        Myinfo_D.image.toString()

        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.219.108:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val MyInfoService = retrofit.create(MyInfoService::class.java)

        MyInfoService.Myinfo(Myinfo_D).enqueue(object : Callback<InfoResponse> {
            override fun onResponse(call: retrofit2.Call<InfoResponse>, response: Response<InfoResponse>) {

                Textid.setText(Myinfo_D.id)
                Textemail.setText(Myinfo_D.email)

                println(response.body()?.token)
                println(response.body()?.nickname)
                println(response.body()?.email)

            }

            override fun onFailure(call: retrofit2.Call<InfoResponse>, t: Throwable) {
              *//*  Log.d("정보 못가져옴", t.localizedMessage)*//*
                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                t.printStackTrace()
                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")


            }
        })*/
        return view
    }
}
var token  = App.prefs.token

interface MyInfoService {

    @GET("/user/myinfo")
    fun Myinfo(
        @Body Mypage: MyInfoData
    ): retrofit2.Call<InfoResponse>
}
data class InfoResponse(
    @SerializedName("token") val token: String,
    @SerializedName("nickname") val nickname: String,
    @SerializedName("email") val  email: String
)

class MyInfoData {
    var id: String? = null
    var email: String? = null
    var nickname: String? = null
    var image: String? = null
}
