function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Element du DOM Elements
//l'ensemble du formulaire (la page du formulaire)
const modalbg = document.querySelector(".bground"); // permet de recuperer l'element de la class .bground
//btn je m'inscrid
const modalBtn = document.querySelectorAll(".modal-btn");
//tous les elements du formulaire
const formData = document.querySelectorAll(".formData");
// création de la constante spanClose pour fermer la modale (Todo 1)
const spanClose = document.querySelectorAll(".close"); 

// launch modal event  (charger l'evement modal au niveau du btn)
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // pour chaque btn contenu dans la class modal-btn on va lui ajouter un ecouteur d'evenement sur l'evenement click et lui demander de lancer la fonction launchModal lorsqu'un click est detecté

// launch modal form (declaration fonction launchModal)
function launchModal() {
  modalbg.style.display = "block"; // prend la class bgroung et modifit le style et plus particulierement le display en none dans le fichier css
  }
 
// close modal event
spanClose.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
const submit = document.querySelector(".btn-submit"); // création de la constante submit (Todo 2)

submit.addEventListener("click", submitValid); // a l'evenement click lance la fonction submitValid

function submitValid() {
  console.log("étape 1 :valider le prenom") 
  var saisiePrenom = document.getElementById("first").value;
 
  if (saisiePrenom == "" ||  saisiePrenom.length<= 2){
    alert("Veuillez saisir votre prénom")
    
  const inputPrenom  = document.querySelector("#first"); // devient rouge si ne rempli pas les conditions du formulaire
  inputPrenom.style.background ="red"

    }
// validation de nom
    console.log("étape 1 :valider le nom") 
    var saisieNom = document.getElementById("last").value;
   
    if (saisieNom == "" ||  saisieNom.length<= 2){
      alert("Veuillez saisir votre nom")
      
    const inputNom  = document.querySelector("#last"); // devient rouge si ne rempli pas les conditions du formulaire
    inputNom.style.background ="red"
  
  }
  //validation de l'adresse e-mail
  var saisieEmail = document.getElementById("email").value;
   if(checkEmail(saisieEmail) == false){
    alert("Veuillez saisir votre email")
    const inputEmail  = document.querySelector("#email"); // devient rouge si ne rempli pas les conditions du formulaire
    inputEmail.style.background ="red"
   }
// validation du nombre de concours
var saisieConcours = document.getElementById("quantity").value;
if(isNaN(saisieConcours)){
  alert(saisieConcours + " n'est pas un nombre" )
}
//validation du check sur les villes
var choixVille = false;

var checkVille = document.querySelectorAll(".checkbox-location");
checkVille.forEach((check) => choixVille = (check.checked || choixVille) );
alert(choixVille)
if (choixVille == false){
  alert("Veuillez saisir une ville")
}

// vérification si les conditions sont cochées
var checkConditions = document.querySelector("#checkbox1");
if(checkConditions.checked == false){
  alert("Merci de cocher les conditions")
}

}
//fonction de test d'email (regex = expression reguliere)
function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


