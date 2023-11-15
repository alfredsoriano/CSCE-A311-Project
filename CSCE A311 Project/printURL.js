'use strict';

class Node {
    constructor(char, freq, left, right) {
        this.char = char; 
        this.freq = freq;
        this.left = left;
        this.right = right; 
    }
}

function encode(binCode, inputStr) {
    let temp = Array.from(inputStr).map(
        c => binCode[c]
    );
    return temp; 
}

function decode(encoded, strMap) {
    if (strMap.length == 1) {
        return strMap[0];
    }
    let finalStr = "";
    for(let i = 0; i < encoded.length; i++) {
        let temp = getLetter(encoded[i], strMap); 
        finalStr += temp; 
    }

    return finalStr; 
}
function getLetter(letterBit, strMap) {
    for(const [char1, freq1] of Object.entries(strMap)) {
        if(freq1 == letterBit) {
            return char1; 
        }
    }
}

function huffman(inputStr) {

    const histogram = createHistogram(inputStr);
    const strMap = mapHist(histogram); 
    const tree = createTree(strMap);
    const binCode = createBinCode('', tree); 
    const encoded = Array.from(inputStr).map(c => binCode[c]);
    const decoded = Array.from(encoded).map(v => binCode[v]);

    let i = 0;
    let binCodeStr = "";
    do {
        i += 1;
        binCodeStr += encoded[i] + ""; 

    } while (i < inputStr.length - 1);

    console.log(binCodeStr); 
    let newInputStr = decode(encoded, binCode); 
    console.log(newInputStr); 

    return  binCodeStr; 
}

function createHistogram(inputStr) {
    const histogram = {};

    for (let i = 0; i < inputStr.length; i++) {
        const code = inputStr.charCodeAt(i);
        histogram[code]++; 
    }

    return histogram; 
}

function mapHist(histogram) {
    let temp = Object.entries(histogram).map(([code, freq]) => {
        const char = String.fromCharCode(code); 
        return new Node(char, freq, null, null); 
    })
    return temp; 
}

function createTree(strMap) {
    if (strMap.length == 1) {
        return strMap[0];
    }
    const [sm, lg] = sortTree(strMap); 
    const tree = new Node(null, sm[0].freq + sm[1].freq, sm[0], sm[1]);
    const finalTree = [...lg, tree]; 
    return createTree(finalTree); 
}

function sortTree(strMap) {
    const temp = strMap.sort((a, b) => a.freq - b.freq);
    const sm = temp.slice(0, 2); 
    const lg = temp.slice(2);
    return [sm, lg]; 
}

function createBinCode(num, node) { 
    if (!node) return {}; 
    if (!node.left && !node.right) {
        return { [node.char] : num };
    }

    return {
        ...createBinCode(num + '0', node.left),
        ...createBinCode(num + '1', node.right)
    }
}

//code below for implementing interactive encode/decode buttons
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    const encodeButton = document.getElementById("encode");
    const URLButton = document.getElementById("get-url");
    const encodedText = document.getElementById("encoded-text");
    const currentURL = document.getElementById("current-url");

    URLButton.addEventListener("click", function(){
    if (url.length < 150) {
        currentURL.innerHTML += url;
    } 
    else {
        currentURL.innerHTML = "URL is too big!";
    }
    });

    //on the press of the "encode" button, encode the text in the text box
    encodeButton.addEventListener("click", function() {
        if (url.length < 150) {
            encodedText.innerHTML = huffman(currentURL.value);
        }
        else {
            encodedText.innerHTML = "Input is too big!";
        }
    });
});

