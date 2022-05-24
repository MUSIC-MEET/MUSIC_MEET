package com.example.music_meet.Service;

//import java.sql.DriverManager;
import java.sql.*;

public class AccountService {

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    public String idSearchFunc(String id)
    {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/music_meet?serverTimezone=UTC&characterEncoding=UTF-8", "root", "0000");
            pstmt = conn.prepareStatement("select * from account");
            //pstmt = conn.prepareStatement("insert into account values('123','456','789',1,1,1)");


            rs = pstmt.executeQuery();

            while (rs.next()) {
                System.out.println(
                        rs.getString(1) + " " +
                                rs.getString(2) + " " +
                                rs.getString(3) + " " +
                                rs.getBoolean(4) + " " +
                                rs.getBoolean(5) + " " +
                                rs.getBoolean(6) + " "
                );

            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "";
    }
}
