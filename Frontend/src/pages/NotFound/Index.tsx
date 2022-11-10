import React, { useState } from "react";
import Text from "components/common/Text";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EasterEgg from "./EasterEgg";
import styled from "@emotion/styled";
function Index() {
    const [isStartEasteregg, setIsStartEasteregg] = useState(false);
    return (
        <Wrap>
            <Text>
                {"404\\\n Not Found Page"}
            </Text>
            <AcUnitIcon className="snow" onClick={() => setIsStartEasteregg(true)} />
            {isStartEasteregg && <EasterEgg />}
        </Wrap>
    );
}

const Wrap = React.memo(styled.div`
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

    .snow {
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
    }

    
`);


export default Index;