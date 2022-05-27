// 회원가입 컨트롤러

package com.example.music_meet.Controller;

import com.example.music_meet.Model.Account;
import com.example.music_meet.Service.AccountService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@CrossOrigin("*")
public class CreateAccount {


    @RequestMapping(method = RequestMethod.POST, path = "/createaccount")
    public String createAccountFunc(@RequestBody Account re)
    {
        AccountService as = new AccountService();
        as.createAccountFunc(re.getId(),re.getPw(),re.getEmail(), re.getAgree1(), re.getAgree2(), re.getAgree3(), re.getState());
        return "";
    }

    @RequestMapping(method = RequestMethod.POST, path = "/searchaccount")
    public Account searchAccountFunc(@RequestBody String re)
    {
        AccountService as = new AccountService();
        Account account = as.searchAccountFunc(re);
        System.out.println(account);
        return account;
        // ERROR 11564 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet] 에러가 뜬다면
        // 이 함수의 반환타입을 String 으로 바꾸고 return "";하면 에러가 사라짐

    }

}


