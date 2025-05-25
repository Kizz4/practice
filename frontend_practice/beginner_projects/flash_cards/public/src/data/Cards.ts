export const cards = [
  {
    question: "Comment déclare-t-on une variable en JavaScript moderne ?",
    answer: "Avec let ou const : let x = 5; const y = 10;",
  },
  {
    question: "Quelle est la différence entre let, const et var ?",
    answer: "let : modifiable, const : constante, var : portée fonction (à éviter)",
  },
  {
    question: "Que renvoie typeof null ?",
    answer: "\"object\" (c'est un bug historique de JS)",
  },
  {
    question: "Que vaut 0 == false ?",
    answer: "true — car 0 est falsy et == fait une conversion de type",
  },
  {
    question: "Quelle est la différence entre == et === ?",
    answer: "== compare avec conversion ; === compare stricte (type + valeur)",
  },
  {
    question: "Que renvoie [] == false ?",
    answer: "true — [] est converti en 0, qui est égal à false avec ==",
  },
  {
    question: "Qu'est-ce qu'un tableau en JS ?",
    answer: "Un tableau est une liste ordonnée : ['apple', 'banana']",
  },
  {
    question: "Comment écrire une fonction fléchée ?",
    answer: "Avec => : const add = (a, b) => a + b;",
  },
  {
    question: "Quelle est la valeur par défaut de this dans une fonction fléchée ?",
    answer: "Elle hérite du this du contexte parent (pas de nouveau this)",
  },
  {
    question: "Que fait setTimeout ?",
    answer: "Exécute une fonction après un délai (en ms)",
  },
  {
    question: "Que vaut typeof NaN ?",
    answer: "\"number\" — même pour NaN, car il est de type number",
  },
  {
    question: "Comment créer un objet littéral ?",
    answer: "Avec des accolades : const obj = { name: 'Alice' }",
  },
  {
    question: "Que fait JSON.stringify() ?",
    answer: "Convertit un objet JS en string JSON : '{\"a\":1}'",
  },
  {
    question: "Quelle est la sortie de console.log(\"5\" + 2) ?",
    answer: "\"52\" — car \"5\" est une string, donc concaténation",
  },
  {
    question: "Comment faire une boucle for ?",
    answer: "for (let i = 0; i < 3; i++) { console.log(i); }",
  },
  {
    question: "Que renvoie Array.isArray([]) ?",
    answer: "true — c'est bien un tableau",
  },
  {
    question: "Quelle est la différence entre null et undefined ?",
    answer: "undefined : pas défini ; null : vide volontairement",
  },
  {
    question: "Comment convertir une string en nombre ?",
    answer: "Avec Number(\"42\"), parseInt(\"42\") ou +\"42\"",
  },
  {
    question: "Que fait Promise.resolve() ?",
    answer: "Crée une promesse déjà résolue : Promise.resolve(42)",
  },
  {
    question: "Que fait map() sur un tableau ?",
    answer: "Renvoie un nouveau tableau transformé : [1,2,3].map(x => x*2)",
  }
];
