import React from "react";
import NewLoginAlertModal from "components/AlertModal/NewLoginAlertModal";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorCoode: "" };
    }

    static getDerivedStateFromError({ response }) {
        if(response.status === 401) {
            console.log(401);
            return { hasError: true, errorCode: "401" };
        }
    }
    


    render() {
        if(this.state.hasError && this.state.errorCode === "401" ) {
            return (
                <div>
                    <NewLoginAlertModal />
                    {/* {this.props.children} */}
                </div>
                
            );
        }
        else return this.props.children;
    }
}

export default ErrorBoundary;