/*
* 클래스명  = 대문자 시작 ex) GuideClass
* 패키지명 = 무조건 소문자
* 함수, 변수 = 소문자 시작 + 카멜방식 ex)(guideFunc)
*
* 함수면 끝에 Func 붙이고
* 클래스면 Class 붙이기
*
* */



package com.example.music_meet;

import org.springframework.web.bind.annotation.*;

@RestController // 해당 클래스가 컨트롤러 역할을 수행한다는 어노테이션
@CrossOrigin(origins = "*") // CORS 보안정책 ="*"로 해두면 모든 ip에서 데이터 받기 가능
public class Guide {

    @RequestMapping(method = RequestMethod.GET, path="/GuideClass") // method -> 데이터를 주고 받는 방식 설정, path -> 해당 클래스가 동작할 url
    // @RequestBody -> 바디에 오는 정보를 받아주는 어노테이션
    // front에서 날라온 정보가 GuideClass 타입의 gc 변수에 저장됨, 데이터 타입이랑 변수는 변경 가능
    public GuideClass guideFunc(@RequestBody GuideClass gc)
    {
        System.out.println(gc.getId());
        System.out.println(gc.getPw());

        GuideClass gc2 = new GuideClass();
        gc2.setId(gc.getId() + "아 되나?");
        gc2.setPw(gc.getPw() + "아 되나?");

        return gc2;
    }
}

/*
* 클래스 만들때 front에서 날라오는 형식과 맞춰서 데이터타입, 변수명을 맞춰줘야 함
*
* ex)
* 프론트 측에서 아래와 같이 날라온다면
* {
    "id":"a6454564745",
    "pw":"123123"
  }
*
* 백에서는
* class GuideClass
{
    private String id;
    private String pw;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }
}
* 이런 식으로 맞춰줘야 된다.
*
* */
class GuideClass
{
    private String id;
    private String pw;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }
}
