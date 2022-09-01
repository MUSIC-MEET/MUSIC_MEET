package com.example.musicmeet_intelij

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentActivity
import com.example.musicmeet_intelij.databinding.ActivityMusicMainBinding
import com.google.android.material.tabs.TabLayoutMediator

lateinit var bindingMusic_Main_Activity: ActivityMusicMainBinding

class Music_Main_Activity : AppCompatActivity() {

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
    }

    private fun LayoutTab() {

        var tabIcon = listOf(
            R.drawable.main_page_home,
            R.drawable.main_page_chart,
            R.drawable.main_page_wishlist,
            R.drawable.main_page_info
        )
        TabLayoutMediator(bindingMusic_Main_Activity.tabs, bindingMusic_Main_Activity.viewpager) { tab, position ->
            tab.setText("")
            tab.setIcon(tabIcon[position])
        }.attach()

    }
}