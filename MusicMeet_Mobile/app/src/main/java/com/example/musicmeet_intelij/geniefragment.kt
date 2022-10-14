package com.example.musicmeet_intelij

import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.musicmeet_intelij.databinding.FragmentGeniefragmentBinding
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class geniefragment : Fragment() {

    lateinit var bindingfragmentgeniechart: FragmentGeniefragmentBinding

    private lateinit var fcontext: Context
    override fun onAttach(context: Context) {
        super.onAttach(context)
        fcontext = context as Activity

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater!!.inflate(R.layout.fragment_bugsfragment, container, false)
       /* val recyclerView: RecyclerView = view.findViewById(R.id.Resycler_view_genie)

        //어댑터 연결
        fun setAdapter(songList: ArrayList<songTypeGenie>) {
            val mAdapter = GenieListAdapter(songList, fcontext)
            recyclerView.adapter = mAdapter
            recyclerView.layoutManager = LinearLayoutManager(fcontext)
        }*/


        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.219.106:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val genie = retrofit.create(genie::class.java)

       /* genie.geineLiveChart().enqueue(object : Callback<genieSongs> {

            override fun onResponse(call: Call<genieSongs>, response: Response<genieSongs>) {
                if (response.isSuccessful) {
                    val body = response.body()
                    body?.let {
                        //text_text.text = body.toString response 잘 받아왔는지 확인.
                        print(body)

                        *//*setAdapter(it.geniesongs)*//*
                    }
                }
                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

            }

            override fun onFailure(call: Call<genieSongs>, t: Throwable) {
                Log.d("genie", "${t.localizedMessage}")


            }
        })
*/

        /* return inflater.inflate(R.layout.fragment_geniefragment, container, false)*/
        return view
    }
}
