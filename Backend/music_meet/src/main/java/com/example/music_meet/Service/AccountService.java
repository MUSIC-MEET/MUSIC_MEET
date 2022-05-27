package com.example.music_meet.Service;

//import java.sql.DriverManager;
import java.sql.*;
import com.example.music_meet.Model.Account;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class AccountService {
    String mysqlurl = "jdbc:mysql://localhost:3306/music_meet?serverTimezone=UTC&characterEncoding=UTF-8";
    String mysqlid = "root";
    String mysqlpassword = "0000";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    int rsInt = 0;


    //
    // 회원 추가
    //
    public String createAccountFunc(String ID, String PW, String EMAIL, boolean AGREE1, boolean AGREE2, boolean AGREE3, int STATE) {
        String sql = "insert into account values(?,?,?,?,?,?,?)";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, ID);
            pstmt.setString(2, PW);
            pstmt.setString(3, EMAIL);
            pstmt.setBoolean(4, AGREE1);
            pstmt.setBoolean(5, AGREE2);
            pstmt.setBoolean(6, AGREE3);
            pstmt.setInt(7, STATE);

            rsInt = pstmt.executeUpdate();

            System.out.println(rsInt);
        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (pstmt != null && conn != null)
                    pstmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return "";
    }


    //
    // ID 조회
    //
    public Account searchAccountFunc(String ID) {
        String sql = "select * from account where id=" + ID;
        String id = null;
        String pw = null;
        String email = null;
        boolean ag1 = false;
        boolean ag2 = false;
        boolean ag3 = false;
        int state = 0;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            rs = pstmt.executeQuery();

            while (rs.next()) {
                id = rs.getString(1);
                pw = rs.getString(2);
                email = rs.getString(3);
                ag1 = rs.getBoolean(4);
                ag2 = rs.getBoolean(5);
                ag3 = rs.getBoolean(6);
                state = rs.getInt(7);
            }

        } catch (Exception e) {
            System.out.println("Controller.CreateAccount -> searchAccountFunc에서 while문 밑의 예외처리로 빠짐");
            e.printStackTrace();
        } finally {

            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (Exception e) {
                System.out.println("Controller.CreateAccount -> searchAccountFunc에서 finally 안에 있는 예외처리로 빠짐");
                e.printStackTrace();
            }
        }
        Account account = new Account(id, pw, email, ag1, ag2, ag3, state);
        return account;
    }

    public String loginFunc(String ID, String PW, HttpServletRequest request) {
        String sql = "select * from member where id= " + request.getParameter("id") ;
        String id = request.getParameter("id");
        String pw = request.getParameter("pw");
        String idck;
        String pwck;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            rs = pstmt.executeQuery();

            while (rs.next()) {
                idck = rs.getString(1);
                pwck = rs.getString(2);

                if (idck.equals(id) && pwck.equals(pw)) {
                    HttpSession session = request.getSession();
                    session.setAttribute("id", rs.getString(1));
                    session.setAttribute("email", rs.getString(3));

                } else {
                    System.out.println("로그인 실패");
                }
            }
        } catch (Exception e) {
            System.out.println();
            e.printStackTrace();
        } finally {

            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (Exception e) {
                System.out.println();
                e.printStackTrace();
            }
        } return "";
    }
}
