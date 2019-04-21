
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBFqb2p8N_rHMMyuwrRR2A-Syy6QXHfdwY",
    authDomain: "desafiouno-450ef.firebaseapp.com",
    databaseURL: "https://desafiouno-450ef.firebaseio.com",
    projectId: "desafiouno-450ef",
    storageBucket: "desafiouno-450ef.appspot.com",
    messagingSenderId: "843200397294"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar documentos 
function guardar(){
    
    let comment = document.getElementById('comment').value;

    db.collection('users').add({
        name: name,
        comment: comment
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        
        document.getElementById('comment').value = "";
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
};

//leer documentos
let tabla= document.getElementById('tabla');
db.collection('users').onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().comment}`);
        tabla.innerHTML += `
        <tr>
            
            <td>${doc.data().comment}</td>
            <td><button class="btn btn-danger" onClick="eliminar('${doc.id}')">Eliminar</button></td>
            </tr>
        <tr> 
        
        `
    });
});

//borrar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}