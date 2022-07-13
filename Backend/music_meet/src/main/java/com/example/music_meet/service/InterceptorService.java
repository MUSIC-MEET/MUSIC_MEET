package com.example.music_meet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InterceptorService implements HandlerInterceptor
{
    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
        System.out.println("인터셉터 실행");
        final String jwt = request.getHeader("authorization");

        if (jwt == null) {
            //System.out.println("jwt == null");
            request.setAttribute("auth", false);
            return true;
        }
        else {
            try {
                jwtService.validateToken(jwt);
                request.setAttribute("auth", true);
                System.out.println("try문 실행");
            } catch (Exception e) {
                System.out.println("예외처리 발생");
                request.setAttribute("auth", false);
            }
        }
        return true;
    }



}
