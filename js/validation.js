const regex = {
    email: (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: {
        weak: (/^(?=.*\d).{8,}$/),
        medium: (/^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/),
        strong: (/^(?=.*[A-Z])(?=.*[@#$&])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/),
    },
    phoneNumber: (/^(\+98|0)?9\d{9}$/),
    homeNumber: (/^(\+98|0)?\d{10}$/),
    nubmerCodes: (/^[0-9]{10}$/),
}

//#region Regex Tester Founction
const singleLevelValidator = (regex, value) => {
    if (regex.test(value)) {
        return true
    } else {
        return false
    }
}

const passwordSingleLevelValidator = (regex, value) => {
    if (regex.test(value)) {
        localStorage.setItem("password", value)
        return true
    } else {
        return false
    }
}

const passwordStrengthTest = (regex, value) => {
    const { weak, medium, strong } = regex;

    if (strong.test(value)) {
        localStorage.setItem("password", value)
        return "strong"
    } else if (medium.test(value)) {
        localStorage.setItem("password", value)
        return "medium"
    } else if (weak.test(value)) {
        return "weak"
    }
}

const confirmPassValidate = (value) => {

    const passValue = localStorage.getItem("password");

    if (passValue === value) {
        localStorage.removeItem("password")
        return true
    } else {
        return false
    }
}
//#endregion


const validatorHandler = (type, value, passStrongTest = false) => {

    let result = {
        Isvalid: false,
        type: type,
        passwordStrong: null
    };

    let regexType;

    //#region Check single Level validation or else
    if (type != "password" && type != "confirmPassword") {
        regexType = "singleLevel"
    } else if (type == "password") {
        regexType = "password"
    } else if (type == "confirmPassword") {
        regexType = "confirmPassword"
    }
    //#endregion


    if (passStrongTest) {

        switch (regexType) {
            case "singleLevel": (singleLevelValidator(regex[type], value)) ? result.Isvalid = true : result.Isvalid = false;

                break;

            case "password": ((passwordStrengthTest(regex[type], value)) != "weak") ? result.Isvalid = true : result.Isvalid = false; result.passwordStrong = passwordStrengthTest(regex[type], value);

                break;

            case "confirmPassword": (confirmPassValidate(value)) ? result.Isvalid = true : result.Isvalid = false;

                break;


            default:
                break;
        }

    } else {
        switch (regexType) {
            case "singleLevel": (singleLevelValidator(regex[type], value)) ? result.Isvalid = true : result.Isvalid = false;

                break;

            case "password": (passwordSingleLevelValidator(regex.password.strong, value)) ? result.Isvalid = true : result.Isvalid = false;

                break;

            default:
                break;
        }


    }

    return result
}

export const errorHandler = (type, value, passStrongTest = false, errors) => {

    let validateState = validatorHandler(type, value, passStrongTest);
    let error;
    let regexType;


    //#region Check single Level validation or else
    if (type != "password" && type != "confirmPassword") {
        regexType = "singleLevel"
    } else if (type == "password") {
        regexType = "password"
    } else if (type == "confirmPassword") {
        regexType = "confirmPassword"
    }
    //#endregion


    if (passStrongTest) {
        switch (regexType) {
            case "singleLevel": error = errors[type];
                break;
            case "password": error = errors[type][validateState.passwordStrong];
                break;
            default:
                break;
        }
    } else {
        switch (regexType) {
            case "singleLevel": error = errors[type] ;

                break;

            case "password":error = errors[type]["strong"];

                break;

            default:
                break;
        }
    }

    return error;
}