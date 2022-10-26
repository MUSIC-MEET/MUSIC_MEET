package JPA;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Upload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Integer userNum;
    private String user;
    private String title;
    private String origin_title;
    private String description;
    private String mp3Src;
    private String origin_file;
    private Integer count; // vote
    private Integer isVote;
    private Integer view;
    private String createdAt;
    private Integer state;
    private String imgSrc;
}
