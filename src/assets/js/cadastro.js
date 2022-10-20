const nameUser = document.querySelector("#name")
const emailUser = document.querySelector("#email")
const passUser = document.querySelector("#password")
const passCuser = document.querySelector("#confirmpassword")
const btn = document.querySelector(".btn-cadastrar")

let validou = false

const url = "https://brive-back-end.vercel.app/auth/register"


btn.addEventListener("click", event => {
    event.preventDefault()


    const newUser = {
        name: nameUser.value,
        email: emailUser.value,
        password: passUser.value,
        confirmpassword: passCuser.value
    }
    
    //validInput()
    addNewUser(url, newUser)
    window.location.href = '/index.html'
})

function addNewUser(url,newUser) {
    axios.post(url, newUser)
    .then((result) => {
        alert(JSON.stringify(result.data))
    }).catch((error) => {
        console.log(error);
    });
}


