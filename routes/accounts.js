const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

// @desc    Get all accounts
// @route   GET /api/accounts
router.get('/', async (req, res, next) => {
  try {
    const { limit, sortby, sortdir } = req.query;

    const accounts = await db('accounts')
      .limit(limit || 50)
      .orderBy(sortby || 'id', sortdir || 'asc');

    res.status(200).json({ count: accounts.length, data: accounts });
  } catch (err) {
    next(err);
  }
});

// @desc    Get single account
// @route   GET /api/accounts
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await db('accounts').where({ id }).first();

    res.status(200).json({ data: account });
  } catch (err) {
    next(err);
  }
});

// @desc    Create account
// @route   POST /api/accounts
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.budget) {
      return res.status(400).json({ message: 'Missing account data!' });
    }

    const id = await db
      .insert({
        name: req.body.name,
        budget: req.body.budget
      })
      .into('accounts');

    const account = await db('accounts').where({ id }).first();

    res.status(201).json({ data: account });
  } catch (err) {
    next(err);
  }
});

// @desc    Update account
// @route   PUT /api/accounts/:id
router.put('/:id', async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.budget) {
      return res.status(400).json({ message: 'Missing account data!' });
    }

    const { id } = req.params;

    await db('accounts').where({ id }).update({
      name: req.body.name,
      budget: req.body.budget
    });

    const account = await db('accounts').where({ id }).first();

    res.status(200).json({ data: account });
  } catch (err) {
    next(err);
  }
});

// @desc    Delete account
// @route   DELETE /api/accounts/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const count = await db('accounts').where({ id }).del();

    res.status(200).json({ message: `${count} record(s) has been deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
