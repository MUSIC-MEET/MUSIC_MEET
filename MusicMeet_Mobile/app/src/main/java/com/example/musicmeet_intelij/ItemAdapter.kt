package com.example.musicmeet_intelij

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2


class ItemAdapter(private val images: MutableList<Int>, private val viewPager2: ViewPager2):
    RecyclerView.Adapter<ItemAdapter.ItemViewHolder>(){

    inner class ItemViewHolder(view: View): RecyclerView.ViewHolder(view){
        //초기화
        private val imageView = itemView.findViewById<ImageView>(R.id.slide_imageview)

        fun onBind(image:Int){
            imageView.setImageResource(image)
        }
    }

    //화면 설정
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemAdapter.ItemViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.slide_imageview, parent, false)
        return ItemViewHolder(view)
    }

    //데이터 설정
    override fun onBindViewHolder(holder: ItemAdapter.ItemViewHolder, position: Int) {
        holder.onBind(images[position])
        if (position == images.size - 1) {
            viewPager2.post(runnable)
        }
    }

    //갯수 가져오기
    override fun getItemCount(): Int = Int.MAX_VALUE

    private val runnable = Runnable {images.addAll(images)}

}