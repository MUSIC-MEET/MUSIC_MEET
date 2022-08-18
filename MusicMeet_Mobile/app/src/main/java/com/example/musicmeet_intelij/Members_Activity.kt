package com.example.musicmeet_intelij

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityMembersBinding
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

lateinit var bindingmembers: ActivityMembersBinding

class Members_Activity : AppCompatActivity() {

    lateinit var id: EditText
    lateinit var pw: EditText
    lateinit var email: EditText
    lateinit var nickname: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingmembers = ActivityMembersBinding.inflate(layoutInflater)
        val view = bindingmembers.root
        setContentView(view)

        id = findViewById(R.id.members_name)
        pw = findViewById(R.id.members_pw)
        email = findViewById(R.id.members_email)
        nickname = findViewById(R.id.members_nick)

        bindingmembers.memberPageClosebox.setOnClickListener {
            finish()
        }

        val retrofit = Retrofit.Builder()
            .baseUrl("http://localhost:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val memberservice = retrofit.create(memberService::class.java)

        bindingmembers.memberOk.setOnClickListener {

            val idstr = id.text.toString()
            val pwstr = pw.text.toString()
            val emailstr = email.text.toString()
            val nicknamestr = nickname.text.toString()

            memberservice.memberOK(idstr, pwstr, emailstr, nicknamestr).enqueue(object : Callback<Body> {
                override fun onResponse(call: retrofit2.Call<Body>, response: Response<Body>) {
                    val result = response.body()
                    Log.d("로그인","${result}")
                    /*Toast.makeText(this@Members_Activity, "회원가입 완료되었습니다.\n메인 페이지로 이동합니다.", Toast.LENGTH_SHORT).show()
                    Main_Intent().apply {  }*/

                }

                override fun onFailure(call: retrofit2.Call<Body>, t: Throwable) {
                    Log.d("로그인","${t.localizedMessage}")
                    /*Toast.makeText(this@Members_Activity,"회원가입에 실패하였습니다.\n다시한번 확인해주세요.",Toast.LENGTH_SHORT).show()*/
                }
            })
        }
    }

    interface memberService {
        @FormUrlEncoded
        @POST("http://localhost:8080/createuser/")
        fun memberOK(
            @Field("id") memberid: String,
            @Field("pw") memberpw: String,
            @Field("email") memberemail: String,
            @Field("nickname") membernick: String
        ): retrofit2.Call<Body>
    }
    fun Main_Intent(){
        var Main_Intent = Intent(this, MainActivity::class.java)
        startActivity(Main_Intent)
    }

}


