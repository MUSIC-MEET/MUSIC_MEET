package com.example.musicmeet_intelij

import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityMusicLiveChartBinding

lateinit var bindingMusicLiveChartBinding: ActivityMusicLiveChartBinding

class MusicLiveChartActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        bindingMusicLiveChartBinding = ActivityMusicLiveChartBinding.inflate(layoutInflater)
        val view = bindingMusicLiveChartBinding.root
        setContentView(view)

        //스피너에 사용될 배열값 저장
        val SelectSpinner = resources.getStringArray(R.array.spinner_array)
        //스피너 어댑터 만들기
        val spinnerAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, SelectSpinner)

        bindingMusicLiveChartBinding.Spinner.adapter = spinnerAdapter
        bindingMusicLiveChartBinding.Spinner.setSelection(0)
        bindingMusicLiveChartBinding.Spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                when (position) {

                    0 ->   supportFragmentManager
                        .beginTransaction()
                        .replace(R.id.Music_View, Fragment_melonchart())
                        .commit()



                    1 -> {
                        supportFragmentManager
                            .beginTransaction()
                            .replace(bindingMusicLiveChartBinding.MusicView.id, geniefragment())
                            .commit()
                    }

                    else -> {
                        supportFragmentManager
                            .beginTransaction()
                            .replace(bindingMusicLiveChartBinding.MusicView.id, bugsfragment()).commit()
                    }
                }

            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                TODO("Not yet implemented")
            }
        }

    }

    private fun MelonFragment() {
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.Resycler_view, Fragment_melonchart())
            .commit()
    }

    private fun GenieFragment() {
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.Resycler_view, geniefragment())
            .commit()
    }



}