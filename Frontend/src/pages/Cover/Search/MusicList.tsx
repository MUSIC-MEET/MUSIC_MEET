import AnimationMoreButton from "components/common/AnimationMoreButton";
import CardMusicList from "components/common/CardMusicList";
import React from "react";
import MusicType from "Types/MusicType";

interface MusicListProps {
    list?: MusicType[];
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
}

function MusicList(props: MusicListProps) {
    return (
        <React.Fragment>
            <CardMusicList
                type={"cover"}
                list={props?.list}
            />
            <AnimationMoreButton
                onClick={() => props.fetchNextPage()}
                hasNext={props.hasNextPage}
            />
        </React.Fragment>
    );
}

export default MusicList;