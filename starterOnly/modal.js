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

//--------------------------------Fonction submitValid-----------------------------

// Déclaration fonction launchModal
function launchModal() {
  modalbg.style.display = "block"; // prend la class bgroung et modifit le style et plus particulierement le display en none dans le fichier css
  
  /*---------------------Autosave storage-----------------------------------------*/

  // test l'existance d'une session storage
  if(sessionStorage.getItem("autosave")){   
let getPrenom = document.querySelector("#first").value = sessionStorage.getItem("saisiePrenom");
let getNom = document.querySelector("#last").value = sessionStorage.getItem("saisieNom");
let getEmail = document.querySelector("#email").value = sessionStorage.getItem("saisieEmail");
let getConcours = document.querySelector("#quantity").value = sessionStorage.getItem("saisieConcours");
let getBirthdate = document.querySelector("#birthdate").value = sessionStorage.getItem("saisieBirthdate");

let getSaisieVille1 = document.querySelector("#location1").checked = sessionStorage.getItem("saisieVille1");
let getSaisieVille2 = document.querySelector("#location2").checked = sessionStorage.getItem("saisieVille2");
let getSaisieVille3 = document.querySelector("#location3").checked = sessionStorage.getItem("saisieVille3");
let getSaisieVille4 = document.querySelector("#location4").checked = sessionStorage.getItem("saisieVille4");
let getSaisieVille5 = document.querySelector("#location5").checked = sessionStorage.getItem("saisieVille5");
let getSaisieVille6 = document.querySelector("#location6").checked = sessionStorage.getItem("saisieVille6");

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


//--------------------------------Fonction submitValid-----------------------------
//Déclaration de la fonction submitValid
function submitValid() {
 // Pour créer la session storage
  sessionStorage.setItem("autosave", true)
  
  
  let errorSubmit = false;
//couleur de l'erreur
  const colorError = "#fe142f";

  /*-----------------Déclaration de la variable saisiePrénom------------------*/
  var saisiePrenom = document.getElementById("first").value;

  // permet de garder les éléments ecris par l'utilisateur
  sessionStorage.setItem("saisiePrenom", saisiePrenom)    
  
  // conditions Prénom
  if (saisiePrenom == "" ||  saisiePrenom.length<= 2){
    errorSubmit = true;
       
    // Déclaration variable elementPrenom 
    var elementPrenom = document.getElementById("first");

    //Fonction
    elementPrenom.oninvalid = function(event) {
      event.target.setCustomValidity("");
    // le ! permet d'inverser la condition  
      if (!event.target.validity.valid) {
  //message d'error si non vide ou inf a 2      
        if (event.target.value.length < 2 ) {
    event.target.setCustomValidity("Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
        } 
      }
    };
//Déclaration de la constante inputPrenom
 // devient rouge si ne rempli pas les conditions du formulaire
  const inputPrenom  = document.querySelector("#first");
  inputPrenom.style.border = colorError + " 2px solid";
  const errorPrenom =  document.querySelector("#errorPrenom");
  errorPrenom.style.visibility = "visible";
    }
 

   /*---------------Déclaration de la variable saisieNom--------------------------- */
       var saisieNom = document.getElementById("last").value;

   // storage et modification de couleur si error 
    sessionStorage.setItem("saisieNom", saisieNom) 

    //Conditions
    if (saisieNom == "" ||  saisieNom.length<= 2){
      errorSubmit = true;
       
     //Déclaration de la variable elementNom 
      var elementNom = document.getElementById("last");

//Fonction
      elementNom.oninvalid = function(event) {
        event.target.setCustomValidity("");
        if (!event.target.validity.valid) {
          // message d'error si non vide ou inf a 2
          if (event.target.value.length < 2 ) {
      event.target.setCustomValidity("Veuillez entrer 2 caractères ou plus pour le champ du nom.");
          } 
        }
      };
     
//Déclaration de  la constante inputNom
    const inputNom  = document.querySelector("#last"); 

    // devient rouge si ne rempli pas les conditions du formulaire
    inputNom.style.border = colorError + " 2px solid";
    const errorNom =  document.querySelector("#errorNom");
    errorNom.style.visibility = "visible";
  }

  /*-----------------validation de l'adresse e-mail-------------------------------*/
  //Déclaration de la varaible email
  var email = document.getElementById("email");
  email.addEventListener("keyup", function (event) {
    if(email.validity.typeMismatch) {
      email.setCustomValidity("Vous devez saisir un email valide");
    } else {
      email.setCustomValidity("");
    }
  });
// storage et modification de couleur si error
  var saisieEmail = document.getElementById("email").value;
  sessionStorage.setItem("saisieEmail", saisieEmail)
   if(checkEmail(saisieEmail) == false){
    errorSubmit = true;
  
    const inputEmail  = document.querySelector("#email"); // devient rouge si ne rempli pas les conditions du formulaire
    inputEmail.style.border = colorError + " 2px solid";
    
   }

/* -------------------validation du nombre de concours---------------------------*/
//Déclaration de la varaible saisieConcours
var saisieConcours = document.getElementById("quantity").value;
//storage
sessionStorage.setItem("saisieConcours", saisieConcours)
//condition
if(isNaN(saisieConcours)){
  errorSubmit = true;
  
}
/*----------------------------------validation du check sur les villes-----------*/
var choixVille = false;

//storage du choix des villes
sessionStorage.setItem("saisieVille1", document.querySelector("#location1").checked)
sessionStorage.setItem("saisieVille2", document.querySelector("#location2").checked)
sessionStorage.setItem("saisieVille3", document.querySelector("#location3").checked)
sessionStorage.setItem("saisieVille4", document.querySelector("#location4").checked)
sessionStorage.setItem("saisieVille5", document.querySelector("#location5").checked)
sessionStorage.setItem("saisieVille6", document.querySelector("#location6").checked)

//Déclaration de la variable checkVille
var checkVille = document.querySelectorAll(".checkbox-location");
//boucle - regarde un par un si ville cochées
checkVille.forEach((check) => choixVille = (check.checked || choixVille) );

if (choixVille == false){
  errorSubmit = true;
  var elementVille = document.querySelector(".checkbox-input")
  //récupere la classe de New york pour afficher le message d'erreur
  elementVille.setCustomValidity("Vous devez choisir une option.");
  //Déclaration constante selectVille
  
  const selectVille  = document.querySelector(".selectVille");  
  //Modification du style si error
  selectVille.style.border = colorError + " 2px solid";
  const errorVille =  document.querySelector("#errorVille");
  errorVille.style.visibility = "visible";
  }else{
   
    //Déclaration de la variable elementVille
    var elementVille = document.querySelector(".checkbox-input")
     
    elementVille.removeAttribute('required');
   
      }

/*-----------------vérification si les conditions sont cochées-------------------*/
//Déclaration de la varaible chekconditions
var checkConditions = document.querySelector("#checkbox1");
if(checkConditions.checked == false){
  errorSubmit = true;
   checkConditions.setCustomValidity("Vous devez vérifier que vous acceptez les termes et conditions.");
   const errorConditions =  document.querySelector("#errorConditions");
  errorConditions.style.visibility = "visible";
}else{
  checkConditions.setCustomValidity("");
}

// Effacer le formulaire si celui ci est correct
if (errorSubmit == false){ 
  sessionStorage.clear()
}

 /*------------------------validation birthdate--------------------------------*/
 //Déclaration de la variable elementBirthdate
 var elementBirthdate = document.querySelector("#birthdate");
 //fonction
   elementBirthdate.oninvalid = function(event) {
    event.target.setCustomValidity("");
    if (!event.target.validity.valid) {
      if (event.target.value.length == "" ) {
  event.target.setCustomValidity("Vous devez entrer votre date de naissance.");

  const inputBirthdate  = document.querySelector("#birthdate");
  inputBirthdate.style.border = colorError + " 2px solid";
  const errorBirthdate =  document.querySelector("#errorBirthdate");
  errorBirthdate.style.visibility = "visible";
      } 
    }
  };
//Déclaration de la varaible saisieBirthdate
var saisieBirthdate = document.getElementById("birthdate").value;
//storage
sessionStorage.setItem("saisieBirthdate", saisieBirthdate)


}


/*----------fonction de test d'email (regex = expression reguliere)-----------------*/
function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
// supprime les bulle d'error html5
var forms = document.querySelectorAll("#formulaire");
forms.forEach((form) => {
    
    form.addEventListener('invalid', function(e) {
        e.preventDefault();
        //Possibly implement your own here.
    }, true);
});