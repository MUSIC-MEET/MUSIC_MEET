import { AxiosResponse } from "axios";
import customAxios from "../../customAxios";

interface PropTypes {
    genre: string; 
    num : string; 
    comment: string;
}
/**
 * 장르 게시판 게시글에 댓글 쓰는 api   
 * @param {Object} obj
 * @param {string} obj.genre 장르
 * @param {string} obj.num 게시글 번호
 * @param {string} obj.content 댓글 내용
 * @returns 
 */
const writeComment = 
    (obj: PropTypes): Promise<AxiosResponse> => {
        const { genre, num, comment } = obj;
        const axios = customAxios();
        const token = localStorage.getItem("token");

        return axios({
            method: "POST",
            url: `/board/comment`,
            headers: {
                authorization: `${token}`,
            },
            data: {
                genre,
                "boardNum": num,
                comment
            }
        });
    };


export default writeComment;