let menu = document.querySelector("#menu")
let accOpen = document.querySelector("#acc-open")
let clickChat = document.querySelector("#clickChat")
let chatOpen = document.querySelector("#chatOpen")
let close = document.querySelector("#closeChat")
let chatText = document.querySelector(".cht-text")
let displayCHAT = document.querySelector("#displayCHAT")
let sendMess = document.querySelector("#sendMess")
let userIDD = localStorage.getItem('current_user_id')
let count = 0
// let uImg = document.querySelector("#uImg")
let UD = localStorage.getItem('curent_user_data')
let user = getElement("User")




sendMess.addEventListener("click",()=>{
    createMessege()
    chatText.value = ""
})

chatText.addEventListener("keypress",(event)=>{
    if(event.code === "Enter"){
        createMessege()
        count++
        // displayCHAT.innerHTML += ``
        chatText.value = ""
    }
})

menu.addEventListener("click",()=>{
if(accOpen.style.display == "none"){
    accOpen.style.display = "grid"
    accOpen.style.height = "150px"
    accOpen.style.transition = "5s"
}else{
    accOpen.style.display = "none"
}
})

clickChat.addEventListener("click",()=>{
    chatOpen.style.display = "grid"
    chatOpen.style.bottom = "0"
   setTimeout(()=>{
    clickChat.style.display = "none"
   },200)
})

closeChat.addEventListener("click",()=>{
    chatOpen.style.display = "none"
    chatOpen.style.bottom = "-100%"
    // if(chatOpen.style.bottom == "0"){
    //     chatOpen.style.bottom = "-100%"
    // }
    clickChat.style.display = "flex"
})




function createMessege(){
    const UserMessage =  chatText.value;
    const currentUserData = localStorage.getItem("curent_user_data") ;
    if(chatText.value !== "" ){
       addElementInFirebase("message",{
            Name: JSON.parse(currentUserData).name|| localStorage.getItem('current_user_id'),
            last: JSON.parse(currentUserData).lasName,
            message: UserMessage,
            id: userIDD,
            date: Date().split("Wed").pop().split("GMT")[0]
        })
    }
}

firebase.database().ref("message").on("child_added", (snapshot)=>{
    if(snapshot.val().id === userIDD){
        displayCHAT.innerHTML += `
        <div class="User">
        <h1><img class="i" id="MessID_${snapshot.key}" src="" alt="">${snapshot.val().Name} ${snapshot.val().last} <i onClick="removeMess('${snapshot.key}')" class="fa-solid fa-trash"></i> </h1>
        <span>${snapshot.val().message}</span>
        <p>${snapshot.val().date}</p>
      </div>
        `
        let MID = document.querySelector(`#MessID_${snapshot.key}`)
       user.forEach((element)=>{
        if(element.id === snapshot.val().id){
            MID.src = element.data.img
            count++
        }
       })
    }else{
        displayCHAT.innerHTML += `
        <div class="another" >
        <h1><img class="i" id="MessID_${snapshot.key}" src="" alt="">${snapshot.val().Name} ${snapshot.val().last}</h1>
        <span>${snapshot.val().message}</span>
        <p>${snapshot.val().date}</p>
      </div>
        `
        let MessID = document.querySelector(`#MessID_${snapshot.key}`)
        user.forEach((element)=>{
            if(element.id === snapshot.val().id){
                MessID.src = element.data.img
            }
           })
    }

})


let curUsData = localStorage.getItem("curent_user_data")

UN.textContent = JSON.parse(curUsData).name
UL.textContent = JSON.parse(curUsData).lasName


let uImg = document.querySelector("#uImg")


firebase.database().ref("User").on("value", (response) => {
    response.forEach((element) => {
      if (element.key === IDD) {
        uImg.src = element.val().img;
      }
    });
  });


function removeMess(id){
            deleteItem("message",id)
            location.reload()
}

  
   


