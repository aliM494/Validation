import ValidationHandler from '/js/validation.js'

const myInput = document.querySelectorAll("Input");

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

for (let i = 0; i < myInput.length; i++) {

  myInput[i].addEventListener("keyup", () => {

    console.log(ValidationHandler(errors, myInput[i].getAttribute("name"), myInput[i].value, true));

  })

}

