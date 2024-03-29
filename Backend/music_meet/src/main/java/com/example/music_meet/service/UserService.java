package com.example.music_meet.service;

import com.example.music_meet.bean.BeanConfig;
import com.example.music_meet.dto.Response.Response_callUserComment;
import com.example.music_meet.util.AES256Util;
import com.example.music_meet.util.SHA256;
import com.example.music_meet.dto.User;
import com.example.music_meet.validate.Validate;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.util.*;
import java.util.Date;


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

    @Value("${server.url}")
    private String serverURL;

    @Value("${server.port}")
    private String serverPort;

    @Autowired
    private BeanConfig beanConfig;

    //final private String serverFolder = "profileimage";




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
    // userNum을 매개변수로 아이디, 이메일, 닉네임, 이미지를 조회하는 함수
    // CreateUserController.callUserInfo에서 사용중
    public Map<String, String> findUserInfo(String userNum)
    {
        sql = "select usernum, id, email, nickname, userimage from user where usernum = ?";
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
                map.put("image", null);
            }
            else
            {
                map.put("userNum", Integer.toString(rs.getInt(1)));
                map.put("id", rs.getString(2));
                map.put("email", rs.getString(3));
                map.put("nickname", rs.getString(4));
                map.put("image", serverURL + ":" + serverPort + "/user/image/" + rs.getString(5));
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


    //
    // DB에서 유저 이미지 명 교체
    //
    public void changeUserImnagePath(String userNum,String file)
    {
        sql = "update user set userimage = ? where usernum = ?";
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, file);
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
                //rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

    }


    //
    // 유저 음악 평가 댓글 호출
    //
    public ArrayList<Response_callUserComment> callMusicComment(final int userNum)
    {
        ArrayList<Response_callUserComment> response_callUserComments = new ArrayList<>();

        sql = "SELECT a.musicNum, a.createdAt, a.content, b.origin_title, b.origin_singer ,b.imgSrc " +
                "FROM musicComment a, music b WHERE a.musicNum = b.musicNum AND a.state = 0 AND a.userNum = ? " +
                "ORDER BY createdAt DESC LIMIT 0,5";
        try {
            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            rs = pstmt.executeQuery();


            while (rs.next()){
                Response_callUserComment response_callUserComment = new Response_callUserComment();
                response_callUserComment.setMusicNum(rs.getInt("musicNum"));
                response_callUserComment.setCreatedAt(rs.getString("createdAt"));
                response_callUserComment.setContent(rs.getString("content"));
                response_callUserComment.setImgSrc(serverURL + ":" + serverPort + beanConfig.MUSIC_IMAGE_URL +  rs.getString("imgSrc"));
                response_callUserComment.setTitle(rs.getString("origin_title"));
                response_callUserComment.setSinger(rs.getString("origin_singer"));
                response_callUserComment.setType(0);
                response_callUserComments.add(response_callUserComment);
            }

            sql = "SELECT a.uploadnum, c.userimage, a.origin_title, c.nickname, b.createdat, b.comment " +
                    "FROM upload a, uploadComment b, user c WHERE a.uploadNum = b.uploadNum AND a.userNum = c.userNum AND a.state = 0 AND b.userNum = ? " +
                    "ORDER BY createdAt DESC LIMIT 0,5";

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userNum);
            rs = pstmt.executeQuery();

            while (rs.next()){
                Response_callUserComment response_callUserComment = new Response_callUserComment();
                response_callUserComment.setMusicNum(rs.getInt("uploadNum"));
                response_callUserComment.setCreatedAt(rs.getString("createdAt"));
                response_callUserComment.setContent(rs.getString("comment"));
                response_callUserComment.setImgSrc(serverURL + ":" + serverPort + beanConfig.USER_IMAGE_API_URL + rs.getString("userimage"));
                response_callUserComment.setTitle(rs.getString("origin_title"));
                response_callUserComment.setSinger(rs.getString("nickname"));
                response_callUserComment.setType(1);
                response_callUserComments.add(response_callUserComment);
            }
            Collections.sort(response_callUserComments, new Comparator<Response_callUserComment>() {
                @Override
                public int compare(Response_callUserComment o1, Response_callUserComment o2) {
                    return o1.getCreatedAt().compareTo(o2.getCreatedAt());
                }
            });
        }
        catch (Exception e)
        {
            System.out.println("callMusicComment()에서 예외처리로 빠짐");
            e.printStackTrace();
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
        return response_callUserComments;
    }


    /**
     * 개별 회원 업로드
     * upload 폴더에 유저의 넘어온 파일을 저장하고 upload 테이블에 값을 삽입하는 함수
     * @param userNum 유저 번호
     * @param title   업로드 글 제목
     * @param comment 업로드 한 줄 코멘트
     * @param mp3File MultipartFile 타입의 mp3 파일
     * @return Request로 넘어온 mp3 파일을 성공적으로 upload 폴더에 저장하고 upload 테이블에 삽입까지 했다면 true 리턴, 실패시 false 리턴
     */
    public boolean userUpload(int userNum, String title, String comment, MultipartFile mp3File) {
        boolean result = false;
        final String fileName = new Date().getTime() + "_" + mp3File.getOriginalFilename().replaceAll(" ", "");
        final String originFileName = mp3File.getOriginalFilename().replaceAll(" ", "");
        date = new java.sql.Timestamp(new java.util.Date().getTime());

        sql = "INSERT INTO upload(`usernum`, `title`, `origin_title`, `comment`, `file`, `origin_file`, `createdat`, `vote`,`state`)" +
                " VALUES(?,?,?,?,?,?,?,?,?)";
        try {
            File newFile = new File(beanConfig.UPLOAD_MP3FILE_PATH + fileName);
            mp3File.transferTo(newFile);

            Class.forName(classForName);
            conn = DriverManager.getConnection(mysqlurl, mysqlid, mysqlpassword);
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1,userNum);
            pstmt.setString(2, title.replaceAll(" ",""));
            pstmt.setString(3, title);
            pstmt.setString(4, comment);
            pstmt.setString(5, fileName.replaceAll(" ", "")); // file
            pstmt.setString(6, originFileName);       // origin_file
            pstmt.setTimestamp(7, date);
            pstmt.setInt(8, 0);
            pstmt.setInt(9,0);

            rsInt = pstmt.executeUpdate();
            if (rsInt >= 1){
                result = true;
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            try {
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }
}



