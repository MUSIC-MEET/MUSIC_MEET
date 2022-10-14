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

        id = findViewById(R.id.members_id)
        pw = findViewById(R.id.members_pw)



        //나가기 버튼 X박스
        xBox_Image()


        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.219.109:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val memberservice = retrofit.create(memberService::class.java)

        var member_D = memberData()

       /* id_check(member_D.id)
        email_check(member_D.email)
        nickname_check(member_D.nickname)*/

        fun checked_info(){
            if((id.length() == 0) || (pw.length() == 0) || (nickname.length()) == 0 || (email.length() == 0))
            {
                Toast.makeText(this, "입력되지 않은 공간이 있습니다\n확인해주세요",Toast.LENGTH_SHORT).show();
            }

        }

        bindingmembers.memberOk.setOnClickListener {

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
                    Toast.makeText(this@Members_Activity, "회원가입 에러\n다시 시도해주세요.", Toast.LENGTH_SHORT).show()


                }
            })
        }
    }

    //회원가입 버튼 서버연결 인터페이스
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

/*    interface info_check {
        @GET("/search/email/email")

        fun email_check() {
            *//*  var email = .text.toString().trim() //공백제거*//*
            val emailValidation = Regex("^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")//10~20자

        }

    }*/

    fun Login_Intent() {
        var Login_Intent = Intent(this, Login_Activity::class.java)
        startActivity(Login_Intent)
    }

    fun xBox_Image(){
        bindingmembers.memberPageClosebox.setOnClickListener {
            finish()
        }
    }


    //아이디 유효성 검사
    fun id_check(id: String?): Boolean {

        bindingmembers.membersId.setOnClickListener {

        }
        val trmmedId = id?.trim().toString()
        val id_ck = Regex("^[a-zA-Z]{1}[a-zA-Z0-9]{4,19}$")//5~20자
        return !trmmedId.isNullOrEmpty() && id_ck.matches(trmmedId)
    }

    //비밀번호 유효성 검사


    //이메일 유효성 검사
    fun email_check(email: String?): Boolean {

        bindingmembers.membersEmail.setOnClickListener {

        }
        val trmmedEmail = email?.trim().toString()
        val email_ck = Regex("^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")//10~20자
        return !trmmedEmail.isNullOrEmpty() && email_ck.matches(trmmedEmail)
    }


        //닉네임 유효성 검사
        fun nickname_check(nickname: String?): Boolean {

            bindingmembers.membersEmail.setOnClickListener {

            }
            val trimmedNickname = nickname?.trim().toString()
            val exp = Regex("^[a-zA-Z가-힣]{1}[a-zA-Z0-9가-힣]{3,16}$")//2자 이상 16자 이하
            return !trimmedNickname.isNullOrEmpty() && exp.matches(trimmedNickname)
        }
}


class memberData {
    var id: String? = null
    var pw: String? = null
    var email: String? = null
    var nickname: String? = null
}



