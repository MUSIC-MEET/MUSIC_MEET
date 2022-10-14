package com.example.musicmeet_intelij

import android.animation.ObjectAnimator
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentActivity
import com.example.musicmeet_intelij.databinding.ActivityMusicMainBinding
import com.google.android.material.tabs.TabLayoutMediator

lateinit var bindingMusic_Main_Activity: ActivityMusicMainBinding

class Music_Main_Activity : AppCompatActivity() {

    private var isFabOpen = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingMusic_Main_Activity = ActivityMusicMainBinding.inflate(layoutInflater)
        val view = bindingMusic_Main_Activity.root
        setContentView(view)

        bindingMusic_Main_Activity.viewpager.apply {
            adapter = ViewPagerAdapter(context as FragmentActivity)
        }
        //탭 레이아웃 연결
        LayoutTab().apply { }

        bindingMusic_Main_Activity.fabMain.setOnClickListener {
            toggleFab()
        }

        bindingMusic_Main_Activity.Musicchart.setOnClickListener {
            MusicLiveChartActivityIntent()
        }

        bindingMusic_Main_Activity.bulleanboard.setOnClickListener {
            Toast.makeText(this, "게시판보드", Toast.LENGTH_SHORT).show()
        }
    }


    //플로팅 액션 버튼 클릭시 동작하는 애니메이션 효과 세팅
    private fun toggleFab() {
        // 플로팅 액션 버튼 닫기 - 열려있는 플로팅 버튼 집어넣는 애니메이션 세팅
        if (isFabOpen) {
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.Musicchart, "translationY", 0f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.bulleanboard, "translationY", 0f).apply { start() }
            bindingMusic_Main_Activity.fabMain.setImageResource(R.drawable.all_view)

            // 플로팅 액션 버튼 열기 - 닫혀있는 플로팅 버튼 꺼내는 애니메이션 세팅
        } else {
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.Musicchart, "translationY", -200f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.bulleanboard, "translationY", -400f).apply { start() }
            bindingMusic_Main_Activity.fabMain.setImageResource(R.drawable.ic_baseline_close_24)
        }

        isFabOpen = !isFabOpen
    }

    //뷰페이저 넘어가는 효과 및 페이지 정리
    private fun LayoutTab() {

        var tabIcon = listOf(
            R.drawable.main_page_home,
            R.drawable.main_page_wishlist,
            R.drawable.main_page_info
        )
        TabLayoutMediator(bindingMusic_Main_Activity.tabs, bindingMusic_Main_Activity.viewpager) { tab, position ->
            tab.setText("")
            tab.setIcon(tabIcon[position])
        }.attach()

    }

    //뮤직 라이브 차트 인텐트
    private fun MusicLiveChartActivityIntent() {
        val MusicLiveChartActivityIntent = Intent(this, MusicLiveChartActivity::class.java)
        startActivity(MusicLiveChartActivityIntent)
    }

}