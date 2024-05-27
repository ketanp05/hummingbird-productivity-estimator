/*
this script runs before the vue.js app is loaded. it has access to both the DOM and Node.js env
allowing it to securely expose APIs from the main process to the renderer process (our vue.js web pages)
*/

// we listen for 'DOMContentLoaded' event which is fired when initial HTML document is completely loaded
window.addEventListener('DOMContentLoaded', () => {

    // helper function to replace text content in the document
    const replaceText = (selector, text) => {
        // select an element by its selector
        const element = document.getElementById(selector);

        // if the element exists set its innerText to the provided text
        if (element) element.innerText = text;
    }

    // loop over a list of dependencies and update text content of elements with their versions
    for (const dependency of ['chrome', 'node', 'electron']){
        replaceText('${dependency}-version', process.versions[dependency])
    }
});