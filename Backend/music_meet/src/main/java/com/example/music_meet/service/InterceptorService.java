package com.example.music_meet.service;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InterceptorService implements HandlerInterceptor
{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
        System.out.println("인터셉터 실행");
        final String jwt = request.getHeader("authorization");
        /*if (!(jwt == null)) {
            response.getWriter().write("something");
            response.setStatus(401);

            return false;
        }*/

        return true;
    }



}
