import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainUI from './MainUI';
import axios from 'axios';

jest.mock('axios');

describe('MainUI Component', () => {
    test('renders input field, submit button, and initial UI elements', () => {
        render(<MainUI />);
        expect(screen.getByPlaceholderText('Enter input data')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByText('Halkipedia AI Orchestrator')).toBeInTheDocument();
    });

    test('displays error message when submission fails', async () => {
        axios.post.mockRejectedValue(new Error('Submission failed'));
        render(<MainUI />);
        fireEvent.change(screen.getByPlaceholderText('Enter input data'), { target: { value: 'test input' } });
        fireEvent.click(screen.getByText('Submit'));
        const errorMessage = await screen.findByText('An error occurred while submitting the data. Please try again.');
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays response when submission succeeds', async () => {
        const mockResponse = { data: { message: 'Success' } };
        axios.post.mockResolvedValue(mockResponse);
        render(<MainUI />);
        fireEvent.change(screen.getByPlaceholderText('Enter input data'), { target: { value: 'test input' } });
        fireEvent.click(screen.getByText('Submit'));
        const responseMessage = await screen.findByText(/Success/);
        expect(responseMessage).toBeInTheDocument();
    });
});
