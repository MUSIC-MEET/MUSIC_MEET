package com.example.musicmeet_intelij

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.example.musicmeet_intelij.databinding.ActivityMainBinding

lateinit var binding: ActivityMainBinding

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        var ColorCheck = false
        binding.membersbtn.setOnClickListener{
            if (!ColorCheck)
            {
                binding.membersbtn.isPressed = true
                binding.membersbtn.setTextColor(ContextCompat.getColor(applicationContext!!, R.color.Black))
                ColorCheck = false
            }
        }

        binding.loginbtn.setOnClickListener{
            val Login_Intent = Intent(this,Login_Activity::class.java)
            startActivity(Login_Intent)
        }

        //명시적 intent
        binding.membersbtn.setOnClickListener{
            val Members_Intent = Intent(this, Members_Activity::class.java)
            startActivity(Members_Intent)
        }
    }

}
