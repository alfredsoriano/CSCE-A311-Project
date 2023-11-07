'use strict';

/*
 * Attribution:
 * https://stackoverflow.com/a/38362821/13634030
 * https://stackoverflow.com/a/14313213/13634030
 */

/*
 * This program is an implementation of the Huffman-algorithm.
 * Huffman-coding is an algorithm for lossless data compression. It was
 * first published by David A. Huffman in 1952.
 * The algorithm returns a binary code-word for every source symbol. Like
 * most encoding methods, the words for often used symbols are shorter than
 * the ones for not so commonly used symbols. The result is a optimal prefix-
 * free code.
 * For more information see https://en.wikipedia.org/wiki/Huffman_coding.
 */

const MAX_CODE = 128;

class Node {
    constructor(count, char, left, right) {
        this.count = count;
        this.char = char;
        this.left = left;
        this.right = right;
    }
}

function isASCII(str) {
    const test = /^[\x00-\x7F]*$/.test(str);
    return test;
}

function huffman(input) {
    if (input === '' || !isASCII(input))
        throw 'invalid_input';
    const histogram = createHistogram(input);
    const leafs = createLeafs(histogram);
    const tree = createTree(leafs);
    const code = createCode('', tree);
    const encoded = encode(code, input);
    return {
        output: encoded,
        code
    };
}

// builds histogram of letter frequency
function createHistogram(input) {
    const histogram = {};

    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i);
        ++histogram[code];
    }

    return histogram;
}

// creates the forest with one tree for every char
function createLeafs(histogram) {
    return Object.entries(histogram).map(([code, freq]) => {
        const char = String.fromCharCode(code);
        return new Node(freq, char, null, null);
    })
}

// splits trees into small and big
function splitTrees(forest) {
    const sorted = forest.sort((a, b) => a.count - b.count);
    const small = sorted.slice(0, 2);
    const big = sorted.slice(2);
    return [small, big];
}

function createTree(forest) {
    if (forest.length === 1)
        return forest[0]
    const [small_trees, big_trees] = splitTrees(forest);
    const new_tree = new Node(
        small_trees[0].count + small_trees[1].count,
        null,
        small_trees[0], small_trees[1]
    );
    const new_trees = [...big_trees, new_tree];
    return createTree(new_trees);
}

// Creates the code-words from the created huffman-tree
function createCode(prefix, node) {
    // empty root node
    if (!node) return {};
    // leaf node
    if (!node.left && !node.right) {
        return { [node.char]: prefix };
    }
    // recursive call
    return {
        ...createCode(prefix + '0', node.left),
        ...createCode(prefix + '1', node.right)
    }
}

function encode(code, string) {
    return Array.from(string).map(
        c => code[c]
    );
}

console.log(huffman("hello, world"));