Basic button:

## complete implementation



```jsx
  var {CustomPlugins} = require('../../../site/data/poc.js');
  <Dante content={CustomPlugins} style={{
          margin: '0 auto',
          width: '80%'
        }}
  />
```

# Empty Editor

### without tooltips and widgets

```jsx
  <Dante content={""} config={{widgets: [], tooltips: []}}/>
```