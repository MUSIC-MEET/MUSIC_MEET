interface statusType {
    isLoading: boolean;
    isError: boolean;
    isSucess: boolean;
}

const InitStatus:statusType = {
    isLoading: false,
    isError: false,
    isSucess: false
    
};

export { statusType, InitStatus } ;