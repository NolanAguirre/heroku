var express = require('express');
var pgp = require('pg-promise')( /*options*/ )
pgp.pg.defaults.ssl = true;
var db = pgp(process.env.DATABASE_URL);
module.exports = db;
