const { generateRecommendations } = require('./recommendationEngine');

describe('generateRecommendations', () => {
    test('returns recommendations based on user preferences', () => {
        const userData = {
            preferences: ['Item 1', 'Item 2'],
            pastInteractions: []
        };
        const recommendations = generateRecommendations(userData);
        expect(recommendations).toEqual([
            { id: 1, title: 'Recommended Item 1', score: 0.9 },
            { id: 2, title: 'Recommended Item 2', score: 0.85 }
        ]);
    });

    test('returns all recommendations if no preferences match', () => {
        const userData = {
            preferences: ['Non-matching preference'],
            pastInteractions: []
        };
        const recommendations = generateRecommendations(userData);
        expect(recommendations).toEqual([
            { id: 1, title: 'Recommended Item 1', score: 0.9 },
            { id: 2, title: 'Recommended Item 2', score: 0.85 },
            { id: 3, title: 'Recommended Item 3', score: 0.8 }
        ]);
    });

    test('throws an error for invalid user data structure', () => {
        const invalidUserData = {
            preferences: 'Invalid preferences',
            pastInteractions: 'Invalid past interactions'
        };
        expect(() => generateRecommendations(invalidUserData)).toThrow('Invalid user data structure');
    });
});
