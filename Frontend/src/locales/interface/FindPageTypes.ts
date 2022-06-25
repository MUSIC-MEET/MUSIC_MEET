interface FindPageTypes {
    ment: string;
    id: { 
        title: string;
        placeholder: string;        
        submit: string;
        sucess: string;
        error: string;
    },
    pw: {
        title: string;
        id: {
            label: string;
            placeholder: string;
        },
        email: {
            label: string;
            placeholder: string
        }
        submit: string,
        sucess: string,
        error: string
    }
}
export default FindPageTypes;