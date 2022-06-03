// 회원가입 컨트롤러

package com.example.music_meet.Controller;

import com.example.music_meet.DTO.AccountForm;
import com.example.music_meet.validate.Validate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin("*")
public class CreateAccount {


    //
    // 회원가입
    //
    @RequestMapping(method = RequestMethod.POST, path = "/createaccount")
    public String createAccountFunc(@RequestBody AccountForm re)
    {
        String str = createAccountFunc(re);
        return str;
    }



    //
    // ID 조회
    //
    /*@RequestMapping("/path/{a}/{b}")
    String temp5(@PathVariable("a") String a, @PathVariable("b") int b){
        System.out.println(a);
        System.out.println(b);
        return "data";
    }*/
    @RequestMapping("/searchaccount/{userid}")
    public String searchAccountFunc(@PathVariable("userid") String re)
    {
        Validate validate = new Validate();

        if (!validate.isId(re))
        {
            //System.out.println("searchAccountFunc의 검증식 검사에서 오류");
            return "";
        }

        return "";
        // ERROR 11564 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet] 에러가 뜬다면
        // 이 함수의 반환타입을 String 으로 바꾸고 return "";하면 에러가 사라짐

    }


}


