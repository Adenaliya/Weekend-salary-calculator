const express = require('express');
const calculationsRouter = express.Router();

let calculations = [];

calculationsRouter.post('/', (req, res) => {
  console.log('/calculations POST', req.body);
  let responseObject = req.body;
  let operator = req.body.operator;

  if (operator === '+') {
    responseObject.result = Number(responseObject.numOne) + Number(responseObject.numTwo);
  } else if (operator === '-') {
    responseObject.result = responseObject.numOne - responseObject.numTwo;
  } else if (operator === '*') {
    responseObject.result = responseObject.numOne * responseObject.numTwo;
  } else if (operator === '/') {
    if (responseObject.numTwo === 0) {
      return res.status(400).send('Division by zero is not allowed.');
    }
    responseObject.result = responseObject.numOne / responseObject.numTwo;
  }

  console.log('User calculations:', responseObject);

  calculations.push(responseObject);

  res.status(201).send(responseObject);
});

module.exports = calculationsRouter;