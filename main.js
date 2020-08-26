//Gabriel dos Santos Souza - 1459589

const fs = require('fs');
const { DOMParser } = require('xmldom');
const R = require('ramda');

const { isValid, elementsToArray, getGitHubProject } = require('./xmlfilter');

// efetua o processamento do xml e armazena a estrutura no objeto 'document'
const document = new DOMParser().parseFromString(fs.readFileSync('res/f-droid.xml', 'utf-8')); 

const isAddedAfter2018AndUpdatedAfter2019 = isValid(R.__, 2018, 2019); //1- isAddedAfter2018AndUpdatedAfter2019 função de validar/atualizar ano

const addedApps = elementsToArray(document.getElementsByTagName('application')) //1- addeApps função para adicionar aplicativos
    .filter(isAddedAfter2018AndUpdatedAfter2019)                                //3- addeApps função curried, recebe/reusa várias funções e agrupa em uma única chamada
    .map(getGitHubProject);
//2- está possui side-effects
//4- dentro desta const temos funções high-order
console.log(addedApps.join('\n'));
 
// (Exercício 1) Identifique todas as declarações de funções neste projeto
    // Adicione um comentário identificando-as

// (Exercício 2) Identifique quais funções no projeto possuem efeitos colaterais (side-effects)
    // Adicione um comentário identificando-as

// (Exercício 3) Identifique quais funções são curried
    // Adicione um comentário identificando-as

// (Exercício 4) Identifique quais funções são high-order
    // Adicione um comentário identificando-as

// (Exercício 5) Crie um novo arquivo main2.js (baseado no main.js) que seleciona todos as apps adicionadas
// depois do ano 2000 e atualizadas em 2020. Ao imprimir as apps, além do nome, imprima
// a data que foi adicionada e a data da última atualização.