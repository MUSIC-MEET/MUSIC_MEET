import React, { useCallback, useMemo, useState } from "react";
import BaseProps from "components/common/BaseProps";
import TabMenuListType from "./TabMenuListType";
import { useTranslation } from "react-i18next";

import Lyrics from "./Lyrics";
import Menus from "./Menu/Menus";
import PlayList from "./PlayList";
import MenuContent from "./MenuContent";

function ContentTabs(props: BaseProps) {
    const { t } = useTranslation<"musicPlayer">("musicPlayer");
    const [selected, setSelected] = useState<number>(0);
    const menus: TabMenuListType[] = useMemo(() => [
        { id: 0, name: t("content.menus.playList"), content: <PlayList /> },
        { id: 1, name: t("content.menus.lyrics"), content: <Lyrics lyrics="aasdasd" /> },
    ], [t]);
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