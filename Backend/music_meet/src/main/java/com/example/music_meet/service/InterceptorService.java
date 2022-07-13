package com.example.music_meet.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Getter
@Setter
@NoArgsConstructor
@Service
public class InterceptorService implements HandlerInterceptor
{
    //@Autowired
    private JwtService jwtService = new JwtService();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
        final String jwt = request.getHeader("authorization");
        if (jwt == null) {
            request.setAttribute("userNum", null);
        }
        else {
            try {
                jwtService.validateToken(jwt);
                request.setAttribute("userNum", (jwtService.getClaimsFromJwt(jwt)).get("userNum"));
            } catch (Exception e) {
                System.out.println("InterceptorService.preHandle에서 예외처리 발생");
                //e.printStackTrace();
                request.setAttribute("userNum", null);
            }
        }
        return true;
    }


}
