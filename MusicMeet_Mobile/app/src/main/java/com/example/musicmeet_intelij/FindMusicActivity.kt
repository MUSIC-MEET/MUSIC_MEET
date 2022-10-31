package com.example.musicmeet_intelij

import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityFindMusicBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

private lateinit var bindingFindActivity: ActivityFindMusicBinding

class FindMusicActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingFindActivity = ActivityFindMusicBinding.inflate(layoutInflater)
        val view = bindingFindActivity.root
        setContentView(view)

        val str = findViewById<AutoCompleteTextView>(R.id.findautoTextView)
        var musics = Music()
        var musicArray = arrayOf(
            musics.musicNum.toString(),
            musics.imgSrc.toString(),
            musics.singer.toString(),
            musics.title.toString()
        )

        var musicAdapter = ArrayAdapter(this, R.layout.support_simple_spinner_dropdown_item, musicArray)

        val retrofit = Retrofit.Builder()
            .baseUrl(Baseurl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val autoMusicSerch = retrofit.create(autoCompleteTextView::class.java)

        autoMusicSerch.serch("아이유").enqueue(object : Callback<ArrayList<SerchMusic>> {


            override fun onResponse(call: Call<ArrayList<SerchMusic>>, response: Response<ArrayList<SerchMusic>>) {
                print(response)
                val body = response.body()
                if (response.isSuccessful) {
                    body?.let {
                        Log.d("자동검색", "성공?" + body.toString())
                        str.setAdapter(musicAdapter)
                        bindingFindActivity.s.setText("zz")
                        if (body.isNullOrEmpty())
                        {
                            Toast.makeText(this@FindMusicActivity, "검색결과 ㄴ", Toast.LENGTH_SHORT).show()
                        }
                        println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        //body.toString() response 잘 받아왔는지 확인.

                    }
                } else if(body == null){
                    Log.d("자동검색", "실패")
                }


            }

            override fun onFailure(call: Call<ArrayList<SerchMusic>>, t: Throwable) {
                Log.d("AutoCompleteTextView:", "${t.localizedMessage}")
                t.printStackTrace()

                print("--------------------------------------------")

            }
        })
    }
}