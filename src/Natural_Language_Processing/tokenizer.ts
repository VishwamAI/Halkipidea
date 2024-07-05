interface TokenizerConfig {
    filters?: RegExp;
    lower?: boolean;
}

class Tokenizer {
    private filters: RegExp;
    private lower: boolean;
    private wordIndex: { [key: string]: number };
    private indexWord: { [key: number]: string };

    constructor(config?: TokenizerConfig) {
        this.filters = config?.filters || /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~\s]+/;
        this.lower = config?.lower || true;
        this.wordIndex = {};
        this.indexWord = {};
    }

    cleanText(text: string): string[] {
        if (this.lower) {
            text = text.toLowerCase();
        }
        return text.split(this.filters).filter(Boolean);
    }

    fitOnTexts(texts: string[]): void {
        const wordSet = new Set<string>();
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

    textsToSequences(texts: string[]): number[][] {
        return texts.map(text => {
            const words = this.cleanText(text);
            return words.map(word => this.wordIndex[word] || 0);
        });
    }

    toJson(): string {
        return JSON.stringify({
            wordIndex: this.wordIndex,
            indexWord: this.indexWord,
            filters: this.filters.source,
            lower: this.lower
        });
    }

    static fromJson(json_string: string): Tokenizer {
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

export default Tokenizer;
export { Tokenizer as tokenizerFromJson };
