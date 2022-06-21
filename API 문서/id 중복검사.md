# ID 중복 검사
### API명 : `/search/id/{userid}`

### method : GET

### comment : 아이디 중복검사

### request :
~~~json
{
  "id" : "exid", // String  5~20자 
}
~~~

### return
아이디 사용 가능 : 200 (HttpStatus.OK)
                
아이디 중복됨: 400 (HttpStatus.BAD_REQUEST)