import Title from "components/common/Title";
import React from "react";
import GenreSelector from "../GenreSelector";
import { useParams } from "react-router-dom";
import style from "../SectionStyle";
import InputForm from "./InputForm";
function Write() {
    const params = useParams();
    const genre = params.genre ?? "kpop";
    return (
        <section css={style}>
            <Title>{"글 작성"}</Title>
            <GenreSelector
                genre={genre}
                write={true}
            />
            <InputForm />
        </section>
    );
}



export default Write;