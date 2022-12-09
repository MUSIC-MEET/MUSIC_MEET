package com.example.musicmeet_intelij

import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.musicmeet_intelij.databinding.ActivityMyinfoBinding
import com.google.gson.annotations.SerializedName
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

lateinit var bindingMyinfo: ActivityMyinfoBinding
private lateinit var id : String
private lateinit var nickname : String
private lateinit var email : String
private lateinit var image : String

class MyinfoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingMyinfo = ActivityMyinfoBinding.inflate(layoutInflater)
        val view = bindingMyinfo.root
        setContentView(view)

        id = findViewById<TextView>(R.id.info_id).text.toString()
        email = findViewById<TextView>(R.id.info_email).text.toString()
        image = findViewById<ImageView>(R.id.My_image).toString()
        nickname = findViewById<TextView>(R.id.info_nickname).text.toString()

        val retrofit = Retrofit.Builder()
            .baseUrl(Baseurl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val MyInfoService = retrofit.create(MyInfo::class.java)

        val LoginData = LoginInfo()

        //토큰 에러
        MyInfoService.loginMyInfo("token").enqueue(object :Callback<LoginInfo>{
            override fun onResponse(call: Call<LoginInfo>, response: Response<LoginInfo>) {

                val result = response.body()
                if (response.isSuccessful) {
                    result.let {
                        bindingMyinfo.infoId.setText(id)
                        bindingMyinfo.infoNickname.setText(nickname)
                        bindingMyinfo.infoEmail.setText(email)

                        if (image != null) {
                            Glide.with(this@MyinfoActivity)
                                .load(image) // 불러올 이미지 url
                                .into(bindingMyinfo.MyImage)// 이미지를 넣을 뷰
                        }
                    }
                }
            }

            override fun onFailure(call: Call<LoginInfo>, t: Throwable) {
                Log.d("MyinfoError", t.localizedMessage)
                println(t.localizedMessage)
                print(t.stackTrace)
                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                t.printStackTrace()
                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

            }
        })
    }
}

interface MyInfo {
    @GET("/user/myinfo")
    fun loginMyInfo(
        @Header("authorization : token")
        @Path("token") token: String
    ):Call<LoginInfo>
}

data class LoginInfo(
    @SerializedName("id") private var id: String? = null,
    @SerializedName("nickname") private var nickname: String? = null,
    @SerializedName("email") private var email: String? = null,
    @SerializedName("image") private var image: String? = null
)

/*
interface LoginService {

    @POST("/user/login")
    @Headers(
        "Content-Type:application/json;charset=utf-8", "accept:application/json",
        "User-agent:Mozilla/5.0 (Android 7.0; Mobile; rv:54.0) Gecko/54.0 Firefox/54.0",
    )
    fun login(
        @Body id: LoginData
    ): retrofit2.Call<LoginResponse>
}

data class LoginResponse(
    @SerializedName("token") val token: String,
    @SerializedName("nickname") val nickname: String
)
}
class LoginData {
    var id: String? = null
    var pw: String? = null
}*/
