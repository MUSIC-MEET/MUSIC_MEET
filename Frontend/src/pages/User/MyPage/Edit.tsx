import React from "react";
import Form from "components/common/Form";


function Edit() {
    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        //
        e.preventDefault();
    };
    return (
        <Form direction="row" onSubmit={onSubmit}>
            <dd>dd</dd>
        </Form>
    );
}

export default Edit;