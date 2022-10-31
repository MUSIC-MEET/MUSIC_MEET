package com.example.musicmeet_intelij

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide

class PopularMusicChartAdapter (val popularMusic:ArrayList<PMAlbum>, val context: Context)
    : RecyclerView.Adapter<PopularMusicChartAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return PopularMusicChartAdapter.ViewHolder(
            LayoutInflater.from(context)
                .inflate(R.layout.recycler_view_music_list, parent, false)
        )

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.songinfo(popularMusic[position], context)
    }

    override fun getItemCount(): Int {
        return popularMusic.size
    }


    class ViewHolder(itemView: View?) : RecyclerView.ViewHolder(itemView!!) {

        val title = itemView?.findViewById<TextView>(R.id.main_p_title)
        val id = itemView?.findViewById<TextView>(R.id.main_p_id)
        val artist = itemView?.findViewById<TextView>(R.id.main_p_artist)
        val imgSrc = itemView?.findViewById<ImageView>(R.id.main_p_imgSrc)

        //url 앨범표지 안나옴 찾아볼것
        fun songinfo(itemsonginfo: PMAlbum, context: Context) {

            title?.text = itemsonginfo.title
            id?.text = itemsonginfo.id
            artist?.text = itemsonginfo.artist
            if (imgSrc != null) {
                Glide.with(itemView)
                    .load(itemsonginfo.imgSrc) // 불러올 이미지 url
                    .into(imgSrc)// 이미지를 넣을 뷰
                /*.fallback(R.drawable.ic_closebox) // 로드할 url 이 비어있을(null 등) 경우 표시할 이미지*/

            }
        }
    }
}

