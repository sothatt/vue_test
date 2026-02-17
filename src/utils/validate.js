export function required(value,message= "invalide"){
    
    return value && String(value).trim() ? "" : message;

}

export function isEmail(value,message = "is required"){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(value).trim()) ? "" : message

}

export function isPassword(value,message = "is required"){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(String(value).trim())? "" : message;
}


// -------validate form create 

export function isContent(value, message = "Minimum 8 characters required") {
  return value && String(value).trim().length >= 8 ? "" : message;
}


export function validate(value,rules=[]){

    for(const rule of rules){
        let err = rule(value);
        if(err) return err;
    }
    return "";
}

