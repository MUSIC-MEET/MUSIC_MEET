import React from "react";
import MainGenreBoardPostType from "./MainGenreBoardPostType";

function Post(props: MainGenreBoardPostType) {
    return (
        <li>
            {props.user}
            {props.title}
        </li>
    );
}

export default Post;