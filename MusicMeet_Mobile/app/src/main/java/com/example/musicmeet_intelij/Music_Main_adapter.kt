package com.example.musicmeet_intelij

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter

class ViewPagerAdapter(fragmentActivity: FragmentActivity) : FragmentStateAdapter(fragmentActivity) {

    private val NUM_PAGES = 4

    override fun getItemCount(): Int = NUM_PAGES

    //여기서 페이지를 보여줌
    override fun createFragment(position: Int): Fragment {
        return when (position) {
            0 -> {
                Fragment_home().apply {  }
            }

            1 -> {
                Fragment_chart().apply {  }
            }

            2 -> {
                Fragment_wish().apply {  }
            }

            else -> {
                Fragment_info().apply {  }
            }
        }

    }
}
