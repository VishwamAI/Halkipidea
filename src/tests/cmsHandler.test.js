const { processCMSData } = require('../cmsHandler');

describe('processCMSData', () => {
    test('should process valid content data correctly', () => {
        const contentData = {
            title: 'Sample Title',
            body: '  Sample body text.  '
        };
        const result = processCMSData(contentData);
        expect(result).toEqual({
            message: 'CMS data processed successfully',
            processedData: {
                title: 'SAMPLE TITLE',
                body: 'Sample body text.',
                timestamp: expect.any(String)
            }
        });
    });

    test('should throw an error for invalid content data (missing title)', () => {
        const contentData = {
            body: 'Sample body text.'
        };
        expect(() => processCMSData(contentData)).toThrow('Invalid content data');
    });

    test('should throw an error for invalid content data (missing body)', () => {
        const contentData = {
            title: 'Sample Title'
        };
        expect(() => processCMSData(contentData)).toThrow('Invalid content data');
    });

    test('should throw an error for invalid content data (not an object)', () => {
        const contentData = 'Invalid data';
        expect(() => processCMSData(contentData)).toThrow('Invalid content data');
    });
});
