import AlertModal from "components/AlertModal/AlertModal";
import React from "react";

function DeletePostAlert() {
    return (
        <AlertModal
            title="삭제된 게시글"
            content="본문이 삭제되어 수행할 수 없습니다."
            button="확인"
            onClose={() => { /* ... */ }}
            buttonClick={() => {/* TODO */ }}
        />
    );
}

export default DeletePostAlert;