package com.example.musicmeet_intelij

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView

class ItemAdapter(private val images: Array<Int>):
    RecyclerView.Adapter<ItemAdapter.ItemViewHolder>(){

    class ItemViewHolder(ItemView: View): RecyclerView.ViewHolder(ItemView){

        //초기화
        var ImageView = itemView.findViewById<ImageView>(R.id.imageview)
    }

    //화면 설정
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_layout, parent, false)

        return ItemViewHolder(view)
    }

    //데이터 설정
    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {

        holder.ImageView.setImageResource(images[position])
    }

    //갯수 가져오기
    override fun getItemCount(): Int {
        return images.size
    }
}