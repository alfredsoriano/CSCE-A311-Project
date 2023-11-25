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

    let i = 0;
    let binCodeStr = "";
    do {
        i += 1;
        binCodeStr += encoded[i] + ""; 

    } while (i < inputStr.length - 1);
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

let url = "";
let mode = 0; //mode 0 is encoding, mode 1 is decoding 
//code below for implementing interactive encode/decode buttons
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    const textBox = document.getElementById("textbox");
    const arrayBox = document.getElementById("arraybox");
    const codeMapBox = document.getElementById("codemapbox");
    const changeModeButton = document.getElementById("change-mode");
    const URLButton = document.getElementById("get-url");
    const encodeButton = document.getElementById("encode");
    const decodeButton = document.getElementById("decode");
    const encodedText = document.getElementById("encoded-text");
    const encodedArray = document.getElementById("encoded-array");
    const codeMapText = document.getElementById("encoded-map");
    const decodedText = document.getElementById("decoded-text");

    changeModeButton.addEventListener("click", function() {
        //when pressed and in encode mode, changes to decode mode
        if (mode == 0) {
            mode = 1;
            arrayBox.value = "";
            codeMapBox.value = "";
            decodedText.innerHTML = "Your decoded message will appear here!";

            URLButton.style.backgroundColor = "#322A61";
            URLButton.style.textDecoration = "line-through";

            textBox.style.display = "none";
            arrayBox.style.display = "block";
            codeMapBox.style.display = "block";
            encodedText.style.display = "none";
            encodedArray.style.display = "none";
            codeMapText.style.display = "none";
            decodedText.style.display = "block";
            encodeButton.style.display = "none";
            decodeButton.style.display = "block";
        }
        //when pressed and in decode mode, changes to encode mode
        else if (mode == 1) {
            mode = 0;
            textBox.value = "";
            encodedText.innerHTML = "Your encoded text<br/> will appear here!";
            encodedArray.innerHTML = "Your JSON array<br/> will appear here!";
            codeMapText.innerHTML = "Your JSON code map<br/> will appear here!";

            URLButton.style.backgroundColor = "#483d8b";
            URLButton.style.textDecoration = "none";

            textBox.style.display = "block";
            arrayBox.style.display = "none";
            codeMapBox.style.display = "none";
            encodedText.style.display = "block";
            encodedArray.style.display = "block";
            codeMapText.style.display = "block";
            decodedText.style.display = "none";
            encodeButton.style.display = "block";
            decodeButton.style.display = "none";
        }
    });

    
    //on the press of the "Get URL" button, sets the text area to the current page URL
    URLButton.addEventListener("click", function() {
        textbox.value = url;
    });

    //on the press of the "encode" button, encode the text in the text box
    encodeButton.addEventListener("click", function() {
        if (decodedText.style.display == "block") {
            decodedText.style.display = "none";
        }
        encodedText.innerHTML = "Encoded text:<br/>" + huffman(textbox.value);
        encodedText.style.display = "block";
        const histogram = createHistogram(textbox.value);
        const strMap = mapHist(histogram); 
        const tree = createTree(strMap);
        const binCode = createBinCode('', tree); 
        const encoded = Array.from(textbox.value).map(c => binCode[c]);

        codeMapText.innerHTML = "Code map:<br/>" + JSON.stringify(binCode);
        encodedArray.innerHTML = "Encoded array:<br/>" + JSON.stringify(encoded);
        codeMapText.style.display = "block";
        encodedArray.style.display = "block";
    });

    //on the press of the "decode", takes in the code map + binary code string to decode the message.
    decodeButton.addEventListener("click", function() {
        if (codeMapText.style.display == "block" && encodedText.style.display == "block") {
            codeMapText.style.display = "none";
            encodedText.style.display = "none";
        }

        decodedText.innerHTML = "Decoded string:<br/>" + decode(JSON.parse(arrayBox.value), JSON.parse(codeMapBox.value));
        decodedText.style.display = "block";
    });
});
