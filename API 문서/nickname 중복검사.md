# nickname 중복 검사
### API명 : `/search/nickname/{usernickname}`

### method : GET

### comment : 닉네임 중복검사

### request :
양식에 맞게 보내면 됨

### return
닉네임 사용 가능 : 200 (HttpStatus.OK)
                
닉네임 중복됨: 400 (HttpStatus.BAD_REQUEST)