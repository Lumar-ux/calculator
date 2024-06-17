let nb1 = "";
let nb2 = "";
let operation = "";
let result = document.getElementById("result");

function screen() {
  result.textContent = nb1 + operation + nb2;
}

document.querySelectorAll(".number").forEach(elNu => {
  elNu.addEventListener("click", () => {
    if (!operation&&!nb1) {
      nb1 += elNu.textContent;
    } else {
      nb2 += elNu.textContent;
    }
    screen();
  });
});

document.querySelectorAll(".operator").forEach(elOp => {
  elOp.addEventListener("click", () => {
    if (nb1) { 
      operation = elOp.textContent; 
      screen();
    }
  });
});

document.getElementById("equal").addEventListener("click", () => {
  if (nb1 && nb2 && operation) {
    let num1 = parseFloat(nb1);
    let num2 = parseFloat(nb2);
    let res;
    switch (operation) {
      case "+":
       res = num1 + num2;
        break;
      case "-":
       res = num1 - num2;
        break;
      case "×":
       res = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
         res = "Erreur";
        } else {
         res = num1 / num2;
        }
        break;
      case "%":
       res = num1 % num2;
        break;
    }
    result.textContent = res;
    nb1 = res.toString();
    nb2 = "";
    operation = "";
  }
});