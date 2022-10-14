package com.example.musicmeet_intelij

import BugsListAdapter
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


class bugsfragment : Fragment() {

/*
    lateinit var bindingfragmentbugschart: FragmentBugsfragmentBinding
*/

    private lateinit var fcontext: Context
    override fun onAttach(context: Context) {
        super.onAttach(context)
        fcontext = context

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val recyclerView: RecyclerView = view!!.findViewById(R.id.Resycler_view)
        val view = inflater!!.inflate(R.layout.fragment_bugsfragment, container, false)


        //어댑터 연결
        fun setAdapter(songList: ArrayList<bugsimgurl>) {
            val mAdapter = BugsListAdapter(songList, fcontext)
            recyclerView.adapter = mAdapter
            mAdapter.notifyDataSetChanged()
        }


        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.219.106/:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val bugs = retrofit.create(bugs::class.java)

        bugs.bugsLiveChart().enqueue(object : Callback<bugssonginfo> {

            override fun onResponse(call: Call<bugssonginfo>, response: Response<bugssonginfo>) {
                if (response.isSuccessful) {
                    val body = response.body()
                    body?.let {
                        //text_text.text = body.toString response 잘 받아왔는지 확인.
                        print(body)

                        setAdapter(it.bugssongs)
                    }
                }
                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

                System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

            }

            override fun onFailure(call: Call<bugssonginfo>, t: Throwable) {
                Log.d("bugs", "${t.localizedMessage}")


            }
        })

        /* return inflater.inflate(R.layout.fragment_bugsfragment, container, false)*/
        return view
    }

    //binding 에러뜨면 null 처리
    override fun onDestroyView() {

        super.onDestroyView()
    }

    override fun onResume() {
        super.onResume()

    }
}
