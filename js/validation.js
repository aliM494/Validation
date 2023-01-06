const regex = {
    email: (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: {
        medium: (/^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/),
        strong: (/^(?=.*[A-Z])(?=.*[@#$&])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/),
    },
    phoneNumber: (/^(\+98|0)?9\d{9}$/),
    homeNumber: (/^(\+98|0)?\d{10}$/),
    nubmerCode: (/^[0-9]{10}$/),
}

const npv = (value, type, mr = null) => { //Validation of every field except password || npv => Not Password Validation || mr => Manual regex
    if (mr) {
        if (regex[mr].test(value)) {
            return true;
        } else {
            return false;
        }
    } else {
        if (regex[type].test(value)) {
            return true;
        } else {
            return false;
        }
    }
}

const pv = (pmlv = false, value) => {  //pmlv => Password multi level validation || pv => Password Validation

    let status = {
        strong: "weak",
        valid: false
    }

    const { medium, strong } = regex.password;

    if (pmlv) {

        if (strong.test(value)) {
            status = {
                strong: "strong",
                valid: true
            }

            localStorage.setItem("password", value)
            return status;

        } else if (medium.test(value)) {
            status = {
                strong: "medium",
                valid: true
            }

            localStorage.setItem("password", value)
            return status;
        } else {
            status = {
                strong: "weak",
                valid: false
            }

            return status;
        }

    } else {
        if (strong.test(value)) {
            status.valid = true;

            localStorage.setItem("password", value)
            return status;
        } else {
            return status;
        }
    }

}

const cpv = (value) => {  //Confirm Password validation

    const password = (localStorage.getItem("password") !== null) ? localStorage.getItem("password") : null;

    if (value === password) {


        localStorage.removeItem("password");
        return true;

    } else {
        return false;
    }

}

const pvh = (value, pErrors) => { //Password validation handler

    let status = {
        valid: false,
        error: "",
        passwordStatus: null
    }

    const result = pv(true, value);
    const { valid, strong } = result;

    status = {
        valid: valid,
        error: pErrors[strong],
        passwordStatus: result
    }

    return status;
}

const rth = (inputType) => { //Regex type handler

    const type = (inputType.includes("Code")) ? "nubmerCode" : inputType;

    let regexType;

    switch (type) {
        case "password": regexType = "pv"; break;
        case "confirmPassword": regexType = "cpv"; break;
        case "nubmerCode": regexType = "nc"; break;
        default: regexType = "npv"; break;
    }

    return regexType
}

const ValidationHandler = (errors, type, value, pmlv = false) => { //Password validation type
    let status = {
        valid: false,
        error: "",
        passwordStatus: null
    }

    let regexType = rth(type);

    if (pmlv) {
        switch (regexType) {
            case "pv": status = pvh(value, errors["password"])

                break;

            case "cpv": (cpv(value)) ? status.valid = true : status = { valid: false, error: errors[type] }

                break;

            case "nc": (npv(value, type, "nubmerCode")) ? status.valid = true : status = { valid: false, error: errors[type] }

                break;

            default: (npv(value, type)) ? status.valid = true : status = { valid: false, error: errors[type] }

                break;
        }
    } else {
        switch (regexType) {
            case "pv": (pv(false, value).valid) ? status = { valid: true, error: "" } : status = { valid: false, error: errors["password"]["normal"] }

                break;

            case "cpv": (cpv(value)) ? status = { valid: true, error: "" } : status = { valid: false, error: errors[type] }

                break;

            default: (npv(value, type)) ? status = { valid: true, error: "" } : status = { valid: false, error: errors[type] }

                break;
        }
    }

    return status;


}

export default ValidationHandler;