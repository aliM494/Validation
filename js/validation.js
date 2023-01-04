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

export const errorHandler = () => {
    return regex;
}