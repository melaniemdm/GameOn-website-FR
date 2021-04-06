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
//tous les elements de classe .formData du formulaire
const formData = document.querySelectorAll(".formData");
// création de la constante spanClose pour fermer la modale (Todo 1)
const spanClose = document.querySelectorAll(".close"); 

// launch modal event  (charger l'evement modal au niveau du btn)
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // pour chaque btn contenu dans la class modal-btn on va lui ajouter un ecouteur d'evenement sur l'evenement click et lui demander de lancer la fonction launchModal lorsqu'un click est detecté

// launch modal form (declaration fonction launchModal)
function launchModal() {
  modalbg.style.display = "block"; // prend la class bgroung et modifit le style et plus particulierement le display en none dans le fichier css
  //recupere le storage

  if(sessionStorage.getItem("autosave")){   // test l'existance d'une sessionb storage
let getPrenom = document.querySelector("#first").value = sessionStorage.getItem("saisiePrenom");
let getNom = document.querySelector("#last").value = sessionStorage.getItem("saisieNom");
let getEmail = document.querySelector("#email").value = sessionStorage.getItem("saisieEmail");
let getConcours = document.querySelector("#quantity").value = sessionStorage.getItem("saisieConcours");

let getSaisieVille1 = document.querySelector("#location1").value = sessionStorage.getItem("saisieVille1");
let getSaisieVille2 = document.querySelector("#location2").value = sessionStorage.getItem("saisieVille2");
let getSaisieVille3 = document.querySelector("#location3").value = sessionStorage.getItem("saisieVille3");
let getSaisieVille4 = document.querySelector("#location4").value = sessionStorage.getItem("saisieVille4");
let getSaisieVille5 = document.querySelector("#location5").value = sessionStorage.getItem("saisieVille5");
let getSaisieVille6 = document.querySelector("#location6").value = sessionStorage.getItem("saisieVille6");

const colorError = "#fe142f"; //couleur de l'erreur

if(checkEmail(getEmail) == false){ // garder l'erreur de l'email au re-chargement
  const inputEmail  = document.querySelector("#email"); // devient rouge si ne rempli pas les conditions du formulaire
  inputEmail.style.background = colorError
 }

 var choixVille = false;
var checkVille = document.querySelectorAll(".checkbox-location");
checkVille.forEach((check) => choixVille = (check.checked || choixVille) );

if (choixVille == false){
  const selectVille  = document.querySelector(".selectVille");  
  selectVille.style.border = colorError + " 2px solid";
 }
}
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
  sessionStorage.setItem("autosave", true) // Pour créer la session storage
  let errorSubmit = false;
  const colorError = "#fe142f"; //couleur de l'erreur
  console.log("étape 1 :valider le prenom") 
  var saisiePrenom = document.getElementById("first").value;
  sessionStorage.setItem("saisiePrenom", saisiePrenom)      // permet de garder les éléments ecris par l'utilisateur
  if (saisiePrenom == "" ||  saisiePrenom.length<= 2){
    errorSubmit = true;
    alert("Veuillez saisir votre prénom")
    
  const inputPrenom  = document.querySelector("#first"); // devient rouge si ne rempli pas les conditions du formulaire
  inputPrenom.style.background = colorError

    }
// validation de nom
    console.log("étape 1 :valider le nom") 
    var saisieNom = document.getElementById("last").value;
    sessionStorage.setItem("saisieNom", saisieNom) 
    if (saisieNom == "" ||  saisieNom.length<= 2){
      errorSubmit = true;
      alert("Veuillez saisir votre nom")
      
    const inputNom  = document.querySelector("#last"); // devient rouge si ne rempli pas les conditions du formulaire
    inputNom.style.background = colorError
  
  }
  //validation de l'adresse e-mail
  var saisieEmail = document.getElementById("email").value;
  sessionStorage.setItem("saisieEmail", saisieEmail)
   if(checkEmail(saisieEmail) == false){
    errorSubmit = true;
    alert("Veuillez saisir votre email")
    const inputEmail  = document.querySelector("#email"); // devient rouge si ne rempli pas les conditions du formulaire
    inputEmail.style.background = colorError
   }
// validation du nombre de concours
var saisieConcours = document.getElementById("quantity").value;
sessionStorage.setItem("saisieConcours", saisieConcours)
if(isNaN(saisieConcours)){
  errorSubmit = true;
  alert(saisieConcours + " n'est pas un nombre" )
}
//validation du check sur les villes
var choixVille = false;

//storage du choix des villes
sessionStorage.setItem("saisieVille1", document.querySelector("#location1").checked)
sessionStorage.setItem("saisieVille2", document.querySelector("#location2").checked)
sessionStorage.setItem("saisieVille3", document.querySelector("#location3").checked)
sessionStorage.setItem("saisieVille4", document.querySelector("#location4").checked)
sessionStorage.setItem("saisieVille5", document.querySelector("#location5").checked)
sessionStorage.setItem("saisieVille6", document.querySelector("#location6").checked)

var checkVille = document.querySelectorAll(".checkbox-location");
checkVille.forEach((check) => choixVille = (check.checked || choixVille) );
alert(choixVille)
if (choixVille == false){
  errorSubmit = true;
  const selectVille  = document.querySelector(".selectVille");  
  selectVille.style.border = colorError + " 2px solid";
  alert("Veuillez saisir une ville")
}

// vérification si les conditions sont cochées
var checkConditions = document.querySelector("#checkbox1");
if(checkConditions.checked == false){
  errorSubmit = true;
  alert("Merci de cocher les conditions")
}
if (errorSubmit == false){ // pour effacer le formulaire si celui ci est correct
  sessionStorage.clear()
}


}
//fonction de test d'email (regex = expression reguliere)
function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
