import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './layouts/header/header';
import './index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<Header />);
