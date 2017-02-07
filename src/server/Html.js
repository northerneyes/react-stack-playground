import React, {PropTypes} from 'react';

function Html(props) {
  return (
    <html>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: props.html}}></div>
        <script src="assets/bundle.js"/>
      </body>
    </html>
  )
}

Html.propTypes = {
  html: PropTypes.string.isRequired
};

export default Html;