import React from 'react';
import {string, object, array} from 'prop-types';

function Html(props) {
  return (
    <html>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: props.html}}></div>
        <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(props.state)}`}}></script>
        <script src="assets/manifest.js"/>
        <script src="assets/vendor.js"/>
        {props.scripts.map(script =>
          <script type="text/javascript" src={`assets/${script}`}/>
        )}
        <script src="assets/app.js"/>
      </body>
    </html>
  )
}

Html.propTypes = {
  html: string.isRequired,
  state: object.isRequired,
  scripts: array.isRequired
};

export default Html;