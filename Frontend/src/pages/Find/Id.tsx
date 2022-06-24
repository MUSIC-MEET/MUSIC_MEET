import React from "react";
import Input from "components/common/Input";
import { css } from "@emotion/react";
function Id() {
    return (
        <form css={css`display: flex; flex-direction: row;`}>
            <label htmlFor="email">이메일</label>
            <Input
                type="email"
                w={"25rem"}
                h={"2.5rem"}
                input={{
                    id: "email",
                }}
            />
        </form>
    );
}


export default Id;