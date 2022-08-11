package com.example.musicmeet_intelij

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.viewpager.widget.ViewPager
import com.example.musicmeet_intelij.databinding.ActivityMainBinding
import kotlin.jvm.internal.Intrinsics.Kotlin

lateinit var binding: ActivityMainBinding

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        //로그인 화면 이동
        binding.loginbtn.setOnClickListener {
            val Login_Intent = Intent(this, Login_Activity::class.java)
            startActivity(Login_Intent)
        }
        //회원가입 화면 이동
        binding.membersbtn.setOnClickListener {
            val Members_Intent = Intent(this, Members_Activity::class.java)
            startActivity(Members_Intent)
        }

        //배경에 나올 이미지
        var BackgroundImage: Array<Int> = arrayOf(
            R.drawable.back0, R.drawable.back1, R.drawable.back2,
            R.drawable.back3, R.drawable.back4, R.drawable.back5,
            R.drawable.back6, R.drawable.back7, R.drawable.back8,
            R.drawable.back9, R.drawable.back10, R.drawable.back11
        )

        var ItemAdapter = ItemAdapter(BackgroundImage)

        binding.viewpager2.apply {
            adapter = ItemAdapter
            setPageTransformer(ZoomOutPageTransformer())
        }

    }
}
