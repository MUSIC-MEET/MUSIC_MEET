import React, { useCallback, useMemo, useState } from "react";
import BaseProps from "components/common/BaseProps";
import TabMenuListType from "./TabMenuListType";
import PlayList from "./PlayList";
import Lyrics from "./Lyrics";
import MenuContent from "./MenuContent";
import Menus from "./Menu/Menus";

function ContentTabs(props: BaseProps) {
    const [selected, setSelected] = useState<number>(0);
    const menus: TabMenuListType[] = useMemo(() => [
        { id: 0, name: "재생 목록", content: <PlayList /> },
        { id: 1, name: "가사", content: <Lyrics lyrics="aasdasd" /> },
    ], []);
    const menuClickHandler = useCallback((id: number) => {
        setSelected(() => id);
    }, []);
    return (
        <div className={`${props?.className}`}>
            <Menus
                menus={menus}
                currentMenu={selected}
                menuClickHandler={menuClickHandler}
            />
            <MenuContent component={menus[selected].content} />
        </div>
    );
}

export default ContentTabs;