'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const modelType = 'datastore';
const db = require(`./db-${modelType}`);

const api = express.Router();

//Returns all entries 
api.get('/', async (req, res) => {
  try {
    res.json(await db.list());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
//Get a selected id
api.get('/:id(\\w+)', async (req, res) => {
  try {
    res.send(await db.get(req.params.id));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
//add a particular id
api.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    res.send(await db.post(req.params.id, req.body));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
//update a certain idea
api.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    await db.put(req.params.id, req.body);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
//delete an id if it exists
api.delete('/:id(\\w+)', async (req, res) => {
  try {
    res.send(await db.delete(req.params.id), 204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = api;