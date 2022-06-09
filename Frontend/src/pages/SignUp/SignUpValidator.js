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

function SignUpValidator({ id, pw1, pw2, email, nickname }) {
    const error = {
        id: "",
        nickname: "",
        pw1: "",
        pw2: "",
        email: "",
        clear: false,
    };

    if( (id.length !==0 && !isId(id)) ) {
        console.log("invalid");
        error.id = "invalid";
    } else if(isId(id)){
        console.log("valid");
        error.id = "valid";
    }

    if(nickname.length !=0 && !isNick(nickname)) {
        error.nickname = "invalid";
    } else if(isNick(nickname)) {
        error.nickname = "valid";
    }

    if(pw1.length !=0 && !isPw(pw1)) {
        error.pw1 = "invalid";
    } else if(isPw(pw1)) {
        error.pw1 = "valid";
    }

    if(pw1 !== pw2) {
        error.pw2 = "notmatchs";
    } else if( pw2.length > 0 && isPw(pw2) && pw1 === pw2) {
        error.pw2 = "valid";
    }

    if(email.length !=0 && !isEmail(email)) {
        error.email = "invalid";
    } else if(email.length > 0 && isEmail(email)) {
        error.email = "valid";
    }

    if(isId(id) && isNick(nickname) && isEmail(email) && isPw(pw1) && isPw(pw2) && pw1 === pw2) {
        error.clear = true;
    } else {
        error.clear = false;
    }
    return {
        error
    };
}

export default SignUpValidator;