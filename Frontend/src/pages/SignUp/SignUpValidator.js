
import axios from "axios";

function isId(str) {

    const reg = /^[a-z]+[a-z0-9]{4,19}$/;
    return reg.test(str);
}

function isNick(str) {
    const reg = /^[a-zA-Z-가-힣]+[a-zA-Z-가-힣0-9]{3,15}$/;
    return reg.test(str);
}

function isPw(str) {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,15}$/;
    return reg.test(str);
}

function isEmail(str) {
    // eslint-disable-next-line no-useless-escape
    const reg =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return reg.test(str);
}

async function SignUpValidator( props) {
    const { id, nickname, pw1, pw2, email } = props.values;
    const { errors, setErrors } = props.errors;
    if(props.name === "id") {
        if( (id.length !=0 && !isId(id)) ) {
            setErrors({
                ...errors,
                id: "invalid"
            });
        } else if(isId(id)){
            await axios.get(`/searchid/${id}`)
                .then(() => {
                    setErrors({
                        ...errors,
                        id: "valid"
                    });
                })
                .catch(() => {
                    setErrors({
                        ...errors,
                        id: "duplicate"
                    });
                });  
        }
    }

    if(props.name === "pw1") {
        console.log("qlalf");
        if(pw1.length !=0 && !isPw(pw1)) {
            setErrors({ ...errors, pw1: "invalid" });
        } else if(isPw(pw1)) {
            setErrors({ ...errors, pw1: "valid" });
        }
    }

    if(props.name === "pw2") {
        if(pw1 !== pw2) {
            setErrors({ ...errors, pw2: "notmatchs" });
        } else if( pw2.length > 0 && isPw(pw2) && pw1 === pw2) {
            setErrors({ ...errors, pw2: "valid" });
        }
    }

    if(props.name === "nickname") {
        
        if(nickname.length !=0 && !isNick(nickname)) {
            setErrors({
                ...errors,
                nickname: "invalid"
            });
        } else if(isNick(nickname)) {
            await axios.get(`/searchnickname/${nickname}`)
                .then(() => {
                    setErrors({
                        ...errors,
                        nickname: "valid"
                    });
                })
                .catch(() => {
                    setErrors({
                        ...errors,
                        nickname: "duplicate"
                    });
                });  
        }
        
    }
    
    if(props.name === "email") {
        if(email.length !=0 && !isEmail(email)) {
            setErrors({ ...errors, email: "invalid" });
        } else if(email.length > 0 && isEmail(email)) {
            setErrors({ ...errors, email: "valid" });
        }
    }
}
export default SignUpValidator;