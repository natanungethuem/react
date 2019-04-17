
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Login from './user/user.view.login.js';

axios.defaults.baseURL = 'http://localhost';

ReactDOM.render( <Login/>, document.getElementById('app'));