function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
/*-----------------------------------------------------------------------------------------------------------*/
//--------------------------- Element du DOM Elements--------------------------------------------------------//
/*-----------------------------------------------------------------------------------------------------------*/




//l'ensemble du formulaire (la page du formulaire)
const modalbg = document.querySelector(".bground"); // permet de recuperer l'element de la class .bground
//btn je m'inscrid
const modalBtn = document.querySelectorAll(".modal-btn");
//tous les elements de classe .formData du formulaire
const formData = document.querySelectorAll(".formData");
// création de la constante spanClose pour fermer la modale (Todo 1)
const spanClose = document.querySelectorAll(".close"); 
const spanCloseFin = document.querySelectorAll(".closeFin"); 
// launch modal event  (charger l'evement modal au niveau du btn)
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // pour chaque btn contenu dans la class modal-btn on va lui ajouter un ecouteur d'evenement sur l'evenement click et lui demander de lancer la fonction launchModal lorsqu'un click est detecté


/*-----------------------------------------------------------------------------------------------------------*/
//------------------------------------------- Déclaration fonction launchModal-------------------------------//
/*-----------------------------------------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------------------------------------*/
//--------------------------------Fonction submitValid------------------------------------------------------//
/*-----------------------------------------------------------------------------------------------------------*/
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

    }
 

   /*---------------Déclaration de la variable saisieNom--------------------------- */
       var saisieNom = document.getElementById("last").value;

   // storage et modification de couleur si error 
    sessionStorage.setItem("saisieNom", saisieNom) 

    //Conditions
    if (saisieNom == "" ||  saisieNom.length<= 2){
      errorSubmit = true;
       
          
  }

  /*-----------------validation de l'adresse e-mail-------------------------------*/
  
// storage et modification de couleur si error
  var saisieEmail = document.getElementById("email").value;
  sessionStorage.setItem("saisieEmail", saisieEmail)
   if(checkEmail(saisieEmail) == false){
    errorSubmit = true;
     
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
  testVilles("")
  errorSubmit = true;
    }else{
       //Déclaration de la variable elementVille
    var elementVille = document.querySelector(".checkbox-input")
     
    elementVille.removeAttribute('required');
   
      }


 /*------------------------validation birthdate--------------------------------*/
 //Déclaration de la variable elementBirthdate
 var elementBirthdate = document.querySelector("#birthdate");
 //condition
 if(elementBirthdate.value.length == ""){
  errorSubmit = true; 
 }
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


// Effacer le formulaire si celui ci est correct et affiche le message de prise en compte
if (errorSubmit == false){ 
  sessionStorage.clear()
  launchModalFin()
}


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

function launchModalFin(){
const modalbgFin = document.querySelector("#bgroundFin")
modalbgFin.style.display = "block"; 

}
// close modal event
spanCloseFin.forEach((btn) => btn.addEventListener("click", closeModalFin));

// close modal form
function closeModalFin() {
  const modalbgFin = document.querySelector("#bgroundFin")
  modalbgFin.style.display = "none";
}


/*-----------------------------------------------------------------------------------------------------------*/
//--------------------------------------------------------- Gestion des errors -------------------------------//
/*-----------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------- text et color error Prénom-------------------*/ 

const inputPrenom = document.querySelector("#first")
inputPrenom.addEventListener("keyup",  function(e){
  testPrenom(e)

})
function testPrenom(event){
  
  var value  = event.target.value
  var elementHtml = event.target
  if (value == "" ||  value.length<= 2){
    elementHtml.style.border = "red 2px solid"
    
  const errorPrenom =  document.querySelector("#errorPrenom");
  errorPrenom.style.visibility = "visible";
  }else {
    elementHtml.style.border = "red 0px solid"
    supprimeError("#errorPrenom")
  }

  }

/*---------------------------------------------------------text et color error Nom -------------------------*/
const inputNom = document.querySelector("#last")
inputNom.addEventListener("keyup",  function(e){
  testNom(e)
 
})

function testNom(event){
  
  var value  = event.target.value
  var elementHtml = event.target
  if (value == "" ||  value.length<= 2){
    elementHtml.style.border = "red 2px solid"
    const errorNom =  document.querySelector("#errorNom");
    errorNom.style.visibility = "visible";
  }else {
    elementHtml.style.border = "red 0px solid"
    supprimeError("#errorNom")
  }
  }
// ----------------------error du mail------------
  const inputMail = document.querySelector("#email")
  inputMail.addEventListener("keyup",  function(e){
    testMail(e)
  
  })
  function testMail(event){
  
    var value  = event.target.value
    var elementHtml = event.target
    if(checkEmail(value) == false){
      elementHtml.style.border = "red 2px solid"
      const errorMail =  document.querySelector("#errorEmail");
    errorMail.style.visibility = "visible";
      
    }else {
      elementHtml.style.border = "red 0px solid"
      supprimeError("#errorEmail")
    }
    }
    // ----------------------error date de naissance------------
    const inputBirthdate = document.querySelector("#birthdate")
    inputBirthdate.addEventListener("change",  function(e){
      testBirthdate(e)
    
    })

    function testBirthdate(event){
  
      var value  = event.target.value
      var elementHtml = event.target
      if (value == "" ||  value.length<= 2){
        elementHtml.style.border = "red 2px solid"
      }else {
        elementHtml.style.border = "red 0px solid"
        supprimeError("#errorBirthdate")
      }
      }
// ----------------------retire error villes au click------------

const inputVilles = document.querySelectorAll(".checkbox-location")
inputVilles.forEach((inputVille) => inputVille.addEventListener("change", function(e){
    testVilles(e)
}
))

function testVilles(event){
  var choixVille = false;

  var checkVille = document.querySelectorAll(".checkbox-location");
//boucle - regarde un par un si ville cochées
checkVille.forEach((check) => choixVille = (check.checked || choixVille) );

if (choixVille == false){
  const selectVille = document.querySelector(".selectVille")
  selectVille.style.border="red 2px solid"
  }else{
       //Déclaration de la variable elementVille
    var elementVille = document.querySelector(".selectVille")
    elementVille.style.border = "red 0px solid"
    
      }
    }
// ----------------------retire error conditions------------

const inputConditions = document.querySelector("#checkbox1")
    inputConditions.addEventListener("click",  function(e){
      if (inputConditions.checked){
        supprimeError("#errorConditions")
      }else {
        inputConditions.style.border="red 2px solid"
        var elementConditions = document.querySelector("#errorConditions")
        elementConditions.style.visibility="visible"
      }
        
        })

// ----------------------Function supprime error------------

function supprimeError (errorId){
const elementError = document.querySelector(errorId)
elementError.style.visibility = "hidden";
}