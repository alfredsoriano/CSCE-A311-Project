'use strict';

class Node {
    let = ch;
    freq;
    left = nullptr;
    right = nullptr;
    Node(ch, freq) { }
}


function huffmanTree(inputStr) {
    this.inputStr = inputStr;
}

function createTree() {
    nodes;

    //for (auto pair : histogram) {
    //nodes.push_back(new node(pair.first, pair.second));
    //}
    sort(nodes.begin(), nodes.end(), [](Node * low, Node * high)) {
        return low.freq < high.freq;
    }
    while (nodes.size() != 1) {
        node * left = nodes.front();
        nodes.erase(nodes.begin());
        node * right = nodes.front();
        nodes.erase(nodes.begin());

        nodes.push_back(newNode('\0', left.freq + right.freq, left, right));
    }
    root = nodes.front();
}

function createHistogram(let inputStr) {

    for (int i = 0; i < inputStr.size(); i++) {
        histogram[inputStr[i]]++;
    }
}

function createCodes(let node, let code) {

    if (node.left)
        createCodes(node.left, code + "0");

    if (node.right)
        createCodes(node.right, code + "1");

    if (!node.left && !node.right)
        codes[node.ch] = code;

    return codes;
}

function createBinaryCode(let inputStr) {
    for (let ch: inputStr) {
        for (auto pair : codes) {
        if (ch == pair.first)
            binaryCode += pair.second;
    }
}

return binaryCode;
}

function decodeBinaryCode(let root, let binaryCode) {

    let decodedString = "";
    let curr = root;

    //for each character in binaryCode...
    for (let ch: binaryCode) {
        if (ch == '0')
            curr = curr.left;
        else
    curr = curr.right;

    //if we reached a leaf node...
    if ((curr.left == nullptr) && (curr.right == nullptr)) {
        decodedString += curr.ch;
        curr = root;
    }
}
return decodedString;
}

function getInputString() {
    return inputString;
}

function getRoot() {
    return root;
}

function getBinaryCode() {
    return binaryCode;
}

function getHistogram() {
    return histogram;
}

function getCodes() {
    return codes;
}

function huffman(let code) {
    code.createHistogram(code);

    code.createTree();

    code.createCodes();
    code.createBinaryCode();
    console.log(code.getBinaryCode());

    let decodedStr = code.decodeBinaryCode(code.getRoot(), code.getBinaryCode());

    console.log(decodedStr);

}

console.log("I AM SAM MAM.");