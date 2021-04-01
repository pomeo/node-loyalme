Loyalme
============

Loyalme module that allows you to communicate with the Loyalme API from node.js

## Installation

```
npm install loyalme
```

## Usage

```js
// Import a module
import Loyalme from 'loyalme';
// Create an instance with your API credentials
const loyalme = Loyalme({
  url: 'loyaltycrm.ru/api',
  token: 'token',
  brandId: 1,
  pointId: 2,
  personId: 3
});

// Get things done
loyalme.client({
  externalId: '12345',
  email: 'user@email.com',
  phone: '1111111111',
  name: 'User',
  lastName: 'Userlastname',
  birthdate: '2000-01-03'
}).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```
