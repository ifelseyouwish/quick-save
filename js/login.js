let formContainer = document.getElementById("form-container");

let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");

let signupUsername = document.getElementById("signupUsername");
let signupPassword = document.getElementById("signupPassword");

// function para ipakita yung form container sa screen
function toForm(){
    formContainer.style.display = "block";
}

// hide natin yung form tapos reset natin yung mga nilagay na inputs
function closeForm() {

    signupUsername.value="";
    signupPassword.value="";
    document.getElementById("confirmPass").value ="";
    
    loginUsername.value="";
    loginPassword.value="";

    document.getElementById("checkUsers").style.display="none";
    document.getElementById("checkCreate").style.display="none";
    document.getElementById("confirmPass").style.outline="none";
    formContainer.style.display = "none";
}

// pag pinindot yung sign up, hide natin yung log in view
document.getElementById("toSignup").addEventListener("click", function(event) {
    event.preventDefault();

    document.getElementById("signin").style.display = "none"; 
    document.getElementById("signup").style.display = "block";

    loginUsername.value="";
    loginPassword.value="";

    document.getElementById("checkUsers").style.display="none";
    document.getElementById("checkCreate").style.display="none";
    document.getElementById("confirmPass").style.outline="none";
});

// pag pinindot yung log in, hide naman natin yung sign up view
document.getElementById("toLogin").addEventListener("click", function(event) {
    event.preventDefault();
    goLogin();
});

function goLogin(){
    signupUsername.value="";
    signupPassword.value="";
    document.getElementById("confirmPass").value ="";

    document.getElementById("checkUsers").style.display="none";
    document.getElementById("checkCreate").style.display="none";

    document.getElementById("signup").style.display = "none";
    document.getElementById("signin").style.display = "block";
}

document.addEventListener('input', ()=>{
    let password = document.getElementById("signupPassword").value;
    let confirmPass = document.getElementById("confirmPass").value;

    if(password == confirmPass && password !=""){
        document.getElementById("confirmPass").style.outline="1px solid green";
    }else if(confirmPass.length >= password.length && password !=""){
        document.getElementById("confirmPass").style.outline="1px solid red";
    }else{
        document.getElementById("confirmPass").style.outline="none";
    }
})


document.getElementById("Sign-up").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPass = document.getElementById("confirmPass").value;
    
    if(password == confirmPass){
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch('backend/signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {

            if (data.status === "success") {
                alert(data.msg);
                goLogin();
            } else {
                document.getElementById("checkCreate").style.display="block";
                document.getElementById("checkCreate").innerHTML=`${data.msg}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("aray ko po" + error.message + "\n\naray ko po");
        });
    }else{
        document.getElementById("checkCreate").style.display="block";
        document.getElementById("checkCreate").innerHTML=` Confirm password not match *`
    }
});



document.getElementById("Log-in").addEventListener("submit", function(event){
    event.preventDefault();

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let fD = new FormData();
    fD.append('username', username);
    fD.append('password', password);

    fetch('backend/login.php', {
        method: 'POST',
        body: fD
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(data => {
        if(data.status === "failed"){
            document.getElementById("checkUsers").style.display="block";
            document.getElementById("checkUsers").innerHTML = `${data.msg}`;
        }
        if(data.status === "success"){
            // alert(data.msg);
            window.location.href = "dashboard.php";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("aray ko po" + error.message + "\n\naray ko po");
    });
});


