/* eslint-disable react/no-danger */

import React from 'react';
import { string, object, arrayOf } from 'prop-types';

function Html(props) {
  return (
    <html lang="en">
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.html }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(props.state)}` }} />
        <script src="/assets/manifest.js" />
        <script src="/assets/vendor.js" />
        {props.scripts.map(script =>
          <script type="text/javascript" src={`/assets/${script}`} />,
        )}
        <script src="/assets/app.js" />
      </body>
    </html>
  );
}

Html.propTypes = {
  html: string.isRequired,
  state: object.isRequired, // eslint-disable-line react/forbid-prop-types
  scripts: arrayOf(string).isRequired,
};

export default Html;
