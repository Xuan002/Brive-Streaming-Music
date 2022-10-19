const nameUser = document.querySelector("#name")
const emailUser = document.querySelector("#email")
const passUser = document.querySelector("#password")
const passCuser = document.querySelector("#confirmpassword")
const btn = document.querySelector(".btn-cadastrar")


const url = "https://brive-back-end.vercel.app/auth/register"
const newUser = {
	name: nameUser.value,
	email: emailUser.value,
	password: passUser.value,
	confirmpassword: passCuser.value
}

btn.addEventListener("click", event => {
    event.preventDefault()

    //validInput()
    addNewUser()
    
    //window.location.href = './index.html'
})

function addNewUser() {
    axios.post(url, newUser)
    .then((result) => {
        alert(JSON.stringify(result.data))
    }).catch((error) => {
        console.log(error);
    });
}
