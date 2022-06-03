package com.example.music_meet.Service;

import com.example.music_meet.Entity.Account;
import com.example.music_meet.Repository.AccountRepository;

public class LoginService
{

    private AccountRepository accountRepository;


    public String loginFunc(String id, String pw)
    {
        Account account = accountRepository.findById(id).orElse(null);

        return "";
    }

}
