package com.example.music_meet.util;

import com.example.music_meet.service.JwtService;
import com.example.music_meet.service.LoginService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Aspect
@Component
public class AspectConfig
{
    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtService jwtService;

    @Before("@annotation(com.example.music_meet.util.CustomAnnotationConfig.jwtCheck)")
    public void loginFunc() //(ProceedingJoinPoint proceedingJoinPoint) throws Throwable
    {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        final String authorization = request.getHeader("authorization");
        try
        {
            jwtService.validateToken(authorization); // 만료 , 변조 확인
        }
        catch (Exception e)
        {
            System.out.println("AspectConfig.validateToken(AOP)에서 예외처리 발생, JWT에 문제 있음");
        }
    }
}
