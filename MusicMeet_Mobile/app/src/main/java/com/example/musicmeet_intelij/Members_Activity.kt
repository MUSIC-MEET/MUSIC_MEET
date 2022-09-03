package com.example.musicmeet_intelij

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityMembersBinding
import okhttp3.ResponseBody
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

lateinit var bindingmembers: ActivityMembersBinding

class Members_Activity : AppCompatActivity() {

    lateinit var id: EditText
    lateinit var pw: EditText
    lateinit var email: EditText
    lateinit var nickname: EditText
    var userNum: Int = 0
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
            .baseUrl("http://192.168.219.110:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val memberservice = retrofit.create(memberService::class.java)

        bindingmembers.memberOk.setOnClickListener {

            var member_D = memberData()

            member_D.id = id.text.toString()
            member_D.pw = pw.text.toString()
            member_D.email = email.text.toString()
            member_D.nickname = nickname.text.toString()



            memberservice.memberOK(member_D).enqueue(object : Callback<ResponseBody> {
                override fun onResponse(call: retrofit2.Call<ResponseBody>, response: Response<ResponseBody>) {
                    val result = response.body()
                    Log.d("회원가입", "${result}")
                    Toast.makeText(this@Members_Activity, "회원가입 완료되었습니다.\n로그인 페이지로 이동합니다.", Toast.LENGTH_SHORT).show()
                    Login_Intent().apply { }
                }

                override fun onFailure(call: retrofit2.Call<ResponseBody>, t: Throwable) {
                    Log.d("회원가입", "${t.localizedMessage}")
                    /*Toast.makeText(this@Members_Activity, "회원가입에 실패하였습니다.\n다시한번 확인해주세요.", Toast.LENGTH_SHORT).show()*/
                    System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    /*  t.printStackTrace()*/
                    Log.d("안돼", t.localizedMessage)
                    System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                }
            })
        }
    }

    interface memberService {
        @POST("/createuser")
        @Headers(
            "Content-Type:application/json;charset=utf-8", "accept:application/json",
            "User-agent:Mozilla/5.0 (Android 7.0; Mobile; rv:54.0) Gecko/54.0 Firefox/54.0",
        )
        fun memberOK(
            @Body num: memberData
        ): retrofit2.Call<ResponseBody>
    }

    fun Login_Intent() {
        var Login_Intent = Intent(this, Login_Activity::class.java)
        startActivity(Login_Intent)
    }

}

class memberData {
    var id: String? = null
    var pw: String? = null
    var email: String? = null
    var nickname: String? = null
}




