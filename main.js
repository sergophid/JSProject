
const logBtn = document.querySelector("#logBtn")
const logEM =  document.querySelector("#logEM")
const logPas = document.querySelector("#logPas")
const regEM = document.querySelector("#RegEM")
const regNAME = document.querySelector("#RegNAME")
const regLAST = document.querySelector("#RegLAST")
const regPas = document.querySelector("#RegPas")
const CTP = document.querySelector("#CTP")
const regBtn = document.querySelector("#RegBtn")
const userArray = getElement("User")
let userName = document.querySelector("#name")
let userLastName = document.querySelector("#last")
let logOut = document.querySelector("#logOut")
let UN =document.querySelector(".UN")
let UL = document.querySelector(".UL")
let SHP = document.querySelector("#SHP")
let SHPS = document.querySelector("#SHPS")
let SHPT = document.querySelector("#SHPT")
let allPosts = document.querySelector("#allPosts")
let Cp = document.querySelector("#CP")
let IDD = localStorage.getItem('current_user_id')
let postID = getElement("Posts")
let UserD = localStorage.getItem('curent_user_data')
let allUsers = getElement("User")





function removePost(id){
      deleteItem("Posts", id)
      alert("are you sure you want to delete the post")
      location.reload()
}


firebase.database().ref("Posts").on("child_added",(snapshot)=>{
        allPosts.innerHTML += `
        <div class="cardD"" >
<div class="img" >
<img class="cimg" src="${snapshot.val().img}" class="card-img-top" alt="...">
</div>
<div class="card-body">
<p class="card-name"><img class="pic" id="posterImg_${snapshot.key}"  src="" alt="">${snapshot.val().posterName} ${snapshot.val().posterLastName} :</p>
<h5>${snapshot.val().PosterSubject}</h5>
<p class="card-text">${snapshot.val().posterText}</p>
<p class="pt" >${snapshot.val().time}</p>
</div>
</div>
        `;
    let g = document.querySelector(`#posterImg_${snapshot.key}`)
    allUsers.forEach((element)=>{
        if(element.id === snapshot.val().id){
            g.src = element.data.img
        }
    })
})


SHPS.addEventListener("click",()=>{
    if(regPas.type == 'password'){
        regPas.type = 'text'
    }else{
        regPas.type = 'password'
    }
})

    SHP.addEventListener("click",()=>{
       if(logPas.type == 'password'){
        logPas.type = 'text'
       }else{
        logPas.type = 'password'
       }
    })

    SHPT.addEventListener("click",()=>{
        if(CTP.type === 'password'){
            CTP.type = 'text'
        }else{
            CTP.type = 'password'
        }
    })


regBtn.addEventListener("click",()=>{
signUP()
})

function signUP(){
    nameR = regNAME.value
    lastR = regLAST.value
    emailR = regEM.value
    passwordR = regPas.value
if(emailR === "" || lastR === "" || nameR === "" || passwordR === ""){
    alert("fill every value")
}


if(!emailR.includes("@")){
    alert("Invalid email address")
}else if(CTP.value !== passwordR){
    alert("Passwords didn't match")
    CTP.style.border = "1px dashed red"
    }else{
    addElementInFirebase("User",{nameR, lastR , passwordR, emailR,})
alert("the user succesfully registered")
}

userArray.forEach((element)=>{
    if(element.data.email === emailR){
        alert("email address already exists")
 
    }
})

}


logBtn.addEventListener("click",()=>{
LogIn()
})

function LogIn(){
if(logEM.value === ""){
    alert("fill every value")
    logEM.style.border = "1px dashed red"
}else if( logPas.value === ""){
alert("Fill every value")
logPas.style.border = "1px dashed red"
}

let currentIndex = userArray.findIndex((User)=> User.data.emailR === logEM.value && User.data.passwordR === logPas.value  )

if(currentIndex === -1){
    alert("not correct Email or password")
    return;
}


let currentUserData = userArray[currentIndex]
localStorage.setItem('current_user_id', currentUserData.id)
localStorage.setItem('curent_user_data', JSON.stringify({
    name: currentUserData.data.nameR,
    lasName: currentUserData.data.lastR,
    email: currentUserData.data.emailR,
    password: currentUserData.data.passwordR,
}))
setTimeout(()=>{
    location.href = "UserPage.html"
},1500)

}
















