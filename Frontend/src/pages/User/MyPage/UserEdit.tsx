import React from "react";
import { css } from "@emotion/react";
import ValuesEdit from "./ValuesEdit";
import ImageEdit from "./ImageEdit";
import { useQuery } from "react-query";
import getMyInfo from "../../../utils/RequestApis/MyPage/getMyInfo";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

function UserEdit() {
    const state = useRecoilValue(LoginState);
    const { data } = useQuery(["/user/myinfo", state], () => getMyInfo(),
        {
            suspense: true,
            useErrorBoundary: true,
            retry: 1,
            onError: (err: any) => {
                if (err.response.status === 401) {
                    throw "401";
                }
            }
        }
    );
    const myInfo = data.data;
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
    justify-content: space-around;
    align-items: center;
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
    }
`;

export default React.memo(UserEdit);