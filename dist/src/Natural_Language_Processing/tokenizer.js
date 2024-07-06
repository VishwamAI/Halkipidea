"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizerFromJson = void 0;
class Tokenizer {
    constructor(config) {
        this.filters = (config === null || config === void 0 ? void 0 : config.filters) || /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~\s]+/;
        this.lower = (config === null || config === void 0 ? void 0 : config.lower) || true;
        this.wordIndex = {};
        this.indexWord = {};
    }
    cleanText(text) {
        if (this.lower) {
            text = text.toLowerCase();
        }
        return text.split(this.filters).filter(Boolean);
    }
    fitOnTexts(texts) {
        const wordSet = new Set();
        texts.forEach(text => {
            const words = this.cleanText(text);
            words.forEach(word => wordSet.add(word));
        });
        let index = 1;
        wordSet.forEach(word => {
            this.wordIndex[word] = index;
            this.indexWord[index] = word;
            index++;
        });
    }
    textsToSequences(texts) {
        return texts.map(text => {
            const words = this.cleanText(text);
            return words.map(word => this.wordIndex[word] || 0);
        });
    }
    toJson() {
        return JSON.stringify({
            wordIndex: this.wordIndex,
            indexWord: this.indexWord,
            filters: this.filters.source,
            lower: this.lower
        });
    }
    static fromJson(json_string) {
        const data = JSON.parse(json_string);
        const tokenizer = new Tokenizer({
            filters: new RegExp(data.filters),
            lower: data.lower
        });
        tokenizer.wordIndex = data.wordIndex;
        tokenizer.indexWord = data.indexWord;
        return tokenizer;
    }
}
exports.tokenizerFromJson = Tokenizer;
exports.default = Tokenizer;
