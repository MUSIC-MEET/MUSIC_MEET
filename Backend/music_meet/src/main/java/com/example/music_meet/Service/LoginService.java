package com.example.music_meet.Service;

import com.JPA.Entity.Account;
import com.JPA.Repository.AccountRepository;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.stereotype.Repository;

@Repository
//@EnableWebSecurity // 웹 보안 활성화를 위한 어노테이션
public class LoginService //extends WebSecurityConfigurerAdapter
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

    /*@Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeRequests() // 요청에 의한 보안 검사 시작
                .anyRequest().authenticated() // 어떤 요청에도 보안 검사를 시작작                .and().formLogin();
                .and()
                .formLogin(); // 보안 검증은 forLogin 방식으로 하겠다.

    }*/


}
