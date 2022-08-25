package com.example.musicmeet_intelij

import android.content.Intent
import android.os.Bundle
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityLoginBinding
import retrofit2.http.Body
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
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

        bindingLogin.loginPageClosebox.setOnClickListener {
            finish()
        }

        /* val retrofit = Retrofit.Builder()
             .baseUrl("http://localhost:8080")
             .addConverterFactory(GsonConverterFactory.create())
             .build()

         val loginService: LoginService = retrofit.create(LoginService::class.java)

         bindingLogin.LoginOk.setOnClickListener {

             val idstr = id.text.toString()
             val pwstr = pw.text.toString()

             loginService.login(idstr, pwstr).enqueue(object : Callback<Body> {

                 override fun onFailure(call: retrofit2.Call<Body>, t : Throwable) {
                   // 실패할경우
                     *//*  Toast.makeText(this@Login_Activity, "로그인 실패\n다시 한번 확인해주세요.", Toast.LENGTH_SHORT).show()*//*
                }

                override fun onResponse(call: retrofit2.Call<Body>, response: Response<Body>) {
                    //정상 응답
                    *//*Toast.makeText(this@Login_Activity, "로그인 성공\n잠시만 기다려주세요.", Toast.LENGTH_SHORT).show()*//*
                }

            })
        }*/
        bindingLogin.LoginOk.setOnClickListener {
            val Music_Main_Intent = Intent(this, Music_Main_Activity::class.java)
            startActivity(Music_Main_Intent)

        }
    }
}

interface LoginService {

    @FormUrlEncoded
    @POST("user/login")
    fun login(
        @Field("id") id: String,
        @Field("pw") pw: String
    ): retrofit2.Call<Body>

}

data class Login(
    val code: String,
    val msg: String
)


