package com.example.musicmeet_intelij

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter

class ViewPagerAdapter(fa: FragmentActivity) : FragmentStateAdapter(fa) {

    override fun getItemCount(): Int = 4

    override fun createFragment(position: Int): Fragment {
        return when (position) {
            0 -> Fragment_home()
            1 -> Fragment_chart()
            2 -> Fragment_wish()
            else -> Fragment_info()
        }
    }

}

