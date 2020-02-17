import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './Components/index.jsx';

//let store = createStore({});

render(
	<App />, 
	document.getElementById('app')
	)