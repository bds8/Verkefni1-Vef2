const path = require('path');
const express = require('express');

const lectures = require('./lectures');

const content = require('./content');

const app = express();
// sendir content
app.locals.setContent = content;

const hostname = '127.0.0.1';
const port = 3000;

app.set('views', path.join(__dirname, 'views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// saekir gogin i public moppunni
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', lectures);

// Villu medhondlun 404
function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = 'Síða fannst ekki';
  const message = 'Ó nei, efnið finnst ekki!';
  res.status(404).render('error', { title, message });
}

// Villu medhondlun 500
function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
