var express = require('express');
var router = express.Router();
const upload = require('../plugins/uploadS3');
require('dotenv').config();

/* GET home page. */
router.get('/upload', function(req, res, next) {
  console.log('upload');
  console.log(upload);
  upload(req.query).then(url => {
    console.log('success');
    res.json({url: url});
  }).catch(e => {
    console.log('Errorororo');
    console.log(e);
  });
});

module.exports = router;
