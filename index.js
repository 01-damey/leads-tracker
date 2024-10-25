import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getDatabase,
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const firebaseConfig = {
    databaseURL : "https://leads-tracker-6e401-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refrenceInDB = ref(database, "Leads")


const inputEL = document.getElementById("input");
const buttonEL = document.getElementById("button");
const displayEL = document.getElementById("display");
const buttondelEL = document.getElementById("button-del");

buttondelEL.addEventListener("dblclick", function(){
    remove(refrenceInDB)
    displayEL.innerHTML = ""
})

onValue(refrenceInDB, function(snapshot){
    const snapshotStatus = snapshot.exists()
    if (snapshotStatus){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

buttonEL.addEventListener("click", function(){
    push(refrenceInDB, inputEL.value);

    inputEL.value = "";
    
})

function render(leads){
    let listitems="";
    for(let i=0; i<leads.length; i++){
        listitems += "<li><a href='#' target='_blank'>" + leads[i] + "</a></li>";
        }
        displayEL.innerHTML = listitems;
}
