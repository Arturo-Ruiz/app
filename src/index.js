import React from 'react';
import ReactDOM from 'react-dom';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/vendor/icofont/icofont.min.css';
import './Assets/vendor/boxicons/css/boxicons.min.css';
import './Assets/vendor/remixicon/remixicon.css';
import './Assets/vendor/venobox/venobox.css';
import 'antd/dist/antd.css';
import 'aos';
import 'react-dropzone-uploader/dist/styles.css';
import App from './App.jsx';

require('jquery');
require('jquery.easing');

ReactDOM.render(<App />, document.getElementById('root'));
