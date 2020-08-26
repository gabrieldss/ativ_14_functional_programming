//Gabriel dos Santos Souza - 1459589

// (Exercício 5) 

//exportações
const fs = require('fs');
const { DOMParser } = require('xmldom');
const R = require('ramda');
const contentOfTag = R.curry((xmlNode, tagName) => xmlNode.getElementsByTagName(tagName)[0].textContent);
const { isValid, elementsToArray, getGitHubProject } = require('./xmlfilter');
const isAddedAfter2000AndUpdatedIn2020 = isValid(R.__, 2001, 2020); //depois de 2000 (2001-2020)
const document = new DOMParser().parseFromString(fs.readFileSync('res/f-droid.xml', 'utf-8')); 
const contentOfAdded = contentOfTag(R.__, 'added'); 
const contentOfUpdated = contentOfTag(R.__, 'lastupdated'); 



const addApps = elementsToArray(document.getElementsByTagName('application'))
    .filter(isAddedAfter2000AndUpdatedIn2020)
    .map( (apps) => {
        return {
            'Aplicativo': getGitHubProject(apps), 
            'Adicionado em': contentOfAdded(apps), 
            'Última atualização em': contentOfUpdated(apps) 
        }
    })

console.log('\nAplicativos que respeitam a regra: ',addApps);