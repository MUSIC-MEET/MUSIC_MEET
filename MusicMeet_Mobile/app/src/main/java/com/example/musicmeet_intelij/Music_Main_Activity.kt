package com.example.musicmeet_intelij

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityMainBinding

//메인페이지 탭
private val Main_Page_TabIcon = listOf(
    R.drawable.main_page_home,
    R.drawable.main_page_chart,
    R.drawable.main_page_wishlist,
    R.drawable.main_page_home
)

class Music_Main_Activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

    }
}
