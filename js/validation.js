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
            return status;

        } else if (medium.test(value)) {
            status = {
                strong: "medium",
                valid: true
            }
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

const cpv = (value, password) => {  //Confirm Password validation
    if (value === password) {
        return true;
    } else {
        return false;
    }

}

const pvh = (regType, value, errors) => { //Password validation handler

    let status = {
        valid: false,
        error: "",
        passwordStatus: null
    }

    if (regType === "pv") {
        const { valid, strong } = pv(true, value);

        localStorage.removeItem("password");

        if (valid) {
            localStorage.setItem("password", value);
        }

        status = {
            valid: valid,
            error: errors[strong],
            passwordStatus: strong
        }
    } else {

        const password = localStorage.getItem("password");

        const valid = cpv(value, password);

        if (!valid) {
            status = {
                valid: valid,
                error: errors
            }
        } else {
            status.valid = valid
        }


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
            case "pv": status = pvh(regexType, value, errors["password"])

                break;

            case "cpv": status = pvh(regexType, value, errors["confirmPassword"])

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