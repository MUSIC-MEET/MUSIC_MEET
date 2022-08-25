import { css } from "@emotion/react";
import React from "react";
import BuildIcon from "@mui/icons-material/Build";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReportIcon from "@mui/icons-material/Report";
import { useRecoilValue } from "recoil";
import LoginState from "store/LoginState";

function MoreActions({ writer }: { writer: string }) {
    const { nickname } = useRecoilValue<{ nickname: string }>(LoginState);
    return (
        <section css={style}>
            {nickname === writer &&
                <React.Fragment>
                    <button className="delete button">
                        <DeleteForeverIcon />
                    </button>
                    <button className="edit button">
                        <BuildIcon />
                    </button>
                </React.Fragment>
            }
            <button className="report button">
                <ReportIcon />
            </button>
        </section>
    );
}

const style = css`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    .button {
        all: unset;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        margin-left: 0.3rem;
        border-radius: 3px;
    }

    .delete {
        background-color: #b3301f;
    }
    .edit {
        background-color: #1fb61f;
    }

    .report {
        background-color: red;
    }
`;


export default React.memo(MoreActions);