/**
 * Switch to login page
 */
$('#toLoginFP').click(function(e) {
    e.preventDefault();
    $('#registerContainer').hide();
    $('#loginContainer').hide();
    $('#fingerprintLoginContainer').show();
});

/**
 * Switch to login password page
 */
$('#toLoginPwd').click(function(e) {
    e.preventDefault();
    $('#registerContainer').hide();
    $('#loginContainer').hide();
    $('#passwordLoginContainer').show();
});

$('#passwordLoginButton').click(function(e) {
    e.preventDefault();
    var loginname = $('#passwordlogin').find('input[type="text"]')[0].value;
    $('#registerContainer').show();
    $('#registerContainer').find('input[type="text"]')[0].value = loginname;
    $('#registerContainer').find('input[type="text"]')[1].value = loginname;
    $('#registerContainer').find('label[name="loginname"]')[0].innerText = 'Welcome ' + loginname + '!';
    $('#loginContainer').hide();
    $('#passwordLoginContainer').hide();
});

/**
 * Switch to registration page
 */
$('#toRegistration').click(function(e) {
    e.preventDefault();
    $('#loginContainer').hide();
    $('#registerContainer').show();
});

let loadMainContainer = () => {
    return fetch('/personalInfo', { credentials: 'include' })
        .then((response) => response.json())
        .then((response) => {
            if (response.status === 'ok') {
                $('#theSecret').html(response.theSecret);
                $('#name').html(response.name);
                $('#registerContainer').hide();
                $('#fingerprintLoginContainer').hide();
                $('#passwordLoginContainer').hide();
                $('#loginContainer').hide();
                $('#mainContainer').show();
            } else {
                alert(`Error! ${response.message}`);
            }
        });
};

let checkIfLoggedIn = () => {
    return fetch('/isLoggedIn', { credentials: 'include' })
        .then((response) => response.json())
        .then((response) => {
            if (response.status === 'ok') {
                return true;
            } else {
                return false;
            }
        });
};

$('#logoutButton1').click(() => {
    logout();
});

$('#logoutButton2').click(() => {
    logout();
});

function logout() {
    fetch('/logout', { credentials: 'include' });
    // alert('logout clicked');

    $('#mainContainer').hide();
    $('#registerContainer').hide();
    $('#loginContainer').show();
}
