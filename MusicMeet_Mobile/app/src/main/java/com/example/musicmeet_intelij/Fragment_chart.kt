package com.example.musicmeet_intelij

import MusicListAdapter
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.musicmeet_intelij.databinding.FragmentChartBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class Fragment_chart : Fragment() {

    lateinit var title: TextView
    lateinit var singer: TextView
    lateinit var imgSrc: ImageView
    lateinit var rank: TextView

    private lateinit var fcontext:Context
    override fun onAttach(context: Context) {
        super.onAttach(context)
    fcontext = context

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        // Inflate the layout for this fragment
        val bindingfragmentchart = FragmentChartBinding.inflate(inflater, container, false)

        //어댑터 연결
         fun setAdapter(songList:ArrayList<melonimgurl>){
            val mAdapter = MusicListAdapter(songList, requireContext())
            bindingfragmentchart.ResyclerView.adapter = mAdapter
            bindingfragmentchart.ResyclerView.layoutManager = LinearLayoutManager(requireContext())
        }


        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.219.109:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val Melon = retrofit.create(melon::class.java)

        Melon.MelonLiveChart().enqueue(object : Callback<melonsonginfo> {

            override fun onResponse(call: Call<melonsonginfo>, response: Response<melonsonginfo>) {
                if (response.isSuccessful) {
                    val body = response.body()
                    body?.let {
                        //text_text.text = body.toString response 잘 받아왔는지 확인.
                        print(body)

                        setAdapter(it.songs)
                    }
                }
                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

            }
            override fun onFailure(call: Call<melonsonginfo>, t: Throwable) {
                Log.d("차트 서버 연결이 안돼버려", "${t.localizedMessage}")


            }
        })

        return bindingfragmentchart.root

    }
    //binding 에러뜨면 null 처리
    override fun onDestroyView() {

        super.onDestroyView()
    }

    override fun onResume() {
        super.onResume()

    }
}
