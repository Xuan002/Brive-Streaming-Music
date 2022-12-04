const btnLogar = document.querySelector("#btnLogar")
const intUser = document.querySelector("#user")
const intPass = document.querySelector("#pass")
const errorUser = document.querySelector("#errorUser")
const errorPass = document.querySelector("#errorPass")
const certoUser = document.querySelector("#certoUser")
const url = "https://brive-back-end.vercel.app/auth/login"


btnLogar.addEventListener("click", event => {
    event.preventDefault()
    const user = {
        email: intUser.value,
        password: intPass.value
    }
    //validInput()
    if (intUser.value != "" & intPass.value != "")
    {
        login(url,user)
        
    }
    
})

function login(url,user) {
    axios.post(url, user)
    .then((result) => {
        alert(JSON.stringify(result.data))
        window.location.href = '/src/assets/routes/home.html'
    }).catch((error) => {
        console.log(error);
        if (error.response.status == 422){
            if (error.response.status == 422) {
                certoPass.className = 'certo'
                errorPass.className = 'error1'
            }
            else
            {
                errorPass.className = 'error'
                certoPass.className = 'certo1'
                
            }
        }
        if(error.response.status == 404){
            if (error.response.status == 404) {
                certoUser.className = 'certo'
                errorUser.className = 'error1'
            }
            else
            {
                errorUser.className = 'error'
                certoUser.className = 'certo1'
                
            }
        }
    });
}
