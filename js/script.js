import {errorHandler} from './validation'

const myInput = document.querySelectorAll("Input");

const errors = {
    email: "ایمیل نا معتبر است",
    password: {
        weak: "رمز وارد شده ضعیف است",
        medium: "رمز وارد شده متوسط است",
        strong: "رمز وارد شده قوی است",
    },
    confirmPassword: "رمز وارد شده مطابقت ندارد",
    phoneNumber: "شماره همراه نا معتبر است",
    homeNumber: "شماره منزل نا معتبر است",
    nationalCode: "کد ملی نا معتبر است",
    postCode: "کد پستی نا معتبر است",
}

myInput[0].addEventListener("keyup",()=>{
  console.log(errorHandler(myInput[0].getAttribute("name"),myInput[0].value,true,errors));
})
