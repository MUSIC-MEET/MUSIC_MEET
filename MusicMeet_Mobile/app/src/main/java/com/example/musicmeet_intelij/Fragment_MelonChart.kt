package com.example.musicmeet_intelij

import MelonListAdapter
import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class Fragment_melonchart : Fragment() {

  /*  lateinit var bindingfragmentmelonchart: FragmentMelonchartBinding*/

    private lateinit var fcontext:Context
    override fun onAttach(context: Context) {
        super.onAttach(context)
    fcontext = context as Activity

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
       /* bindingfragmentmelonchart = FragmentMelonchartBinding.inflate(inflater, container, false)*/
        val view = inflater!!.inflate(R.layout.fragment_melonchart, container, false)
        val recyclerView: RecyclerView = view.findViewById(R.id.Resycler_view)


        //어댑터 연결
        fun setAdapter(songList:ArrayList<songType>){
            val mAdapter =MelonListAdapter(songList, fcontext)
           recyclerView.adapter = mAdapter
            //업데이트 될 때마다 변경해줌
            mAdapter.notifyDataSetChanged()
        }


        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.219.106:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val Melon = retrofit.create(melon::class.java)

        Melon.MelonLiveChart().enqueue(object : Callback<melonSongs> {

            override fun onResponse(call: Call<melonSongs>, response: Response<melonSongs>) {
                print(response)
                if (response.isSuccessful) {
                    val body = response.body()
                    body?.let {
                        //body.toString() response 잘 받아왔는지 확인.
                        println("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
                        println(body)
                        println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        setAdapter(it.songs)
                    }
                }
            }
            override fun onFailure(call: Call<melonSongs>, t: Throwable) {
                Log.d("melon:", "${t.localizedMessage}")


            }
        })
        return view
    }

 /*   //binding 에러뜨면 null 처리
    override fun onDestroyView() {

        super.onDestroyView()
    }

    override fun onResume() {
        super.onResume()

    }*/
}
