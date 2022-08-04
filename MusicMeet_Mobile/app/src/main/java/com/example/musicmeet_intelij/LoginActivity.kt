package com.example.musicmeet_intelij

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.musicmeet_intelij.databinding.ActivityLoginBinding

lateinit var bindingLogin : ActivityLoginBinding
class Login_Activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bindingLogin = ActivityLoginBinding.inflate(layoutInflater)
        val view = bindingLogin.root
        setContentView(view)

        bindingLogin.loginPageClosebox.setOnClickListener{
            finish()
        }
    }
}

