'use strict';

function Node(ch, freq) {

    this.ch = ch;
    this.freq = freq;
    this.left = nullptr;
    this.right = nullptr;
}


function huffmanTree(inputStr) {
    this.inputStr = inputStr;
}

function createTree() {
    var nodes;

    for (var index = 0; index < histogram.length; index += 1) {
        nodes.push_back(new node(pair.first, pair.second));
    }

    //nodes.sort((a, b) => a - b) {
    //    return low.freq < high.freq;
    //}

    for (var i = 0; i < nodes.length; i++) {
        var target = nodes[i];
        for (j = i - 1; j >= 0 && (nodes[j] > target); j--) {
            nodes[j + 1] = nodes[j];

        }
        nodes[j + 1] = target;
    }

    while (nodes.size() != 1) {
        left = nodes.front();
        nodes.erase(nodes.begin());
        right = nodes.front();
        nodes.erase(nodes.begin());

        nodes.push_back(newNode('\0', left.freq + right.freq, left, right));
    }
    root = nodes.front();
}

function createHistogram(inputStr) {
    var histogram = new Map();


    for (var i = 0; i < inputStr.length; i++) {
        histogram[inputStr[i]]++;
    }
}

function createCodes(node, code) {

    if (node.left)
        createCodes(node.left, code + "0");

    if (node.right)
        createCodes(node.right, code + "1");

    if (!node.left && !node.right)
        codes[node.ch] = code;

    return codes;
}

function createBinaryCode(inputStr) {
    for (var index = 0; index < inputStr.length; index += 1) {
        for (index = 0; index < codes.length; index += 1) {
            if (ch == pair.first)
                binaryCode += pair.second;
        }
    }

    return binaryCode;
}

function decodeBinaryCode(root, binaryCode) {

    var decodedString = "";
    var curr = root;

    //for each character in binaryCode...
    for (index = 0; index < binaryCode.length; index += 1) {
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

function huffman(code) {
    createHistogram(code);

    createTree();

    createCodes();
    createBinaryCode();
    console.log(getBinaryCode());

    var decodedStr = decodeBinaryCode(code.getRoot(), code.getBinaryCode());

    console.log(decodedStr);

}


huffman("I AM SAM MAM.");
