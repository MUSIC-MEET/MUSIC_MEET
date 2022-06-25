import React, { useState } from "react";
import FindContentBox from "./FindContent";
import useAxios from "hooks/use-Axios";
import Input from "components/common/Input";
import Form from "components/common/Form";

interface InfoProps {
    id: string;
    pw: string;
}

function Password() {

    const [info, setInfo] = useState<InfoProps>({
        id: "",
        pw: ""
    });

    const { fetchData, status } = useAxios({
        url: "/findpw",
        method: "POST",
        body: {
            id: info.id,
            pw: info.pw
        }
    });

    const init = !status.isError && !status.isLoading && !status.isSucess;

    if (init) {
        return (
            <FindContentBox>
                <Form onSubmit={() => {  /* */ }} direction={"column"} >
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
            </FindContentBox >
        );
    }
    return (
        <FindContentBox>
            <p>ddd</p>
        </FindContentBox>
    );
}

export default Password;