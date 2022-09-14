# 장르 게시판 글 호출_Small
### API명 : `/board/{genre}/{num}/small`

### method : GET

### comment : 게시글 수정할 때 기존의 장르 게시판 호출로 가져오면 조회수가 늘어나는 문제가 있음
###           그러므로 글 내용, 제목만 호출하는 API가 필요함

### request :
    null

### response :
~~~json
{
    "title" : "뉴진스가 누구임?",
    "content" : "뉴진스가 누구길래 차트 다 먹냐",
    "nickname" : "전국노예자랑"
}
~~~
### status code
가능 : 200 (HttpStatus.OK)

// 글이 없음
불가능 : 400 (HttpStatus.BAD_REQUEST)