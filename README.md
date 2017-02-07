## Description
Super simple and super naive implementation of server-side rendering + code splitting with react-router v4 and webpack v2.
Main benefit: no need for centralized router config. Main drawback: application is rendered 4 times (twice on client and twice on server).
Also for now you can't have two async routes for the same path.

### NB:
You'll get a react warning about different markup on client and server. That's because of https://github.com/ReactTraining/react-router/issues/4480.

### How to start:

- git clone git@github.com:smashercosmo/react-stack-playground.git
- cd react-stack-playground
- yarn

Then open http://localhost:8000 in your browser.