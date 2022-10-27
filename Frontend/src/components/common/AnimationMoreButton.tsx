import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { css } from "@emotion/react";

interface AnimationMoreButtonProps {
    onClick?: () => void;
    hasNext?: boolean;
}

function AnimationMoreButton(props: AnimationMoreButtonProps) {
    return (
        <React.Fragment>
            {
                props.hasNext ?
                    <button
                        onClick={props.onClick
                        }
                        css={style}
                    >
                        <KeyboardDoubleArrowDownIcon
                            fontSize="large"
                        />
                    </button >
                    :
                    ""
            }
        </React.Fragment>



    );
}

const style = css`
    all: unset;
    margin: 1rem 0;
    color: skyblue;
    cursor: pointer;
    
    animation: bounce 2s ease infinite;

    @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-25px);}
	60% {transform: translateY(-10px);}
    }
`;

export default AnimationMoreButton;