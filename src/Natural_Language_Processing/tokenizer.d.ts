declare module './tokenizer' {
    interface TokenizerConfig {
        filters?: RegExp;
        lower?: boolean;
    }

    class Tokenizer {
        constructor(config?: TokenizerConfig);
        cleanText(text: string): string[];
        fitOnTexts(texts: string[]): void;
        textsToSequences(texts: string[]): number[][];
        toJson(): string;
    }

    function tokenizerFromJson(json_string: string): Tokenizer;

    export default Tokenizer;
    export { tokenizerFromJson };
}
