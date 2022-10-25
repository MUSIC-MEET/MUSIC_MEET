import React from "react";
import Post from "./Post";
import Text from "./Text";
import PostItem from "./PostItem";

interface PostListProps {
    className?: string;
    list?: Post[];
    text: string;
    genre: string;
}

function PostList(props: PostListProps) {
    return (
        <div className={`${props.className}`}>
            <Text
                text={props.text}
            />
            <ul>
                {props.list?.map((post) => (
                    <PostItem
                        genre={props.genre}
                        key={post.id}
                        {...post}
                    />
                ))}
            </ul>
        </div >

    );
}

export default PostList;