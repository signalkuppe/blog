import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Meteo from './Meteo';

const queryClient = new QueryClient();
const container = document.getElementById('root');
render(
    <QueryClientProvider client={queryClient}>
        <Meteo />
    </QueryClientProvider>,
    container,
);
