package JPA;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Upload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JoinColumn(name = "user_usernum")
    private int usernum;
    private String title;
    private String origin_title;
    private String description;
    private String mp3Src;
    private String origin_file;
    private int voteCount;
    private int isVote;
    private int viewCount;
    private String createdAt;
    private int state;

    private String imgSrc;
    private String user;


}
