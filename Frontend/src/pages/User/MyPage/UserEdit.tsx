import React, { useEffect } from "react";
import { css } from "@emotion/react";
import ValuesEdit from "./ValuesEdit";
import ImageEdit from "./ImageEdit";
import { useRecoilValue } from "recoil";
import MyInfo from "store/MyInfo";
import { useQuery } from "react-query";
import getMyInfo from "../../../utils/RequestApis/MyPage/getMyInfo";


function UserEdit() {
    const { data } = useQuery("/user/myinfo", () => getMyInfo(),
        {
            retry: 0,
            useErrorBoundary: true,
            cacheTime: 0,
            staleTime: 0,
            onError: (err: any) => {
                if (err.response.status === 401) {
                    throw "401";
                }
            }
        }
    );
    const myInfo = data.data;
    useEffect(() => {
        //
    }, [myInfo]);
    return (
        <article css={[articleStyle]}>
            <ImageEdit />
            <ValuesEdit
                myInfo={myInfo}
            />
        </article>
    );
}

const articleStyle = css`
    width: 70vw;
    min-height: 20vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    section {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export default UserEdit;