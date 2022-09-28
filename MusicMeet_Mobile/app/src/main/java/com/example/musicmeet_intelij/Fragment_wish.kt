package com.example.musicmeet_intelij

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.musicmeet_intelij.databinding.FragmentWishBinding

class Fragment_wish : Fragment() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val bindingfragmentwish = FragmentWishBinding.inflate(inflater, container, false)
        return bindingfragmentwish.root

    }
    //binding 에러뜨면 null 처리
    override fun onDestroyView() {

        super.onDestroyView()
    }

    override fun onResume() {
        super.onResume()

    }
}