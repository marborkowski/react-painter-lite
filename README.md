react-painter
===========================

## Installation

`npm i react-painter --save`

```js
import React from 'react';
import ReactPainter from 'react-painter';

const props = {
    onUpdate: (raw) => {
        console.log(`Update: ${raw}`);
    }
};

const App = () => <ReactPainter {...props} />;
```
