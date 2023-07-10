const log = document.querySelector("#log")
const reg = document.querySelector("#reg")
const aslog = document.querySelector("#aslog")
const asreg = document.querySelector("#asreg")


const url = location.href;
const locaL = url.split("/").pop().split(".")[0];

if(userAuth()){
if(locaL === "index"){
    location.href = "UserPage.html"
}
}

console.log(url)

function userAuth(){
    let userData = localStorage.getItem('curent_user_data');
    let userId = localStorage.getItem('current_user_id')
    if(userData && userId){
        let userObj = JSON.parse(userData);
        if(userObj.name && userObj.last && userObj.password && userObj.email){
            if(userId.length === 36 && userId[14] === "4"){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }else{
        localStorage.removeItem("current_user_id"),
        localStorage.removeItem("curent_user_data")
        return false
    }
}




reg.addEventListener("click",()=>{
    aslog.style.display = "none"
    asreg.style.display = "grid"
})

log.addEventListener("click",()=>{
    asreg.style.display = "none"
    aslog.style.display = "grid"
})

logOut.addEventListener("click",()=>{
    console.log("adskn")
    localStorage.removeItem("current_user_id"),
    localStorage.removeItem("curent_user_data")
    location.href = "index.html"
 })

