import * as tf from '@tensorflow/tfjs-node';

export async function assessContentQuality(content) {
    const readabilityScore = calculateReadability(content);
    const accuracyScore = calculateAccuracy(content);
    const relevanceScore = calculateRelevance(content);
    const qualityScore = (readabilityScore + accuracyScore + relevanceScore) / 3;
    return qualityScore;
}

function calculateReadability(content) {
    const words = content.split(/\s+/).length;
    const sentences = content.split(/[.!?]/).length;
    const syllables = content.split(/[aeiouy]+/).length - 1;
    const readabilityScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return readabilityScore;
}

function calculateAccuracy(content) {
    const factualKeywords = ['fact', 'data', 'evidence', 'research', 'study'];
    let accuracyScore = 0;
    factualKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
            accuracyScore += 20;
        }
    });
    accuracyScore = Math.min(accuracyScore, 100);
    return accuracyScore;
}

function calculateRelevance(content) {
    const relevantKeywords = ['Halkipedia', 'AI', 'knowledge', 'content', 'quality'];
    let relevanceScore = 0;
    relevantKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
            relevanceScore += 20;
        }
    });
    relevanceScore = Math.min(relevanceScore, 100);
    return relevanceScore;
}
