import React from "react";
import { css } from "@emotion/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function LoginStateToggle(props) {
    const { text, state, onChangeState } = props;
    return (
        <div css=
            {css`
            display: flex; 
            justify-content: flex-start; 
            align-items: center; 
            margin-bottom: 2rem;
            margin-top: 0.2rem;
            font-size: 0.8rem;
            label{ margin-left: 0.5rem; font-size:1rem;  cursor: pointer; }
        `}>
            {!state ? 
                <CheckCircleOutlineIcon css={css` cursor: pointer; color: ${state ? "" : "#b6b6b6"};`} 
                    onClick={onChangeState} /> : 
                <CheckCircleIcon css={css` cursor: pointer; `} onClick={onChangeState}/>}
            <p 
                css={css`
                    cursor: pointer;
                    color: ${state ? "" : "#b6b6b6"};
                `}
                onClick={onChangeState}
            >
                {text}</p>
        </div>
    );
}

export default React.memo(LoginStateToggle);