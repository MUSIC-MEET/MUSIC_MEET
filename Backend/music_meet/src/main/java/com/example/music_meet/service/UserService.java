package com.example.music_meet.service;

import com.example.music_meet.bot.Song;
import com.example.music_meet.util.AES256Util;
import com.example.music_meet.util.SHA256;
import com.example.music_meet.dto.ResetPw;
import com.example.music_meet.dto.User;
import com.example.music_meet.validate.Validate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Service
public class UserService {


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;// 암호화 객체

    private AES256Util aes256Util; // AES256 변수 (암호화, 복호화에 사용)
    @Autowired
    private SHA256 sha256; // SHA256 변수 (이메일 인증에 사용 암호문에 /가 안들어감)

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

    @Autowired
    private Validate validate;

    @Autowired
    private java.sql.Timestamp date;

    //
    // 아이디 찾기
    //
    public String findIdFunc(String email)
    {
        String id;
        String sql = "select id from user where email = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            aes256Util = new AES256Util();
            String value = aes256Util.encrypt(email);
            pstmt.setString(1, value);

            rs = pstmt.executeQuery();


            if (!rs.next())
            {
                throw new Exception("findIdFunc 에서 rs가 null 값으로 예외처리에 빠짐");
            }
            else
            {
                id = rs.getString(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

        return id;
    }

    //
    // 이메일 찾기
    //
    public String findEmailFunc(final Map<String, String> requestMap)
    {
        String decoding_email = null;

        if (requestMap.get("userNum") == null)
        {
            String sql = "select email from user where email = ?";

            try
            {
                aes256Util = new AES256Util();
                //
                // DB구간
                //
                Class.forName(classForName);
                conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
                pstmt = conn.prepareStatement(sql);

                pstmt.setString(1, requestMap.get("email"));
                rs = pstmt.executeQuery();

                if (rs.next())
                {
                    decoding_email = aes256Util.decrypt(rs.getString(1));
                }
                else
                {
                    //throw new Exception("findEmailFunc 에서 중복된 이메일 확인되에 예외처리로 빠짐");
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            finally {
                try {
                    rs.close();
                    pstmt.close();
                    conn.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }

        }
        else
        {
            String sql = "select email from user where userNum = ?";

            try
            {
                aes256Util = new AES256Util();
                //
                // DB구간
                //
                Class.forName(classForName);
                conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
                pstmt = conn.prepareStatement(sql);

                pstmt.setInt(1, Integer.parseInt(requestMap.get("userNum")));
                rs = pstmt.executeQuery();

                if (rs.next())
                {
                    decoding_email = aes256Util.decrypt(rs.getString(1));

                }
                else
                {
                    //throw new Exception("findEmailFunc 에서 중복된 이메일 확인되에 예외처리로 빠짐");
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            finally {
                try {
                    rs.close();
                    pstmt.close();
                    conn.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }

        }



        return decoding_email;
    }

    //
    // 비밀번호 찾기
    // userNum과 비밀번호를 인수로 해당 userNum의 pw를 리턴함
    public String findPassWord(String userNum)
    {
        sql = "select pw from user where usernum = ?";

        String findPw = null;

        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, Integer.parseInt(userNum));
            rs = pstmt.executeQuery();
            if (!rs.next())
            {
                System.out.println("findUserInfo에서 userNum으로 아이디, 닉네임, 이메일 조회 실패");
            }
            else
            {
                findPw = rs.getString(1);
            }

        }
        catch (Exception e)
        {
            System.out.println("findUserInfo에서 예외처리로 빠짐");
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return findPw;
    }


    //
    // 아이디 중복 검사 (id가 DB에 있으면 true 리턴)
    //
    public boolean isDuplicateIdFunc(User user)
    {
        sql = "select id from user where id = ?";
        boolean result = false;
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getId());

            rs = pstmt.executeQuery();
            while (rs.next()) {
                result = true;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        finally
        {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

        return result;
    }


    //
    // 닉네임 중복 검사 (닉네임이 DB에 있으면 true 리턴)
    //
    public boolean isDuplicateNicknameFunc(User user)
    {
        sql = "select nickname from user where nickname = ?";
        boolean result = false;
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, user.getNickname());

            rs = pstmt.executeQuery();

            while (rs.next()) {
                System.out.println(rs.getString(1));
                result = true;
            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        finally {
            if (pstmt != null && conn != null) {
                try {
                    rs.close();
                    pstmt.close();
                    conn.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return result;
    }

    //
    // email 중복 검사 (닉네임이 DB에 있으면 true 리턴)
    //
    public boolean isDuplicateEmailFunc(User user)
    {
        String value= null;
        try {
            aes256Util = new AES256Util();
            value = aes256Util.encrypt(user.getEmail());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

        sql = "select email from user where email = ?";
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, value);

            rs = pstmt.executeQuery();

            if (!rs.next())
                return false;
            else
                return true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

        }
    }

    //
    // 이메일 인증
    //
    public void emailAuthFunc(User user)
    {
        String key = "1009035332a";
        String encodingValue;
        String str = user.getId() + user.getNickname() + user.getEmail() + key;
        
        try {
            sha256 = new SHA256();
            encodingValue = sha256.encrypt(str);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        
        MailService mailService = new MailService();
        mailService.registerAuthSendMailFunc(user.getEmail(), encodingValue);

        sql = "select usernum from user where id = ? and pw = ?";
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1,user.getId());
            pstmt.setString(2, user.getPw());

            rs = pstmt.executeQuery();

            if (!rs.next())
            {
                System.out.println("emailAuthFunc에서 에러로 빠짐, 만약 changeEmail (이메일 바꾸는 API)가 호출될시 에러가 아닌 정상 작동임");
            }
            else
            {
                user.setUsernum(Integer.toString(rs.getInt(1)));
            }

        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        }

        // ==================================== 여러번 보낼시 이전 링크 삭제 ==========================================
        sql = "delete from emailauth where encoding_value = ?";
        try {
            //
            // DB구간
            //
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, encodingValue);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        // =============================================================================================================

        sql= "insert into emailauth(usernum,encoding_value) values(?,?)";
        try {
            //
            // DB구간
            //
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(user.getUsernum()));
            pstmt.setString(2, encodingValue);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // 회원가입 전용 이메일 응답 처리
    //
    public void responseEmailAuthFunc(String value)
    {
        String sql = "select encoding_value from emailauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, value);

            rs = pstmt.executeQuery();

            if (!rs.next())
            {
                throw new Exception("responseEmailAuthFunc 에서 rs가 null 값으로 예외처리에 빠짐");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // 회원 추가
    //
    public void createUserFunc (User user)
    {
            String email = user.getEmail();


            user.setPw(bCryptPasswordEncoder.encode(user.getPw())); // 비밀번호 단방향 암호화
            String sql = "insert into user(id,pw,email,nickname,createdat,updatedat, deletedat, createdip,updatedip,deletedip, state) values(?,?,?,?,?,?,?,?,?,?,?)"; //   10개
            try {
                //
                // DB구간
                //
                aes256Util = new AES256Util();
                user.setEmail(aes256Util.encrypt(user.getEmail()));

                Class.forName(classForName);
                conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
                pstmt = conn.prepareStatement(sql);

                pstmt.setString(1, user.getId());
                pstmt.setString(2, user.getPw());
                pstmt.setString(3, user.getEmail());
                pstmt.setString(4, user.getNickname());
                pstmt.setTimestamp(5, date);    // CreatedAt
                pstmt.setTimestamp(6, null); // UpdatedAt
                pstmt.setTimestamp(7, null); // deletedAt
                pstmt.setString(8, "0"); //Createdip
                pstmt.setString(9, "0");//Updatedip
                pstmt.setString(10, null); // deletedip
                pstmt.setInt(11, 3);     // 이메일 미인증 상태

                rsInt = pstmt.executeUpdate();

                if (rsInt == 1) {
                    user.setEmail(email);
                    emailAuthFunc(user);
                }

            } catch (ClassNotFoundException | SQLException e) {
                //e.printStackTrace();
                throw new RuntimeException(e);
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            } catch (GeneralSecurityException e) {
                throw new RuntimeException(e);
            } finally {
                try {
                    if (pstmt != null && conn != null) {
                        rs.close();
                        pstmt.close();
                        conn.close();
                    }
                } catch (Exception e) {
                    //e.printStackTrace();
                }
            }
            System.out.println("계정 생성 정상 처리");
        }

    //
    // user의 state 상태를 바꿈
    //
    public void setUserStateFunc(String value)
    {
        String sql = "update user set state = 0 where id =(select id from emailauth where encoding_value = ?)";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }


    //
    // user가 비밀번호를 찾을때 아이디와 이메일을 입력받아서 아이디와 이메일이 DB에 있는지 확인하는 함수
    //
    public String checkIdAndEmail(String id, String email)
    {

        int userNum = 0;
        String value;
        String endcoding_email;

        String sql = "select usernum from user where id = ? and email = ?";
        try
        {

            sha256 = new SHA256();
            aes256Util = new AES256Util();
            value = aes256Util.encrypt(email);
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, id);
            pstmt.setString(2, value);
            rs = pstmt.executeQuery();

            if (!rs.next())
            {
                throw new Exception("findIdFunc 에서 rs가 null 값으로 예외처리에 빠짐");
            }
            else
            {
                userNum = rs.getInt(1);
            }


            // DB에 있다
            sql = "delete from pwauth where usernum = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            pstmt.executeUpdate();

            sql = "insert into pwauth(usernum, email, encoding_value) values(?,?,?)";
            endcoding_email = sha256.encrypt(id + email + new Date().toString());
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            pstmt.setString(2, value);
            pstmt.setString(3, endcoding_email);

            rsInt = pstmt.executeUpdate();

            if (rsInt == 1) {

            } else
                System.out.println("\"/auth/pw/{keyValue}\" URL의 checkIdAndEmail에서 문제 발생");

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return endcoding_email;

    }
    
    //
    // emailauth에서 인증이 끝난 데이터 삭제
    //
    public void deleteEmailAuthFunc(String value)
    {
        String sql = "delete from emailauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // pwauth에서 인증이 끝난 데이터 삭제
    //
    public void deletepwAuthFunc(String value)
    {
        String sql = "delete from pwauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

    }

    //
    // "/auth/pw/{keyValue}"에서 날라온 key 확인 후 boolean 리턴하는 함수
    //
    public boolean responsePwEmailAuthFunc(String value)
    {
        boolean result;

        String sql = "select * from pwauth where encoding_value = ?";
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, value);

            rs = pstmt.executeQuery();
            if (!rs.next())
            {
                result = false;
            }
            else
                result = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }

        }
        return result;
    }

    //
    // 유효성 검사 통과한 새로운 비밀번호를 user테이블에 세팅해 줌
    //
    public void setUserPw(String newPw, String value, int state)
    {
        if (state == 1) // 비로그인
        {
            sql = "update user set pw = ? where usernum = (select usernum from pwauth where encoding_value = ?)";
        }
        else if (state == 2)
        {
            sql = "update user set pw = ? where usernum = ?";
        }
        else
        {

        }
        try
        {
            //
            // DB구간
            //
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, bCryptPasswordEncoder.encode(newPw));
            pstmt.setString(2, value);

            rsInt = pstmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    //
    // userNum을 매개변수로 아이디, 이메일, 닉네임을 조회하는 함수
    // CreateUserController.callUserInfo에서 사용중
    public Map<String, String> findUserInfo(String userNum)
    {
        sql = "select usernum, id, email, nickname from user where usernum = ?";
        Map<String, String> map = new HashMap<>();
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, Integer.parseInt(userNum));
            rs = pstmt.executeQuery();
            if (!rs.next())
            {
                System.out.println("findUserInfo에서 userNum으로 아이디, 닉네임, 이메일 조회 실패");
                map.put("userNum", null);
                map.put("id", null);
                map.put("email", null);
                map.put("nickname", null);
            }
            else
            {
                map.put("userNum", Integer.toString(rs.getInt(1)));
                map.put("id", rs.getString(2));
                map.put("email", rs.getString(3));
                map.put("nickname", rs.getString(4));
            }
        }
        catch (Exception e)
        {
            System.out.println("findUserInfo에서 예외처리로 빠짐");
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return map;
    }

    //
    // 아이디를 매개변수로 이메일 변경
    // CreateUserController.changeEmail에서 사용중
    public void changeUserEmail(final String userNum, final String newEmail)
    {

        sql = "update user set email = ? where usernum = ?";
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, newEmail);
            pstmt.setInt(2, Integer.parseInt(userNum));
            rsInt = pstmt.executeUpdate();
        }
        catch (Exception e)
        {
            System.out.println("changeUserEmail()에서 예외처리로 빠짐");
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }



    }

    public void setUserStateValue(String userNum, int state)
    {
        sql = "update user set state = ? where usernum = ?";
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, state);
            pstmt.setInt(2, Integer.parseInt(userNum));

            rsInt = pstmt.executeUpdate();
        }
        catch (Exception e)
        {
            System.out.println("setUserStateValue()에서 예외처리로 빠짐");
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }


    }


    public boolean setUserNickname(String userNum, String newNickname)
    {
        boolean result = false;
        sql = "update user set nickname = ? where usernum = ?";
        try
        {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, newNickname);
            pstmt.setString(2,userNum);

            rsInt = pstmt.executeUpdate();

            result = true;
        }catch (Exception e)
        {
            System.out.println("UserService.setUserNickname에서 오류 발생");
        }finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }

    public void savedUserImage(MultipartFile image)
    {
        LocalDate localDate = LocalDate.now();
        final String path = System.getProperty("user.dir") + "\\src\\main\\resources\\UserImages";

        String fileName = localDate + "_" + image.getOriginalFilename();
        File savedFile = new File(path, fileName);

        try {
            image.transferTo(savedFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public void changeUserImnagePath(String userNum,String path)
    {
        sql = "update user set userimage = ? where usernum = ?";
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, path);
            pstmt.setInt(2, Integer.parseInt(userNum));
            rsInt = pstmt.executeUpdate();
        }
        catch (Exception e)
        {
            System.out.println("changeUserImnage()에서 예외처리로 빠짐");
        }
        finally
        {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

    }






    //
    // 차트 테스트
    //
    public ArrayList<Song> getChart(String siteCode)
    {
        final int site = Integer.parseInt(siteCode);
        int rank = 0;
        String title, singer, img_src = null;
        ArrayList<Song> chart = new ArrayList<>();

        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);

            switch (site)
            {
                case 1:
                    sql = "select rank,title, singer, img_src from melonchart";
                    break;
                case 2:
                    sql = "select rank,title, singer, img_src from geinechart";
                    break;
                case 3:
                    sql = "select rank,title, singer, img_src from bugschart";
                    break;
                default:
                    break;
            }

            while (rs.next())
            {
                pstmt = conn.prepareStatement(sql);
                pstmt.executeUpdate();

                rank = rs.getInt(1);
                title = rs.getString(2);
                singer = rs.getString(3);
                img_src = rs.getString(4);

                Song song = new Song();
                song.setRank(rank);
                song.setTitle(title);
                song.setSinger(singer);
                song.setImgSrc(img_src);
                song.setSite(site);

                chart.add(song);
            }

        } catch (Exception e) {
            System.out.println("BotService.insertDB()에서 예외처리로 빠짐");
            e.printStackTrace();
        } finally {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return chart;

    }
}



