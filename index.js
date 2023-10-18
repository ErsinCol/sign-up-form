const passwordEl = document.getElementById("user-password");
const confirmPasswordEl = document.getElementById("confirm-password");
const errorMessageEl = document.querySelector(".error-msg");
const phoneNumberEl = document.getElementById("user-phone");
const mailInputEl = document.getElementById("user-mail");
const firstNameInputEl = document.getElementById("first-name");
const lastNameInputEl = document.getElementById("last-name");
const formEl = document.querySelector("form");
const toastWarningEl = document.getElementById("toast-warning");

function validatePassword(){
    const passwordsMatch = passwordEl.value === confirmPasswordEl.value;
    const isValid = passwordsMatch && passwordEl.value.length > 0;

    errorMessageEl.classList.toggle("visible", !isValid && confirmPasswordEl.value.length > 0);
    confirmPasswordEl.classList.toggle("error", !passwordsMatch && confirmPasswordEl.value.length > 0);
    confirmPasswordEl.classList.toggle("valid", isValid && passwordsMatch);
    passwordEl.classList.toggle("valid", isValid);

    return isValid;
}

function validatePhoneNumber(){
    const phoneNoPattern = /^\d{10}$/;
    const isValid = phoneNumberEl.value.match(phoneNoPattern);

    if(!phoneNumberEl.value){
        phoneNumberEl.classList.remove("invalid", "valid");
        return;
    }

    phoneNumberEl.classList.toggle("invalid", !isValid);
    phoneNumberEl.classList.toggle("valid", isValid);

    return isValid;
}

function validateMail(){
    const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = mailInputEl.value.match(mailPattern);

    if(!mailInputEl.value){
        mailInputEl.classList.remove("invalid", "valid");
        return;
    }

    mailInputEl.classList.toggle("invalid", !isValid);
    mailInputEl.classList.toggle("valid", isValid);

    return isValid;
}

function allLetterFirstName(){
    const lettersPattern = /^[A-Za-z]+$/;
    const isValid = firstNameInputEl.value.match(lettersPattern);

    if(!firstNameInputEl.value){
        firstNameInputEl.classList.remove("invalid", "valid");
        return;
    }

    firstNameInputEl.classList.toggle("invalid", !isValid);
    firstNameInputEl.classList.toggle("valid", isValid);

    return isValid;
}

function allLetterLastName(){
    const lettersPattern = /^[A-Za-z]+$/;
    const isValid = lastNameInputEl.value.match(lettersPattern);

    if(!lastNameInputEl.value){
        lastNameInputEl.classList.remove("invalid", "valid");
        return;
    }

    lastNameInputEl.classList.toggle("invalid", !isValid);
    lastNameInputEl.classList.toggle("valid", isValid);

    return isValid;
}

confirmPasswordEl.addEventListener("input", validatePassword);
passwordEl.addEventListener("input", ()=>{
    if(confirmPasswordEl.value) validatePassword();
})

function clearFormInputs() {
    firstNameInputEl.value = '';
    lastNameInputEl.value = '';
    mailInputEl.value = '';
    phoneNumberEl.value = '';
    passwordEl.value = '';
    confirmPasswordEl.value = '';
}

function removeValidationClasses() {
    firstNameInputEl.classList.remove('valid');
    lastNameInputEl.classList.remove('valid');
    mailInputEl.classList.remove('valid');
    phoneNumberEl.classList.remove('valid');
    passwordEl.classList.remove('valid');
    confirmPasswordEl.classList.remove('valid');
}

function closeToast(){
    toastWarningEl.classList.remove("show");
}

formEl.addEventListener("submit", (e)=>{
    e.preventDefault();

    if(
        allLetterFirstName() &&
        allLetterLastName() &&
        validateMail() &&
        validatePhoneNumber() &&
        validatePassword()
    ){
        const params = new URLSearchParams();
        params.append("first-name", firstNameInputEl.value);
        params.append("last-name", lastNameInputEl.value);
        params.append("mail", mailInputEl.value);
        params.append("phone-number", phoneNumberEl.value);
        params.append("password", passwordEl.value);

        const queryString = params.toString();
        const url = `your-server-endpoint?${queryString}`

        console.log(url);

        clearFormInputs();
        removeValidationClasses();
    }else{
        toastWarningEl.classList.add("show");
        setTimeout(function (){
            toastWarningEl.classList.remove("show")
        }, 3000)
    }
})


