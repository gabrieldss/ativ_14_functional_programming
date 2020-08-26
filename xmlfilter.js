//Gabriel dos Santos Souza - 1459589

const R = require('ramda');

const contentOfTag = R.curry(  //1- contentOfTag declaração  //3- é função curried
    (xmlNode, tagName) => xmlNode.getElementsByTagName(tagName)[0].textContent
);

const contentOfSource = contentOfTag(R.__, 'source');  //1- contentOfSource declaração
const contentOfAdded = contentOfTag(R.__, 'added');  //1- contentOfAdded declaração
const contentOfUpdated = contentOfTag(R.__, 'lastupdated');  //1- contentOfUpdated declaração
const contentOfID = contentOfTag(R.__, 'id');  //1- contentOfID declaração
const getGitHubProject = xmlNode => contentOfSource(xmlNode).replace('https://github.com/', '');  //1- getGitHubProject declaração

const elementsToArray = nodes => { //1- elementsToArray declaração   2//possui side-effects
    const arr = [];
    for (let i = 0; i < nodes.length; i++)
        arr.push(nodes[i]);
    return arr;
};

const isValid = R.curry(  //1- isValid declaração   //3- é função curried  //4-dentro desta const isValid temos funções high-order
    (app, addedAfterYear, updatedAfterYear) => {
        if (!contentOfSource(app).includes('github.com'))
            return false;

        const addedDate = new Date(contentOfAdded(app)); //1- addedDate declaração
        if (addedDate.getFullYear() < addedAfterYear)
            return false;

        const lastUpdatedDate = new Date(contentOfUpdated(app));  //1- lastUpdatedDate declaração
        if (lastUpdatedDate.getFullYear() < updatedAfterYear)
            return false;

        return true;
    }
);

module.exports = {
    isValid,
    elementsToArray,
    getGitHubProject,
    contentOfSource,
    contentOfID
};