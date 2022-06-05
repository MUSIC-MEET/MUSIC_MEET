package com.example.music_meet.Service;

import com.JPA.Entity.Account;
import com.JPA.Repository.AccountRepository;
import org.springframework.stereotype.Repository;

@Repository //
public class LoginService
{

    private AccountRepository accountRepository;


    public String loginFunc(String id, String pw)
    {
        System.out.println("accountRepository.findById(id).orElse(null) 바로 앞");
        Account account = accountRepository.findById(id).orElse(null);
        System.out.println("accountRepository.findById(id).orElse(null) 바로 뒤");
        
        System.out.println(account);
        return "";
    }

}
