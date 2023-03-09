import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AuthProvider} from "./context/AuthProvider";
import {persistor, store} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvider>
		<Provider store={store}>
			<PersistGate loading={<TopBarProgress/>} persistor={persistor}>
				<App/>
			</PersistGate>
		</Provider>
	</AuthProvider>
);