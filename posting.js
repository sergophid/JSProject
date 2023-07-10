let subject = document.querySelector("#subject")
let img = document.querySelector("#img")
let text = document.querySelector("#text")
let btn = document.querySelector("#btn")
let userImg = document.querySelector("#UserIMG")
let btnIMG = document.querySelector("#btnIMG")
let CH = document.querySelector("#CH")
let count = 0
let label = document.querySelector(".sb")
let labelText = document.querySelector(".tx")
let cun = document.querySelector("#cUN")
let cul = document.querySelector("#cUL")
let cuid = document.querySelector("#cUid")
const curUsData = localStorage.getItem("curent_user_data")
let curentUserID = localStorage.getItem('current_user_id')



// let email = JSON.perse(curUsData).email




btn.addEventListener("click", () =>{
addPost()
alert("The post succesfully has been shared")
})

function addPost(){
    if(subject.value === ""){
        subject.style.border = "1px dashed red"
        label.style.color = "red"
    }else if( text.value === ""){
        text.style.border = "1px dashed red"
        labelText.style.color = "red"

    }else{
        subject.style.border = "0.1px solid silver"
        text.style.border = "0.1px solid silver"
        labelText.style.color = "transparent"
        label.style.color = "transparent"
    
        const som = subject.value
        const somTwo = text.value

        const reader = new FileReader()
        reader.readAsDataURL(img.files[0])
        reader.onload = () => {
            addElementInFirebase("Posts",{
                PosterSubject : som,
                posterText: somTwo,
                id: localStorage.getItem("current_user_id"),
                posterName: JSON.parse(curUsData).name,
                posterLastName: JSON.parse(curUsData).lasName,
                time: Date().split("Wed").pop().split("GMT")[0],
                img : reader.result
            })
        };
        subject.value = ""
        text.value = ""
//    location.href = "UserPage.html"
}}

cun.innerHTML += JSON.parse(curUsData).name,
cul.textContent += JSON.parse(curUsData).lasName,
cuid.textContent += JSON.parse(curUsData).email















