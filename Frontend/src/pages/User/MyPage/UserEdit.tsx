import React from "react";
import { css } from "@emotion/react";
import ValuesEdit from "./ValuesEdit";
import ImageEdit from "./ImageEdit";
import { useQuery } from "react-query";
import getMyInfo from "../../../utils/RequestApis/MyPage/getMyInfo";
import SectionWrapper from "components/common/SectionWrapper";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

function UserEdit() {
    const { nickname } = useRecoilValue<{ nickname: string }>(LoginState);
    const { data } = useQuery(["myinfo", nickname], () => getMyInfo(),
        {
            suspense: true,
            useErrorBoundary: true
        }
    );
    return (
        <SectionWrapper css={[articleStyle]}>
            <ImageEdit
                image={data?.image}
            />
            <ValuesEdit
                {...data}
            />
        </SectionWrapper>
    );
}

const articleStyle = css`
    width: 80vw;
    min-height: 20vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
    }
`;

export default UserEdit;