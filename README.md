## Description
Super simple and super naive implementation of server-side rendering + code splitting with react-router v4 and webpack v2.
Main benefit: no need for centralized router config. Main drawback: application is rendered 4 times (twice on client and twice on server).
Also for now you can't have two async routes for the same path.

### How to start:

- git clone git@github.com:smashercosmo/react-stack-playground.git
- cd react-stack-playground
- yarn

Then open http://localhost:8000 in your browser.
