let changeIMG = document.querySelector("#changeIMG")
let addIMG = document.querySelector("#addIMG")
let usID = localStorage.getItem('current_user_id')
let usData = localStorage.getItem('curent_user_data')
let UserDataa = getElement("User")
let UsIMG = document.querySelector("#Usimg")
let MP = document.querySelector(".MP")


changeIMG.addEventListener("click",()=>{
    ssom()
    console.log("gkjhh")
})

function ssom(){
        const reader = new FileReader()
        reader.readAsDataURL(addIMG.files[0])
        reader.onload = () =>{
            let img = {img:reader.result}
           firebase.database().ref("User").on("value",(response)=>{
            response.forEach((element)=>{
                if(element.key === usID){
                    element.ref.update(img)
                }
            })
           })
            }
}

firebase.database().ref("User").on("value", (response) => {
    response.forEach((element) => {
      if (element.key === usID) {
        UsIMG.src = element.val().img;
      }
    });
  });



    firebase.database().ref("Posts").on("child_added",(snapshot)=>{
        if(snapshot.val().id === usID){
            MP.innerHTML += `
            <div class="cardD"" >
            <div class="img" >
            <img class="cimg" src="${snapshot.val().img}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
            <p class="card-name"><img class="pic"  id="posterImg" src="" alt="">${snapshot.val().posterName} ${snapshot.val().posterLastName} :</p>
            <h5>${snapshot.val().PosterSubject}</h5>
            <p class="card-text">${snapshot.val().posterText}</p>
            <p class="pt" >${snapshot.val().time}</p>
            <p class="remove-post" onClick="removePost('${snapshot.key}')" >Delete <i class="fa-solid fa-trash"></i></p>
            </div>
            </div>
                    `;
                    let p = document.querySelector("#posterImg")
                    UserDataa.forEach((element) => {
                        if(element.id === snapshot.val().id){
                            p.src = element.data.img
                        }
                    });
        }
    })
 
