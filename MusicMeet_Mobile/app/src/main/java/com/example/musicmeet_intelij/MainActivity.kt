package com.example.musicmeet_intelij

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.example.musicmeet_intelij.databinding.ActivityMainBinding

lateinit var binding: ActivityMainBinding
class MainActivity : AppCompatActivity() {



    //무한 슬라이드 핸들러 생성
    private val sliderImageHandler : Handler = Handler()
    private val sliderImageRunnable = Runnable { binding.viewpager2.currentItem = binding.viewpager2.currentItem + 1 }
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
        var backgroundImages: Array<Int> = arrayOf(
            R.drawable.back0, R.drawable.back1, R.drawable.back2,
            R.drawable.back3, R.drawable.back4, R.drawable.back5,
            R.drawable.back6, R.drawable.back7, R.drawable.back8,
            R.drawable.back9, R.drawable.back10, R.drawable.back11
        )

        //메인페이지 뷰페이저 연결
       val imageList = arrayListOf<Int>().apply{
           for (n in 0..12) {
               addAll(backgroundImages)

           }
       }
        binding.viewpager2.apply {
            adapter = ItemAdapter(imageList, binding.viewpager2)
            registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
                override fun onPageSelected(position: Int) {
                    super.onPageSelected(position)
                    sliderImageHandler.removeCallbacks(sliderImageRunnable)
                    sliderImageHandler.postDelayed(sliderImageRunnable, 3000)
                }
            })

            //페이지 넘길 때 커스터마이징
            setPageTransformer(ZoomOutPageTransformer())
        }
    }
    override fun onResume() {
        super.onResume()
        sliderImageHandler.postDelayed(sliderImageRunnable, 3000)
    }

    override fun onPause() {
        super.onPause()
        sliderImageHandler.removeCallbacks(sliderImageRunnable)
    }

}
