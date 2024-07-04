import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NaturalLanguageProcessing from '../components/NaturalLanguageProcessing';
import axios from 'axios';

jest.mock('axios');

describe('NaturalLanguageProcessing Component', () => {
    test('renders the component', () => {
        render(<NaturalLanguageProcessing />);
        expect(screen.getByText('Natural Language Processing')).toBeInTheDocument();
    });

    test('handles text input', () => {
        render(<NaturalLanguageProcessing />);
        const textarea = screen.getByPlaceholderText('Enter text for NLP');
        fireEvent.change(textarea, { target: { value: 'Test input' } });
        expect(textarea.value).toBe('Test input');
    });

    test('submits text for processing and displays result', async () => {
        const mockResponse = { data: { result: 'Processed text' } };
        axios.post.mockResolvedValueOnce(mockResponse);

        render(<NaturalLanguageProcessing />);
        const textarea = screen.getByPlaceholderText('Enter text for NLP');
        fireEvent.change(textarea, { target: { value: 'Test input' } });

        const button = screen.getByText('Process Text');
        fireEvent.click(button);

        const result = await screen.findByText(/Processed text/);
        expect(result).toBeInTheDocument();
    });

    test('displays error message on request failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Request failed'));

        render(<NaturalLanguageProcessing />);
        const textarea = screen.getByPlaceholderText('Enter text for NLP');
        fireEvent.change(textarea, { target: { value: 'Test input' } });

        const button = screen.getByText('Process Text');
        fireEvent.click(button);

        const error = await screen.findByText(/Error: Request failed/);
        expect(error).toBeInTheDocument();
    });
});
