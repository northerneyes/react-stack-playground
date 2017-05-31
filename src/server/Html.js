/* eslint-disable react/no-danger */

import React from 'react';
import { string, object, arrayOf } from 'prop-types';

function Html(props) {
  return (
    <html lang="en">
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.html }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(props.state)}` }} />
        <script src={`${props.mainScripts.manifest}`} />
        <script src={`${props.mainScripts.vendor}`} />
        {props.scripts.map(script =>
          <script type="text/javascript" src={`/assets/${script}`} />,
        )}
        <script src={`${props.mainScripts.app}`} />
      </body>
    </html>
  );
}

Html.propTypes = {
  html: string.isRequired,
  state: object.isRequired, // eslint-disable-line react/forbid-prop-types
  scripts: arrayOf(string).isRequired,
  mainScripts: object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Html;
