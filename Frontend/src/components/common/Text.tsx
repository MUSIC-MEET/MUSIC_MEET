import React from "react";
import ReactMarkdown from "react-markdown";

function Text(props: { children: string }) {
    return (
        <ReactMarkdown>{`${props.children}`}</ReactMarkdown>
    );
}

export default Text;