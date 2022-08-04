package com.example.musicmeet_intelij

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityMembersBinding

lateinit var bindingmembers: ActivityMembersBinding
class Members_Activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingmembers = ActivityMembersBinding.inflate(layoutInflater)
        val view = bindingmembers.root
        setContentView(view)



        bindingmembers.memberPageClosebox.setOnClickListener {
            finish()
        }
    }
}