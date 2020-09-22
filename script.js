

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    checkInput();
});

function checkInput() {

    // These variables prevent global leakage of memory

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const email = document.getElementById('email');
    const passwordTwo = document.getElementById('password-check');

    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const passwordTwoVal = passwordTwo.value.trim();

    const usernameRegex = /^(\w)[.](\w+)$/;
    const usernameTest = usernameRegex.test(usernameVal);


    // Should contain 
    // -- at least a lowercase, 
    // -- an uppercase, 
    // -- special character like: !.?, 
    // -- at least a number
    // Min length is 8 
    
    
    /* - Regex explanation 

       -- We use Positive lookahead to check for all the constraints for a strong 
       -- password validation

    */
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
    const passwordValidation = passwordRegex.test(passwordVal);

    (usernameVal === '') ? setErrorFor(username, 'Username cannot be blank')
    : (!usernameTest) ? setErrorFor(username, 'Should consist of a letter followed by a period')
    : (usernameVal.length <= 5) ? setErrorFor(username, 'username length should be greater than 5')
    : setSuccessFor(username);

    (emailVal === '') ? setErrorFor(email, 'Email cannot be blank')
    : (!isEmail(emailVal)) ? setErrorFor(email, 'Email is not valid')
    : setSuccessFor(email);

    (passwordVal === '') ? setErrorFor(password, 'Password cannot be blank')
    : (!passwordValidation) ? setErrorFor(password, 'Must: one lowercase,uppercase,digit,special char')
    : (passwordVal.length <= 8) ? setErrorFor(password, 'password length should be greater than 8')
    : setSuccessFor(password);

    (passwordTwoVal === '') ? setErrorFor(passwordTwo, 'Password cannot be blank')
    : (passwordVal !== passwordTwoVal) ? setErrorFor(passwordTwo, 'Password does not match')
    : setSuccessFor(passwordTwo);

}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}


function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}
