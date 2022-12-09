package com.example.musicmeet_intelij

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.ViewHolder

//자동완성 검색기능 어댑터
class AutoCompleteAdapter(val MusicInfo:ArrayList<Music>, val context: Context )
    : RecyclerView.Adapter<AutoCompleteAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return AutoCompleteAdapter.ViewHolder(
            LayoutInflater.from(context)
                .inflate(R.layout.recycler_view_autocomplete_view, parent, false)
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.a_musicinfo(MusicInfo[position], context)
    }

    override fun getItemCount(): Int {
        return MusicInfo.size
    }

    class ViewHolder(itemView: View?) : RecyclerView.ViewHolder(itemView!!) {
        val a_title = itemView?.findViewById<TextView>(R.id.a_title)
        val a_singer = itemView?.findViewById<TextView>(R.id.a_singer)
        val a_musicNum = itemView?.findViewById<TextView>(R.id.a_musicNum)
        val a_imgSrcimage = itemView?.findViewById<ImageView>(R.id.a_imgSrcimage)

        fun a_musicinfo(itemMusicInfo: Music, context: Context) {
            a_title?.text = itemMusicInfo.title
            a_musicNum?.text = itemMusicInfo.musicNum
            a_singer?.text = itemMusicInfo.singer

          /*  if (a_imgSrcimage != null) {
                Glide.with(itemView)
                    .load(itemMusicInfo.imgSrc) // 불러올 이미지 url
                    .into(a_imgSrcimage)// 이미지를 넣을 뷰
                *//*.fallback(R.drawable.ic_closebox) // 로드할 url 이 비어있을(null 등) 경우 표시할 이미지*//*
            }*/
        }
    }
}

