import { css } from "@emotion/react";
import React from "react";
import Text from "components/common/Text";
import AcUnitIcon from "@mui/icons-material/AcUnit";
function Index() {
    return (
        <div css={style}>
            <Text>
                {"404\\\n Not Found Page"}
            </Text>
            <AcUnitIcon css={snow} />
        </div>
    );
}

const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    text-align: center;
    line-height: 1.5;
    font-size: 4rem;
    margin-bottom: 3rem;
`;

const snow = css`
    color: skyblue;
    cursor: pointer;
    animation: rotate 3s infinite linear;
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
`;


export default Index;