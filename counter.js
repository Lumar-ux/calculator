let OpNbSigne = []
let tmpNumber = "";
let res;
let sign;
let nombre;
let result = document.getElementById("result");
function screen(content) {
  result.textContent = content;
}
document.querySelectorAll(".number").forEach(elNu => {
  elNu.addEventListener("click", () => {
    tmpNumber += elNu.textContent; // ajoute le(s) valeur(s) dans une variable temporaire (tmp)
    screen(tmpNumber); //affiche la valeur dans la class html result
  });
});
document.querySelectorAll(".operator").forEach(elOp => {
  elOp.addEventListener("click", () => {
    if (tmpNumber !== ""||OpNbSigne[0] !== "") { //vérifie que la premiere valeur de la variable tmp ne soit pas vide et pareil apres 1 equal effectué
      if (tmpNumber !== ""){ //vérifie que la premiere valeur de la variable tmp ne soit pas vide uniquement
        OpNbSigne.push(tmpNumber); //ajout la valeur tmp dans le tableau
      }
        tmpNumber = ""; //vide la variable tmp
        OpNbSigne.push(elOp.textContent);//ajout la valeur du sign dans le tableau
        screen(elOp.textContent); //affiche la valeur du sign dans la class html result
      }
  });
});
function resetEquation() {
  tmpNumber = "";
  OpNbSigne = [];
  nombre = [];
  sign = [];
  res = "";
}
function equation(){
  OpNbSigne.push(tmpNumber);
  tmpNumber = "";
  if (!(OpNbSigne.length%2==0)) { //vérifie si l'opération mathématique a une longeur impaire
    
    sign = OpNbSigne.filter(nb=>!/[\d.()]/.test(nb)); // stock les sign dans un nouveau tableau
    nombre = OpNbSigne.map(nb => parseFloat(nb)).filter(nb => !isNaN(nb)); // stock les nombres dans un nouveau tableau
    console.log("try sign "+sign) //savoir les sign introduie par l'utlisateur
    console.log("try nombre "+nombre) //savoir les nombres introduie par l'utlisateur
    for (let i = 0; i < sign.length; i++) { //for qui calcule les valeur des nombre uniquement pour les signes pemdas prioritére
      if (sign[i] === "×" || sign[i] === "/" || sign[i] === "%") {
        switch (sign[i]) {
          case "×":
            nombre[i]*=nombre[i + 1];
            break;
          case "/":
            if (nombre[i + 1] === 0) {
              result.textContent = "Erreur: division par zéro";
              return;
            }
            nombre[i]/=nombre[i + 1];
            break;
          case "%":
            nombre[i]=nombre[i + 1];
            break;
        }
        nombre.splice(i + 1, 1); // supprime nombre a l'index suivant.
        sign.splice(i, 1); // supprime signe a l'index actuel.
        i--; // permet de recaler l'index vers la gauche sinon rest décalé (apres les deux slice)
      }
     }
      res = nombre[0];
      for(let s=0;s<sign.length;s++){ //for qui calcule les valeur des nombre uniquement pour le reste des signe.
        switch (sign[s]) {
          case "+":
            res+=nombre[s+1];
            break;
          case "-":
            res-=nombre[s+1];
            break;
        }
    }
    result.textContent = res; //udate l'affichage par la réponse
    OpNbSigne[0] = res; //le rest de code, stock la réponse et vide le rest pour pouvoir continué apres un premier equal
    nombre=[];
    sign=[];
    res = "";
    for(let i=1;i<OpNbSigne.length;i++){
      OpNbSigne.splice(i)
    }
  }
};

document.getElementById("equal").addEventListener("click", () => {equation()});
document.getElementById("reset").addEventListener("click", () => {
  screen(0);
  resetEquation()
  // console.log(nombre); // Vérifie si les tableaux sont vides
  // console.log(sign);
  // console.log(OpNbSigne);
});