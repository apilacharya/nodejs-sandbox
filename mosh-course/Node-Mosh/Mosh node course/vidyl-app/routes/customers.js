const { Customer, validate } = require('../models/customers');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    //  Error 400: Bad request
    return res.status(400).send(error.details[0].message);
  }

  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );
    if (!customer)
      return res.status(404).send('No matched content with the given id found');

    res.send(customer);
  });

  router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
      return res.status(404).send('Unable to find the item to delete');
    res.send(customer);
  });

  router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res
        .status(404)
        .send('The customer with the given ID is not found');
    res.send(customer);
  });

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
await customer.save();
  res.send(customer);
});

module.exports = router;
