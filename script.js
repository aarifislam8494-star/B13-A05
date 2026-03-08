function checkUserInfo(){
    const signBtn = document.getElementById("signBtn");
    const inputUser = document.getElementById("inputUser").value;
    const inputPass = document.getElementById("inputPass").value;
    if (inputUser == 'admin' && inputPass == 'admin123') {
        signBtn.removeAttribute('disabled');
    } else {
        signBtn.setAttribute('disabled', true);
    }
}
document.getElementById('signBtn').addEventListener('click',()=>{
    alert('Login Successful!!')
    window.location.assign('issue.html')
})
document.getElementById('inputPass').addEventListener('keyup',checkUserInfo);
document.getElementById('inputUser').addEventListener('keyup',checkUserInfo);