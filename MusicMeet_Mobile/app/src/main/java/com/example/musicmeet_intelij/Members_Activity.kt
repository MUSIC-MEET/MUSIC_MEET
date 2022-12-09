package com.example.musicmeet_intelij

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import com.example.musicmeet_intelij.databinding.ActivityMembersBinding
import okhttp3.ResponseBody
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST
import java.util.regex.Pattern

lateinit var bindingmembers: ActivityMembersBinding

class members_Activity : AppCompatActivity() {

    lateinit var id: EditText
    lateinit var pw: EditText
    lateinit var email: EditText
    lateinit var nickname: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingmembers = ActivityMembersBinding.inflate(layoutInflater)
        val view = bindingmembers.root
        setContentView(view)

        id = findViewById(R.id.members_id)
        pw = findViewById(R.id.members_pw)
        email = findViewById(R.id.members_email)
        nickname = findViewById(R.id.members_nick)


        //나가기 버튼 X박스
        xBox_Image()


        val retrofit = Retrofit.Builder()
            .baseUrl(Baseurl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val memberservice = retrofit.create(memberService::class.java)

        var member_D = memberService.memberData()

        member_D.id = id.text.toString()
        member_D.pw = pw.text.toString()
        member_D.email = email.text.toString()
        member_D.nickname = nickname.text.toString()

        memberservice.memberOK(member_D).enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: retrofit2.Call<ResponseBody>, response: Response<ResponseBody>) {
                val result = response.body()
                Log.d("회원가입", "${result}")

                result.let {

                    ButtonCheck()
                }

                // addTextChangedListener의 경우 익명클래스이니 필수 함수들을 import 해줘야 함
                bindingmembers.membersEmail.addTextChangedListener(object : TextWatcher {
                    override fun afterTextChanged(s: Editable?) {
                        // text가 변경된 후 호출
                        // s에는 변경 후의 문자열이 담겨 있다.
                    }

                    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                        // text가 변경되기 전 호출
                        // s에는 변경 전 문자열이 담겨 있다.
                    }

                    override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                        // text가 바뀔 때마다 호출된다.
                        checkEmail()


                    }
                })

                bindingmembers.membersPw.addTextChangedListener(object :TextWatcher{
                    override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                        Checkpww()
                    }

                    override fun afterTextChanged(s: Editable?) {
                        // text가 변경된 후 호출
                        // s에는 변경 후의 문자열이 담겨 있다.
                    }

                    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                        // text가 변경되기 전 호출
                        // s에는 변경 전 문자열이 담겨 있다.
                    }
                })

                bindingmembers.memberOk.setOnClickListener {
                    Toast.makeText(this@members_Activity, "회원가입 완료되었습니다.\n로그인 페이지로 이동합니다.", Toast.LENGTH_SHORT).show()
                    Login_Intent().apply { }
                }
            }

            override fun onFailure(call: retrofit2.Call<ResponseBody>, t: Throwable) {
                Log.d("회원가입", "${t.localizedMessage}")
                Toast.makeText(this@members_Activity, "회원가입 에러\n다시 시도해주세요.", Toast.LENGTH_SHORT).show()


            }
        })
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

        class memberData {
            var id: String? = null
            var pw: String? = null
            var email: String? = null
            var nickname: String? = null
        }

        class response_details(
            val code: Int? = null,
            val msg: Int? = null
        )
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

    fun xBox_Image() {
        bindingmembers.memberPageClosebox.setOnClickListener {
            finish()
        }
    }


    //버튼 유효성기능
    private fun ButtonCheck() {
        val Button = false
        if (bindingmembers.idCheckOk.isVisible || bindingmembers.emailCheckOk.isVisible
            || bindingmembers.pwwCheckOk.isVisible || bindingmembers.nicknameCheckOk.isVisible
        ) {
            bindingmembers.memberOk.visibility = View.VISIBLE
        }
    }

    fun checkEmail(): Boolean {
        var emailValidation = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$" //정규식
        var email = bindingmembers.membersEmail.text.toString().trim() //공백제거
        val p = Pattern.matches(emailValidation, email) // 서로 패턴이 맞닝?
        if (p) {
            //이메일 형태가 정상일 경우
            bindingmembers.emailCheckOk.visibility = View.VISIBLE
            bindingmembers.emailCheckNo.visibility = View.GONE
            return true
        } else {
            bindingmembers.emailCheckOk.visibility = View.GONE
            bindingmembers.emailCheckNo.visibility = View.VISIBLE
            //또는 questionEmail.setTextColor(R.color.red.toInt())
            return false
        }
    }
}

fun checkId(): Boolean {
    var idValidation = "^[a-zA-Z]{1}[a-zA-Z0-9]{4,19}$"//5~20자
    var id = bindingmembers.membersId.text.toString().trim() //공백제거
    val p = Pattern.matches(idValidation, id) // 서로 패턴이 맞닝?
    if (p) {
        //형태가 정상일 경우
        bindingmembers.idCheckOk.visibility = View.VISIBLE
        bindingmembers.idCheckNo.visibility = View.GONE
        return true
    } else {
        bindingmembers.idCheckOk.visibility = View.GONE
        bindingmembers.idCheckNo.visibility = View.VISIBLE
        //또는 questionEmail.setTextColor(R.color.red.toInt())
        return false
    }
}


private fun Checkpww() {
    var checkpw = bindingmembers.membersPw.text.toString().trim()
    var checkpww = bindingmembers.membersPwOk.text.toString().trim()

    if (checkpw.equals(checkpww)) {

        bindingmembers.pwwCheckOk.visibility = View.INVISIBLE
        bindingmembers.pwwCheckNo.visibility = View.GONE
    }
    else
    {
        bindingmembers.pwwCheckOk.visibility = View.GONE
        bindingmembers.pwwCheckNo.visibility = View.VISIBLE
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

//닉네임 유효성 검사
fun nickname_check(nickname: String?): Boolean {

    bindingmembers.membersEmail.setOnClickListener {

    }
    val trimmedNickname = nickname?.trim().toString()
    val exp = Regex("^[a-zA-Z가-힣]{1}[a-zA-Z0-9가-힣]{3,16}$")//2자 이상 16자 이하
    return !trimmedNickname.isNullOrEmpty() && exp.matches(trimmedNickname)
}
