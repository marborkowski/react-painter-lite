React Painter Lite
==================

**React Painter Lite** is the **React** **Component** which allows your users to
create very simple drawings.

It uses HTML5 Canvas to output the image, so the user is able to download this
output as a PNG file.

You can also process the received raw data and use it as you wish.
 

Installation
------------
 

```js
npm i react-painter-lite --save
```


How to use
----------

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

Properties
----------

| **Name**      | **Type** | **Default** | **Description**                                                                         |
|---------------|----------|-------------|-----------------------------------------------------------------------------------------|
| className     | String   |             | Sets a class name to give custom styles.                                                |
| width         | Number   | 800         | Specifies the width of the drawing area.                                                |
| height        | Number   |             | Specifies the height of the drawing area.                                               |
| style         | Object   |             | Sets a style to give customized styles to the canvas element.                           |
| blur          | Boolean  | true        | Sets the blur to the line.                                                              |
| lineThickness |          | 10          | Sets the line thickness.                                                                |
| lineColor     | String   | #333333     | Sets the color of the line.                                                             |
| lineStyle     | String   | round       | Sets the style of the line. It can be ```bevel ```, ```round ```, ```miter ```          |
| onUpdate      | Function |             | Callback function that is fired when the user stops drawing.                            |

### License
MIT License

Copyright (c) 2017 Marcin Borkowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
