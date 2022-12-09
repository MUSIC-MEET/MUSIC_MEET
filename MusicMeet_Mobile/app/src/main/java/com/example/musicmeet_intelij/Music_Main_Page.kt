package com.example.musicmeet_intelij

import android.animation.ObjectAnimator
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.musicmeet_intelij.databinding.ActivityMusicMainBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

lateinit var bindingMusic_Main_Activity: ActivityMusicMainBinding

class Music_Main_Activity : AppCompatActivity() {

    private var isFabOpen = false

    lateinit var id:TextView
    lateinit var artist:TextView
    lateinit var title:TextView
    lateinit var imgSrc:ImageView
    private var backPressedTime : Long = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingMusic_Main_Activity = ActivityMusicMainBinding.inflate(layoutInflater)
        val view = bindingMusic_Main_Activity.root
        setContentView(view)

        fun setAdapter(songList: ArrayList<popularSong>, context: Context) {
            var mAdapter = PopularMusicChartAdapter(songList, this@Music_Main_Activity)
            var popularRecyclerView = findViewById<RecyclerView>(R.id.Popular_music_recyclerVIew)
            popularRecyclerView.adapter = mAdapter
            //업데이트 될 때마다 변경해줌
            mAdapter.notifyDataSetChanged()
        }



        bindingMusic_Main_Activity.fabMain.setOnClickListener {
            toggleFab()
        }

        bindingMusic_Main_Activity.Musicchart.setOnClickListener {
            MusicLiveChartActivityIntent()
        }
        bindingMusic_Main_Activity.myInfo.setOnClickListener{
            MyinfoIntent()
        }


        bindingMusic_Main_Activity.bulleanboard.setOnClickListener {
            Toast.makeText(this, "게시판보드", Toast.LENGTH_SHORT).show()
        }

        bindingMusic_Main_Activity.serchMusic.setOnClickListener {
            val findMusicIntent = Intent(this, FindMusicActivity::class.java)
            startActivity(findMusicIntent)
        }

        val retrofit = Retrofit.Builder()
            .baseUrl(Baseurl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val Popular_Music = retrofit.create(popularMusicAlbum::class.java)

       Popular_Music.popularMusicAlbumChart().enqueue(object : Callback<ArrayList<popularSong>>{
           override fun onResponse(call: Call<ArrayList<popularSong>>, response: Response<ArrayList<popularSong>>) {
            val result = response.body()
               print(result)
               if(response.isSuccessful){
                   result.let {
                       print("이유?" + result)

                   }
               }

           }

           override fun onFailure(call: Call<ArrayList<popularSong>>, t: Throwable) {
            Log.d("메인페이지 연결안됨",t.localizedMessage)
               print(t.stackTraceToString())
           }
       })

    }
    override fun onBackPressed() {
        Log.d("TAG", "뒤로가기")

        // 2초내 다시 클릭하면 앱 전체 종료
        if (System.currentTimeMillis() - backPressedTime < 2000) {
            ActivityCompat.finishAffinity(this);
            return
        }

        // 처음 클릭 메시지
        Toast.makeText(this, "'뒤로' 버튼을 한번 더 누르시면 앱이 종료됩니다.", Toast.LENGTH_SHORT).show()
        backPressedTime = System.currentTimeMillis()

    }


    /* bindingMusic_Main_Activity.viewpager.apply {
           adapter = ViewPagerAdapter(context as FragmentActivity)
       }

       //탭 레이아웃 연결
       LayoutTab().apply { }*/

    //뷰페이저 넘어가는 효과 및 페이지 정리
    /* private fun LayoutTab() {

         var tabIcon = listOf(
             R.drawable.main_page_home,
             R.drawable.main_page_wishlist,
             R.drawable.main_page_info
         )
         TabLayoutMediator(bindingMusic_Main_Activity.tabs, bindingMusic_Main_Activity.viewpager) { tab, position ->
             tab.setText("")
             tab.setIcon(tabIcon[position])
         }.attach()

     }*/

    //플로팅 액션 버튼 클릭시 동작하는 애니메이션 효과 세팅
    private fun toggleFab() {
        // 플로팅 액션 버튼 닫기 - 열려있는 플로팅 버튼 집어넣는 애니메이션 세팅
        if (isFabOpen) {
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.Musicchart, "translationY", 0f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.bulleanboard, "translationY", 0f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.myInfo, "translationX", 0f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.serchMusic, "translationX", 0f).apply { start() }
            bindingMusic_Main_Activity.fabMain.setImageResource(R.drawable.all_view)

            // 플로팅 액션 버튼 열기 - 닫혀있는 플로팅 버튼 꺼내는 애니메이션 세팅
        } else {
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.Musicchart, "translationY", -200f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.bulleanboard, "translationY", -400f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.myInfo, "translationX", -200f).apply { start() }
            ObjectAnimator.ofFloat(bindingMusic_Main_Activity.serchMusic, "translationX", -400f).apply { start() }
            bindingMusic_Main_Activity.fabMain.setImageResource(R.drawable.ic_baseline_close_24)
        }

        isFabOpen = !isFabOpen
    }

    //뮤직 라이브 차트 인텐트
    private fun MusicLiveChartActivityIntent() {
        val MusicLiveChartActivityIntent = Intent(this, MusicLiveChartActivity::class.java)
        startActivity(MusicLiveChartActivityIntent)
    }

    private fun MyinfoIntent(){
        val MyinfoIntent = Intent(this@Music_Main_Activity,MyinfoActivity::class.java)
        startActivity(MyinfoIntent)
    }

}

interface popularMusicAlbum{
    @GET("/music/popular/10")
    fun popularMusicAlbumChart(): Call<ArrayList<popularSong>>
}
data class popularSong(
    var title: String? = null,
    var artist: String? = null,
    var id: String? = null,
    var imgSrc: String? = null
)
