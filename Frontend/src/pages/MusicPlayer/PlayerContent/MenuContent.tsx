import React from "react";

interface MenuContentProps {
    component: React.ReactNode;
}

function MenuContent(props: MenuContentProps) {
    return (
        <div className="">
            {props.component}
        </div>
    );
}

export default MenuContent;