package com.example.musicmeet_intelij

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment

//자동검색기능 어댑터
class Fragment_home : Fragment() {

    private lateinit var fcontext: Context
    override fun onAttach(context: Context) {
        super.onAttach(context)
        fcontext = context as Activity

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        //뮤직 findActivity 이동
        val findImage = view.findViewById<ImageView>(R.id.serchImage)
        val findAutoText = view.findViewById<TextView>(R.id.autoTextView)
        val findMusicActvityIntent = Intent(context, FindMusicActivity::class.java)

        findImage.setOnClickListener{
            startActivity(findMusicActvityIntent)
        }

        findAutoText.setOnClickListener{
            startActivity(findMusicActvityIntent)
        }

        return view
    }

}