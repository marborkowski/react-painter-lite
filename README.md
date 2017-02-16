react-painter
===========================

## Installation

`npm i react-painter-lite --save`

```js
import React from 'react';
import ReactPainter from 'react-painter-lite';

const props = {
    onUpdate: (raw) => {
        console.log(`Update: ${raw}`);
    }
};

const App = () => <ReactPainter {...props} />;
```
