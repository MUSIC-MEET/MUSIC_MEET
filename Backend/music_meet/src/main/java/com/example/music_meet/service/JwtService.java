package com.example.music_meet.service;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@PropertySource("classpath:application.properties")
public class JwtService
{
    //@Value("${jwt.token.key}")
    private String jwtSecurityKey = "1009035332sinabro"; // jwt 키


    @Value("${jwt.token.key}")
    private String securityKey; // jwt 키

    private final Long expiredTime = 1000 * 60L * 60L * 3L; // 유효시간 3시간 (밀리초 1000 = 1초 * 60 * 60  = 1시간 * 3 = 3시간)

    //
    // 헤더 만드는부분
    //
    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256"); // 해시 256 사용하여 암호화
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    //
    // 토큰 생성
    //
    public String generateJwtToken(String userNum) {
        Date now = new Date();
        return Jwts.builder()
                //.setSubject() // 보통 username
                .setHeader(createHeader())
                .claim("userNum", userNum)
                //.setClaims(createClaims(usernum)) // 클레임, 토큰에 포함될 정보
                .setExpiration(new Date(now.getTime() + expiredTime)) // 만료일
                .signWith(SignatureAlgorithm.HS256, securityKey)
                .compact();
    }

    

    // 토큰 유효성 검사
    public void validateToken(String jwt) {
        try {
            Claims claims = Jwts.parser().setSigningKey(jwtSecurityKey).parseClaimsJws(jwt).getBody();
        } catch ( io.jsonwebtoken.SignatureException | MalformedJwtException e) {
            System.out.println("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            System.out.println("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            System.out.println("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            System.out.println("JWT 토큰이 잘못되었습니다.");
        }
    }

    //
    //  JWT에서 정보를 얻어내는 함수
    //
    public Map<String,String> getClaimsFromJwt(String jwt) {
        Map<String, String> map = new HashMap<>();

        if (jwt == null) {
            System.out.println("JwtService -> getClaimsFromJwt()에서 토큰 == null");
            System.out.println("토큰이 null임");
            return map;
        }
        try {
            //String userNum = claims.getBody().get("userNum", String.class);
            Claims claims = Jwts.parser().setSigningKey(jwtSecurityKey).parseClaimsJws(jwt).getBody();
            String userNum = claims.get("userNum",String.class);
            map.put("userNum", userNum);
            return map;
        } catch (Exception err) {
            err.printStackTrace();
            System.out.println("JwtService -> getClaimsFromJwt()에서 예외처리로 빠짐");
            return map;

        }
    }


}
