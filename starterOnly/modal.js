/*------------------------------------------------------------------------*/
/*----------Variables globales (existent partout dans le code)------------*/
/*------------------------------------------------------------------------*/

//couleur de l'erreur
const colorError = "#fe142f"; 

/*----------Variables globales - noeuds Html recuperés & ajout d'un ecouteur d'evenements sur le noeudHTml------------*/
//Activer le btn c'est parti
var subValid = document.querySelector(".btn-submit");
subValid.addEventListener("click", submitValid)

//l'ensemble du formulaire (la page du formulaire)
const modalbg = document.querySelector(".bground"); 

//btn je m'inscris
const modalBtn = document.querySelectorAll(".modal-btn");
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); 


// création de la constante spanClose pour fermer la modale (Todo 1)
const spanCloses = document.querySelectorAll(".close");
spanCloses.forEach((spanClose) => spanClose.addEventListener("click", closeModal));

// Ferme la modal de fin
const spanCloseFins = document.querySelectorAll(".closeFin");
spanCloseFins.forEach((spanCloseFin) => spanCloseFin.addEventListener("click", closeModalFin));

// declenche les fonctions tests sur l'evenement "change" posé sur le noeudHtml qui a l'ID
const inputPrenom = document.querySelector("#first");
inputPrenom.addEventListener("change",testPrenom);

const inputNom = document.querySelector("#last");
inputNom.addEventListener("change",testNom);

const inputMail = document.querySelector("#email");
inputMail.addEventListener("change",  testMail);

const inputBirthdate = document.querySelector("#birthdate");
inputBirthdate.addEventListener("change", testBirthdate);

const inputConcours = document.querySelector("#quantity");
inputConcours.addEventListener("change", testConcours);

const inputVilles = document.querySelectorAll(".checkbox-location");
inputVilles.forEach((inputVille) =>inputVille.addEventListener("change", testVilles));

const inputConditions = document.querySelector("#checkbox1");
inputConditions.addEventListener("change", testConditions);

/*------------------------------------------------------------------------*/
/*----------------------------Traitement au chargement--------------------*/
/*------------------------------------------------------------------------*/

/*----------supprime les bulles d'error html5-----------------*/
//Récupere tous les elements de classe .formData du formulaire (champs) 
const formData = document.querySelectorAll(".formData");
formData.forEach((form) => {form.addEventListener("invalid", function (e) {
      e.preventDefault(); //prevent default retire l'affichage de l'infobulle d'erreur  
    },
    true
  );
});

// Ajoute l'evenement au moment ou la touche se releve  qui declenche la fermeture du formulaire avec echap et validation avec entrée
document.addEventListener("keyup", function (e) {
  if (e.keyCode == 27) {
    closeModal();
    closeModalFin()
  }
  if (e.keyCode == 13) {
    submitValid();
    closeModalFin()
  }
});

//affiche au chargement de la page launchModalFin si le formulaire a ete rempli precedemment
if (sessionStorage.getItem("formulaireTermine") ) {
   launchModalFin();
}

/*------------------------------------------------------------------------*/
/*----------------------------Fonctions - gestion tests-------------------*/
/*------------------------------------------------------------------------*/


// fonction de test validité de du prenom & affichage de l'erreur si necessaire
function testPrenom() {
  const elementHtml= document.querySelector("#first")
  var value = elementHtml.value;
  
  var resultatTest = false;

  if (value == "" || value.length <= 2) {
      elementHtml.style.border = "red 2px solid";

      afficheError("#errorPrenom");   
  } else {
    resultatTest = true;
    elementHtml.style.border = "red 0px solid";
    supprimeError("#errorPrenom");
  }
  return resultatTest;
}

// fonction de test validité du nom & affichage de l'erreur si necessaire
function testNom() {
  const elementHtml = document.querySelector("#last")
  var value = elementHtml.value;
 
  var resultatTest = false;

  if (value == "" || value.length <= 2) {
    elementHtml.style.border = "red 2px solid";
    afficheError("#errorNom");
  } else {
    resultatTest = true;
    elementHtml.style.border = "red 0px solid";
    supprimeError("#errorNom");
  }
  return resultatTest;
}

// fonction de test validité du mail & affichage de l'erreur si necessaire
function testMail() {
  const elementHtml = document.querySelector("#email")
  var value = elementHtml.value;

  var resultatTest = false;

  if (checkEmail(value) == false) {
    elementHtml.style.border = "red 2px solid";
    afficheError("#errorEmail");
  } else {
    resultatTest = true;
    elementHtml.style.border = "red 0px solid";
    supprimeError("#errorEmail");
  }
  return resultatTest;  
}
// fonction de test validité de l'email (regex = expression reguliere)
function checkEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// fonction de test validité du Birthdate & affichage de l'erreur si necessaire
function testBirthdate() {
    const elementHtml = document.querySelector("#birthdate")
  var value = elementHtml.value;

  var resultatTest = false;


//date du jour
var today = new Date();
var dateBirthdate = new Date (value);


//condition
  if (value == "" || value.length <= 2 || dateBirthdate > today) {
    elementHtml.style.border = "red 2px solid";
    afficheError("#errorBirthdate");
  } else {
    resultatTest = true;
    elementHtml.style.border = "red 0px solid";
    supprimeError("#errorBirthdate");
    var elementHide = document.querySelector(".hide");
    elementHide.removeAttribute("required");
  }
  return resultatTest; 
}

// fonction de test validité du Concours & affichage de l'erreur si necessaire
function testConcours() {
  const elementHtml = document.querySelector("#quantity")
  var value = elementHtml.value;
 var resultatTest = false;

 if (isNaN(value)) {
  elementHtml.style.border = "red 2px solid";
  afficheError("#errorConcours"); 
  } else {
    resultatTest = true;
    elementHtml.style.border = "red 0px solid";
    supprimeError("#errorConcours");
  }
  return resultatTest; 
}
   
// fonction de test validité des Villes & affichage de l'erreur si necessaire
function testVilles() {
  var resultatTest = false;
  var loc1 = document.querySelector("#location1").checked
  var loc2 = document.querySelector("#location2").checked
  var loc3 = document.querySelector("#location3").checked
  var loc4 = document.querySelector("#location4").checked
  var loc5 = document.querySelector("#location5").checked
  var loc6 = document.querySelector("#location6").checked

  if (loc1 || loc2 || loc3 || loc4|| loc5|| loc6){
    //Déclaration de la variable elementVille
    var elementVille = document.querySelector(".selectVille");
    elementVille.style.border = "red 0px solid";
    supprimeError("#errorVilles");
    resultatTest = true;
  } else {
        const selectVille = document.querySelector(".selectVille");
    selectVille.style.border = "red 2px solid";
    afficheError("#errorVilles"); 
  }
  return resultatTest;
}

// fonction de test validité du Conditions & affichage de l'erreur si necessaire
function testConditions(){
  const elementHtml = document.querySelector("#checkbox1")
  var value = elementHtml.value;
 var resultatTest = false;

 if (inputConditions.checked) {
  resultatTest = true;  
  supprimeError("#errorConditions");
} else {
  inputConditions.style.border = "red 2px solid";
  afficheError("#errorConditions"); 
}
return resultatTest;
}


/*------------------------------------------------------------------------*/
/*------------------Fonctions - Validation du formulaire------------------*/
/*------------------------------------------------------------------------*/
function submitValid() {
  // Enregistrement d'autoSave dans la session storage
  sessionStorage.setItem("autosave", true);

  let formulaireValid = true;
  
  /*-----------------Déclaration de la variable saisiePrénom------------------*/
  var saisiePrenom = document.getElementById("first").value;

  // permet d'enregistrer les éléments ecrits par l'utilisateur
  sessionStorage.setItem("saisiePrenom", saisiePrenom);

  // appel de la function testPrenom
 if (testPrenom() === false){
   formulaireValid = false
 }

  /*---------------Déclaration de la variable saisieNom------------------------ */
  var saisieNom = document.getElementById("last").value;

  // permet d'enregistrer les éléments ecrits par l'utilisateur
  sessionStorage.setItem("saisieNom", saisieNom);
 
  // appel de la function testNom
 if (testNom() === false){
  formulaireValid = false
}
  

  /*-----------------validation de l'adresse e-mail-------------------------------*/
  var saisieEmail = document.getElementById("email").value;
  // permet d'enregistrer les éléments ecrits par l'utilisateur
  sessionStorage.setItem("saisieEmail", saisieEmail);
// appel de la function testMail
if (testMail() === false){
  formulaireValid = false
}

/*------------------------validation birthdate--------------------------------*/
    var saisieBirthdate = document.getElementById("birthdate").value;
 // permet d'enregistrer les éléments ecrits par l'utilisateur
  sessionStorage.setItem("saisieBirthdate", saisieBirthdate);

// appel de la function testBirthdate
if (testBirthdate() === false){
  formulaireValid = false
}

  /* -------------------validation du nombre de concours---------------------------*/
   var saisieConcours = document.getElementById("quantity").value;
 // permet d'enregistrer les éléments ecrits par l'utilisateur
  sessionStorage.setItem("saisieConcours", saisieConcours);

  // appel de la function testConcours
if (testConcours() === false){
  formulaireValid = false
}
  /*----------------------------------validation du check sur les villes-----------*/
  
  // permet d'enregistrer les éléments cochés par l'utilisateur
  sessionStorage.setItem(    "saisieVille1",    document.querySelector("#location1").checked
  );
  sessionStorage.setItem(
    "saisieVille2",
    document.querySelector("#location2").checked
  );
  sessionStorage.setItem(
    "saisieVille3",
    document.querySelector("#location3").checked
  );
  sessionStorage.setItem(
    "saisieVille4",
    document.querySelector("#location4").checked
  );
  sessionStorage.setItem(
    "saisieVille5",
    document.querySelector("#location5").checked
  );
  sessionStorage.setItem(
    "saisieVille6",
    document.querySelector("#location6").checked
  );
// appel de la function testVilles
if (testVilles() === false){
  formulaireValid = false
}
  
 
  /*-------------------------- conditions submit -----------------------------------------------*/
  const inputConditions = document.querySelector("#checkbox1");
// permet d'enregistrer les éléments cochés par l'utilisateur
sessionStorage.setItem("checkConditions", inputConditions.checked)
sessionStorage.setItem("checkConditions2", document.querySelector("#checkbox2").checked)

// appel de la function testConditions
if (testConditions() === false){
  formulaireValid = false
}


  // si pas d'erreur enregistre 
  if (formulaireValid === true) {
   sessionStorage.setItem("formulaireTermine", true);
      }


}


/*------------------------------------------------------------------------*/
/*---------Fonctions - gestion ouverture & fermeture des modals-----------*/
/*------------------------------------------------------------------------*/
// Ferme le formulaire
function closeModal() {
  modalbg.style.display = "none";
}
//Affiche le formulaire & recupere les informations a mettre dans le formulaire
function launchModal() {
  modalbg.style.display = "block"; 

  /*---------------------Autosave storage-----------------------------------------*/

  // si autoSave est recuperé dans session storage
  if (sessionStorage.getItem("autosave")) {
    //remplir le champs prénom avec la valeur de "saisiePrenom" enregistrée dans sessionStorage
    document.querySelector("#first").value = sessionStorage.getItem(
      "saisiePrenom"
    );
    //remplir le champs nom avec la valeur de "saisieNom" enregistrée dans sessionStorage
    document.querySelector("#last").value = sessionStorage.getItem("saisieNom");
    //remplir le champs email avec la valeur de "email" enregistrée dans sessionStorage
    document.querySelector("#email").value = sessionStorage.getItem(
      "saisieEmail"
    );
    //remplir le champs saisieConcours avec la valeur de "saisieConcours" enregistrée dans sessionStorage
    document.querySelector("#quantity").value = sessionStorage.getItem(
      "saisieConcours"
    );
    //remplir le champs birthdate avec la valeur de "saisieBirthdate" enregistrée dans sessionStorage
    document.querySelector("#birthdate").value = sessionStorage.getItem(
      "saisieBirthdate"
    );
  
//cocher la ville avec la valeur de "saisieVille" enregistrée dans sessionStorage
    document.querySelector("#location1").checked === sessionStorage.getItem(
      "saisieVille1"
    );
    document.querySelector("#location2").checked === sessionStorage.getItem(
      "saisieVille2"
    );
    document.querySelector("#location3").checked === sessionStorage.getItem(
      "saisieVille3"
    );
    document.querySelector("#location4").checked === sessionStorage.getItem(
      "saisieVille4"
    );
    document.querySelector("#location5").checked === sessionStorage.getItem(
      "saisieVille5"
    );
    document.querySelector("#location6").checked === sessionStorage.getItem(
      "saisieVille6"
    );
    //appels des fonctions tests pour tester la validité et affiche le message d'erreur si invalide
    testPrenom()
    testNom()
    testMail()
    testBirthdate()
    testConcours()
    testVilles()
    testConditions()
  }
}

function launchModalFin() {
  
  //recupere les informations dans le sessionstorage & envoie le mail des infos saisies
  let fullName = sessionStorage.getItem( "saisiePrenom" );
   let userEmail = sessionStorage.getItem("saisieEmail" );
   
   let userMessage = "launchModalFin:" + sessionStorage.getItem("saisieNom") + '/'+ sessionStorage.getItem("saisieBirthdate") + '/'+ sessionStorage.getItem("saisieConcours")  + '/'+ sessionStorage.getItem("saisieVille1") + '/'+ sessionStorage.getItem("saisieVille2") + '/'+ sessionStorage.getItem("saisieVille3") + '/'+ sessionStorage.getItem("saisieVille4") + '/'+ sessionStorage.getItem("saisieVille5") + '/'+sessionStorage.getItem("saisieVille6") + '/'+ sessionStorage.getItem("checkConditions") + '/'+ sessionStorage.getItem("checkConditions2");
   
   
   var contactParams = {
     from_name: fullName,
     reply_to: userEmail,
      message: userMessage
   };
 
   
     emailjs.init("user_7tR9LJzR8U8F0vQka347x");
    
  //  emailjs.send("service_ahy6xbq", "template_ylvldvg", contactParams)
   //supprime la session storage
   sessionStorage.clear();
   //affiche la modal de fin
   const modalbgFin = document.querySelector("#bgroundFin");
   modalbgFin.style.display = "flex";
 }

// Fermle la modal de fin
function closeModalFin() {
  const modalbgFin = document.querySelector("#bgroundFin");
  modalbgFin.style.display = "none";
}

/*------------------------------------------------------------------------*/
/*----------------------------Fonctions - autres--------------------------*/
/*------------------------------------------------------------------------*/
//menu responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    // ajouter la class responsive a la class existante
    x.className += " responsive"; 
  } else {
    x.className = "topnav";
  }
}
//fait disparaitre les erreurs
function supprimeError(errorId) {
  const elementError = document.querySelector(errorId);
  elementError.style.visibility = "hidden";
}

function afficheError(errorId){
  const elementError = document.querySelector(errorId);
  elementError.style.visibility = "visible";
}
