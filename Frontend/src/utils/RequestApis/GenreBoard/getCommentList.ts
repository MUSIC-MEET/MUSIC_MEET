import CommentListType from "pages/GenreBoard/View/CommentListType";
import customAxios from "../../customAxios";

/**
 * 장르게시판 댓글 목록 조회
 * @param {Object} obj
 * @param {string} obj.genre - 장르
 * @param {string} obj.num - 게시글 번호 
 * @returns 
 */
const getCommentList = 
    ({ 
        genre, num
    }: {genre: string; num: string;}): Promise<CommentListType> => {
        const axios = customAxios();
        const token = localStorage.getItem("token");
        return axios({
            method: "GET",
            url: `/board/comment/${genre}/${num}`,
            headers: {
                authorization: `${token}`,
            },
        }).then(res => res.data);
    };


export default getCommentList;