import React, { useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import Post from "./Post";
import { PostType } from "./PostList";

const Column = (props: any) => {
    // props의 구조는 { data, style, index, isScrolling }으로 되어있다.
    console.log(props.data);
    return (
        <div>
            {props.data.title}
        </div>
    );
};

function TestList({ data }: { data: PostType[] }) {
    return (
        <List
            // class 이름
            height={7}
            // 아이템이 보이는 곳의 크기
            itemCount={data.length}
            // 아이템 개수
            itemSize={30}
            // 아이템 높이
            width={1200}
            // 아이템 보이는 곳의 넓이
            itemData={data}
        // 아이템 데이터 (배열로 줘서 component에서 indexing 해주자)
        >
            {Column}
        </List>
    );
}

export default TestList;