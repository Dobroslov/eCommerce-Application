import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import './index.scss';
import store from './store/store';
import { AuthProvider } from './hoc/authProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
