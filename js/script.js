import ValidationHandler from "/js/validation.js";

const Form = document.forms["register"];
const FormInpots = document.forms["register"].getElementsByTagName("input")

const errors = {
  email: "ایمیل نا معتبر است",
  password: {
    normal: "رمز وارد شده نا معتبر است",
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

for (let i = 0; i < FormInpots.length; i++) {

  FormInpots[i].addEventListener("keyup", () => {

    console.log(ValidationHandler(errors, FormInpots[i].getAttribute("name"), FormInpots[i].value, true));



  })
}