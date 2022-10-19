const btnLogar = document.querySelector("#btnLogar")
const intUser = document.querySelector("#user")
const intPass = document.querySelector("#pass")
const errorUser = document.querySelector("#errorUser")
const errorPass = document.querySelector("#errorPass")
const certoUser = document.querySelector("#certoUser")



btnLogar.addEventListener("click", event => {
    event.preventDefault()

    validInput()
    if (intUser.value != "" & intPass.value != "")
    {
        window.location.href = '/src/assets/routes/home.php'
    }
    
})



function validInput()
{
    if (intUser)
{
    if (intUser.value == "") {
        certoUser.className = 'certo'
        errorUser.className = 'error1'
    }
    else
    {
        errorUser.className = 'error'
        certoUser.className = 'certo1'
        
    }
}

    if (intPass) 
{
    if (intPass.value == "") {
        certoPass.className = 'certo'
        errorPass.className = 'error1'
    }
    else
    {
        errorPass.className = 'error'
        certoPass.className = 'certo1'
    }  
}
}