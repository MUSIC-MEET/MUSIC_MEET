package com.example.music_meet.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtConfig
{


    /**
     * 클레임(Claim)을 생성한다.
     *
     * @param usernum 토큰을 생성하기 위한 String 타입의 사용자 번호
     * @return Map<String, Object> 타입의 클레임(Claim)을 리턴
     */
    private Map<String, Object> createClaims(String usernum) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("userNum", usernum); // username
        return claims;
    }


}
