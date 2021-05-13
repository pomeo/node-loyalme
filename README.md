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
  personId: 3,
  clientId: 4
});
```

### [loyalme.client](https://pomeo.github.io/node-loyalme/modules/api_client.html)

```js
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

### [loyalme.product](https://pomeo.github.io/node-loyalme/modules/api_product.html)

```js
loyalme.product([{
  title: 'ProductName',
  extItemId: 123456
}], [{
  name: 'CategoryName',
  externalId: '123456'
}]).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.category](https://pomeo.github.io/node-loyalme/modules/api_category.html)

```js
loyalme.category([{
  name: 'CategoryName1',
  externalId: '123456'
}, {
  name: 'CategoryName2',
  externalId: '1234567'
}]).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.activityList](https://pomeo.github.io/node-loyalme/modules/api_activity.html)

```js
loyalme.activityList()
.then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.cancelEvent](https://pomeo.github.io/node-loyalme/modules/api_activity.html)

```js
loyalme.cancelEvent()
.then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.fireEvent](https://pomeo.github.io/node-loyalme/modules/api_activity.html)

```js
loyalme.fireEvent()
.then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.deliveryMethod](https://pomeo.github.io/node-loyalme/modules/api_deliverymethod.html)

```js
loyalme.deliveryMethod({
  
}).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.order](https://pomeo.github.io/node-loyalme/modules/api_order.html)

```js
loyalme.order([{
  status: 'new',
  extOrderId: '123',
  amount: '10.00',
  products: [{
    quantity: 1,
    product_id: 2,
    price: '10.00'
  }]
}, {
  status: 'new',
  extOrderId: '12345',
  amount: '10.00',
  products: [{
    quantity: 1,
    product_id: 2,
    price: '10.00'
  }]
}]).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.orderStatus](https://pomeo.github.io/node-loyalme/modules/api_orderstatus.html)

```js
loyalme.orderStatus([{
  title_en: 'StatusName1',
  slug: 'name1',
  is_active: 1
}, {
  title_en: 'StatusName2',
  title_ru: 'ИмяСтатуса',
  slug: 'name2',
  is_active: 1
}]).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.paymentMethod](https://pomeo.github.io/node-loyalme/modules/api_paymentmethod.html)

```js
loyalme.paymentMethod([{
  title_en: 'MethodName1',
  slug: 'name1',
  is_active: 1
}, {
  title_en: 'MathodName2',
  title_ru: 'ИмяМетода',
  slug: 'name2',
  is_active: 1
}]).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.paymentStatus](https://pomeo.github.io/node-loyalme/modules/api_paymentstatus.html)

```js
loyalme.paymentStatus([{
  title_en: 'StatusName1',
  slug: 'name1',
  is_active: 1
}, {
  title_en: 'StatusName2',
  title_ru: 'ИмяСтатуса',
  slug: 'name2',
  is_active: 1
}]).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```

### [loyalme.promocode](https://pomeo.github.io/node-loyalme/modules/api_promocode.html)

```js
loyalme.promocode({
  code: 123,
  activeFrom: '2021-01-01 12:01:30',
  activeTo: '2021-01-14 18:11:35',
  status: 'is_active',
  description: 'content'
}).then(output => {
  console.info(output);
}).catch(err => {
  console.error(err);
});
```
