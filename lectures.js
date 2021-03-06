const express = require('express');
const util = require('util');
const fs = require('fs');

const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

// hjalparfall til thess ad na i og lesa gognin.
async function readList() {
  const data = await readFileAsync('./lectures.json');

  // breyta ur streng yfir i object
  const json = JSON.parse(data);
  return json;
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function list(req, res) {
  const title = 'Fyrirlestrar';
  const data = await readList();

  // saekir  lectures ur lectures.js og setur i data
  const { lectures } = data;

  // sendir title og lectures yfir lectures.ejs þar sem þau eru birt.
  res.render('lectures', { title, lectures });
}

async function lecture(req, res, next) { /* eslint-disable-line */
  const { slug } = req.params;

  const data = await readList();

  const { lectures } = data;

  const foundLecture = lectures.find(a => a.slug === slug);

  if (!foundLecture) {
    return next();
  }

  // sendir title og foundLectures yfir lecture.ejs þar sem þau eru birt.
  res.render('lecture', { title: foundLecture.title, foundLecture });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
