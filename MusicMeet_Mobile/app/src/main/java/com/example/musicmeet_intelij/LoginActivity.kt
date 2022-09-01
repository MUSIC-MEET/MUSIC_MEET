package com.example.musicmeet_intelij

import android.os.Bundle
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityLoginBinding
import com.google.gson.annotations.SerializedName
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

lateinit var bindingLogin: ActivityLoginBinding

class Login_Activity : AppCompatActivity() {

    lateinit var id: EditText
    lateinit var pw: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingLogin = ActivityLoginBinding.inflate(layoutInflater)
        val view = bindingLogin.root
        setContentView(view)

        id = findViewById(R.id.loginText)
        pw = findViewById(R.id.pwText)

        //종료버튼
        bindingLogin.loginPageClosebox.setOnClickListener {
            finish()
        }

        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.107.2.251:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val LoginService = retrofit.create(LoginService::class.java)



        bindingLogin.LoginOk.setOnClickListener {

          /*  val Music_Main_Intent = Intent(this, Music_Main_Activity::class.java)
            startActivity(Music_Main_Intent)*/


            var login_D = LoginData()

            login_D.id = id.text.toString()
            login_D.pw = pw.text.toString()

            LoginService.login(login_D).enqueue(object : Callback<LoginResponse> {
                override fun onResponse(call: retrofit2.Call<LoginResponse>, response: Response<LoginResponse>) {
                    println(response.body()?.token)
                    println(response.body()?.nickname)

                }

                override fun onFailure(call: retrofit2.Call<LoginResponse>, t: Throwable) {
                    System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    t.printStackTrace()
                    System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")


                }
            })
        }
    }

    interface LoginService {

        @POST("/user/login")
        @Headers("Content-Type:application/json;charset=utf-8","accept:application/json"
        ,"User-agent:Mozilla/5.0 (Android 7.0; Mobile; rv:54.0) Gecko/54.0 Firefox/54.0",
        )
        fun login(
            @Body id: LoginData
        ): retrofit2.Call<LoginResponse>
}
    data class LoginResponse (
        @SerializedName("token") val token: String,
        @SerializedName("nickname") val nickname: String
    )
}


class LoginData
{
     var id : String?  = null
    var pw : String? = null

}