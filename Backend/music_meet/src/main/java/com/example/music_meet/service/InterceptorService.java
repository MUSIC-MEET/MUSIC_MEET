package com.example.music_meet.service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;


@Getter
@Setter
@NoArgsConstructor
@Service
public class InterceptorService implements HandlerInterceptor
{
    @Value("${spring.datasource.url}")
    private String mysqlurl;
    @Value("${spring.datasource.username}")
    private String mysqlid;
    @Value("${spring.datasource.password}")
    private String mysqlpassword;
    @Value("${spring.datasource.driver-class-name}")
    private String classForName;

    private Connection conn = null;
    private PreparedStatement pstmt = null;
    private ResultSet rs = null;
    private int rsInt = 0;
    private String sql;

    //@Autowired
    private JwtService jwtService = new JwtService();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
        final String jwt = request.getHeader("authorization");

        if (jwt == null)
        {
            request.setAttribute("userNum", null);
        }
        else {
            final String userNum = jwtService.getClaimsFromJwt(jwt).get("userNum");
            try {
                jwtService.validateToken(jwt);

                sql = "select id, state from user where usernum = ?";
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/music_meet?serverTimezone=Asia/Seoul&characterEncoding=UTF-8", "root", "0000");
                pstmt = conn.prepareStatement(sql);

                pstmt.setInt(1,Integer.parseInt(userNum));
                rs = pstmt.executeQuery();
                if (rs.next())
                {
                    if (rs.getString(1) != null && rs.getInt(2) == 0)
                    {
                        request.setAttribute("userNum", userNum);
                    }
                    else
                    {
                        request.setAttribute("userNum", null);
                    }
                }
                else
                {
                    request.setAttribute("userNum", null);
                }
                rs.close();
                pstmt.close();
                conn.close();


            } catch (Exception e) {
                System.out.println("InterceptorService.preHandle에서 예외처리 발생");
                //e.printStackTrace();
                request.setAttribute("userNum", null);
            }
        }
        return true;
    }


}
