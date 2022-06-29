package com.example.music_meet.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtConfig
{
    private final String securityKey = 202007055 + 202007058 + 201807054 + 201607082 + 201607083 + ""; // TODO 민감정보는 따로 분리하는 것이 좋다
    private final Long expiredTime = 1000 * 60L * 60L * 3L; // 유효시간 3시간 (밀리초 1000 = 1초 * 60 * 60  = 1시간 * 3 = 3시간)
    /**
     * user 정보를 담은 JWT 토큰을 생성한다.
     *
     * @param uesr Member 정보를 담은 객체
     * @return String JWT 토큰
     */
    public String generateJwtToken(String usernum) {
        Date now = new Date();
        return Jwts.builder()
                //.setSubject() // 보통 username
                .setHeader(createHeader())
                .claim("usernum", usernum)
                //.setClaims(createClaims(usernum)) // 클레임, 토큰에 포함될 정보
                .setExpiration(new Date(now.getTime() + expiredTime)) // 만료일
                .signWith(SignatureAlgorithm.HS256, securityKey)
                .compact();
    }

    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256"); // 해시 256 사용하여 암호화
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    /**
     * 클레임(Claim)을 생성한다.
     *
     * @param user 토큰을 생성하기 위한 계정 정보를 담은 객체
     * @return Map<String, Object> 클레임(Claim)
     */
    private Map<String, Object> createClaims(String usernum) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("usernum", usernum); // username
        return claims;
    }


}
