import React, { useState } from "react";
import FindContentBox from "./FindContent";
import useAxios from "hooks/use-Axios";
import Input from "components/common/Input";
import Form from "../../components/common/Form";
import { css } from "@emotion/react";

interface InfoProps {
    id: string;
    email: string;
}

function Password() {
    const [info, setInfo] = useState<InfoProps>({
        id: "",
        email: ""
    });
    const { fetchData, status } = useAxios({
        url: "/findpw",
        method: "POST",
        body: {
            id: info.id,
            email: info.email
        }
    });

    const init = !status.isError && !status.isLoading && !status.isSucess;

    if (init) {
        return (
            <FindContentBox>
                <Form addCss={[formStyle]} onSubmit={() => {  /* */ }} direction={"column"}>
                    <label htmlFor="id">ID</label>
                    <Input
                        w={"25rem"}
                        h={"2.5rem"}
                        input={{
                            type: "text",
                            value: info.id,
                            id: "id"
                        }}
                    />
                </Form>
                <Form onSubmit={() => {  /* */ }} direction={"column"} >
                    <label htmlFor="id">Email</label>
                    <Input
                        w={"25rem"}
                        h={"2.5rem"}
                        input={{
                            type: "email",
                            value: info.email,
                            id: "email"
                        }}
                    />
                </Form>
            </FindContentBox >
        );
    }
    return (
        <FindContentBox>
            <p>ddd</p>
        </FindContentBox>
    );
}
const formStyle = css`
    label {
        margin-bottom: 0.5rem;
    }
`;

export default Password;