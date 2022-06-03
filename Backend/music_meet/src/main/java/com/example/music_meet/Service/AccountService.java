package com.example.music_meet.Service;

import com.example.music_meet.DTO.AccountForm;
import com.example.music_meet.Entity.Account;
import com.example.music_meet.Repository.AccountRepository;
import com.example.music_meet.validate.Validate;

import java.util.Optional;


public class AccountService {

    private AccountRepository accountRepository;
    Validate validate = new Validate();



    //
    // 회원 추가
    //
    public String createAccountFunc(AccountForm re)
    {
        Optional<Account> checkid = accountRepository.findById(re.getId());

        System.out.println(checkid);

        if (validate.isValidDate(re.getId(), re.getPw(), re.getEmail()) && !checkid.equals(re.getId()))
        {
            // 1. DTO -> Entity로 변환
            Account account = re.toEntity();

            // 2. Repository에게 Entity를 DB 안에 저장하게 함
            Account accountsaved = accountRepository.save(account);

            return "회원가입이 성공적임";
        }
        else
            return "회원가입 실패";
    }




    //
    // ID 조회
    //
    public String searchAccountFunc(String ID)
    {

        return "";
    }



}


