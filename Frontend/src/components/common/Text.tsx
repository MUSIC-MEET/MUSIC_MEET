import React from "react";
import ReactMarkdown from "react-markdown";

function Text(props: { children: string; className?: string }) {
    return (
        <ReactMarkdown className={props.className}>{`${props.children}`}</ReactMarkdown>
    );
}

export default Text;