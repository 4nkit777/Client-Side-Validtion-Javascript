const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const passwordTwo = document.getElementById('password-check');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInput();
});

function checkInput() {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const passwordTwoVal = passwordTwo.value.trim();

    const usernameRegex = /^(\w)[.](\w+)$/;
    const usernameTest = usernameRegex.test(usernameVal);

    // Should contain an uppercase, lowercase, !.?, numbers
    // const passwordRegex = //; 

    // (usernameVal === '') ? setErrorFor(username, 'Username cannot be blank') : setSuccessFor(username);
    // follow a.bc67 or A.BC67
    (usernameVal === '') ? setErrorFor(username, 'Username cannot be blank')
    : (!usernameTest) ? setErrorFor(username, 'Should consist of a letter followed by a period')
    : (usernameVal.length <= 5) ? setErrorFor(username, 'username length should be greater than 5')
    : setSuccessFor(username);

    (emailVal === '') ? setErrorFor(email, 'Email cannot be blank')
    : (!isEmail(emailVal)) ? setErrorFor(email, 'Email is not valid')
    : setSuccessFor(email);

    (passwordVal === '') ? setErrorFor(password, 'Password cannot be blank') : setSuccessFor(password);

    if(passwordTwoVal === '') {
        setErrorFor(passwordTwo, 'Password cannot be blank');
    } else if(passwordVal !== passwordTwoVal) {
        setErrorFor(passwordTwo, 'Passwords does not match');
    } else {
        setSuccessFor(passwordTwo);
    }
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
