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

function decode(binCode, encoded) {
    let i = 0;
    let decoded = "";

    for(i; i < encoded.size; i++) { 
        //temp
    }
    console.log(decoded); 
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

    console.log(binCodeStr); 

    let newInputStr = decode(binCode, encoded); 

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

huffman("I AM SAM MAM.");
huffman("ABDUJASF AKLSNF KJANSF test 01923");
