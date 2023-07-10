const firebaseConfig = {
    apiKey: "AIzaSyAytnM6WeieScJr9rRbdil1GX658xU9hko",
    authDomain: "jsproject-a884f.firebaseapp.com",
    databaseURL: "https://jsproject-a884f-default-rtdb.firebaseio.com",
    projectId: "jsproject-a884f",
    storageBucket: "jsproject-a884f.appspot.com",
    messagingSenderId: "373928343233",
    appId: "1:373928343233:web:622f0699114464ff198640",
    measurementId: "G-0WMJ51LDK8"
  };

firebase.initializeApp(firebaseConfig)


function randomID(){
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c){
      let r = (Math.random() * 16) | 0;
      let v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
    )
  }


  function generateItem(ID, value){
    return { 
        id: ID,
        data: value
    }
  }

  function addElementInFirebase(REF, data){
    firebase.database().ref(`${REF}/${randomID()}`).set(data)
  }

  

 
  function getElement(REF){
    let array = [];
    firebase.database().ref(REF).on("value",(response) =>{
        response.forEach((element) => {
            array.push(generateItem(element.key, element.val()))
        });
    })
    return array
  };

  
function getElementFromArray(REF,ID){
  const array = getElement(REF)
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      array.forEach((element)=>{
        if(element.id === ID){
          resolve(element)
        }else{
          reject("404")
        }
      })
    },1000)
  })
}

function Update(REF, ID){
  firebase.database().ref(`${REF}/${ID}`).set(data)
}

function deleteItem(REF, ID){
  firebase.database().ref(`${REF}/${ID}`).remove()
  }

function deleteREF(REF){
  firebase.database().ref(REF).remove()
}