
import React from "react";
import NotFoundPost from "./View/NotFoundPost";
import NewLoginAlertModal from "components/AlertModal/NewLoginAlertModal";
import DeletePostAlert from "./View/DeletePostAlert";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorCoode: "" };
    }

    static getDerivedStateFromError({ response }) {
        if(response.status === 400) {
            console.log(400);
            return { hasError: true, errorCode: "400" };
        }
        if(response.status === 404) {
            console.log(404);
            return { hasError: true, errorCode: "404" };
        }
        else if(response.status === 401) {
            console.log(401);
            return { hasError: true, errorCode: "401" };
        }
        
    }
    


    render() {
        if (this.state.hasError && this.state.errorCode === "404") {
            // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
            return (
                <NotFoundPost />
            );
        }
        else if(this.state.hasError && this.state.errorCode === "401" ) {
            return (
                <div>
                    <NewLoginAlertModal />
                    {this.props.children}
                </div>
            );
        }
        else if(this.state.hasError && this.state.errorCode === "400" ) {
            return(
                <div>
                    <DeletePostAlert />
                    {this.props.children}
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;