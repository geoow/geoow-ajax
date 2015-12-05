# Geoow Ajax
Ajax Service for JSON requests and responses

## Methods
### Ajax.get (url)
```
Ajax.get('/unicorns')
    .then(data => ...)
    .catch(reason => ...);
```
### Ajax.post (url, data)
```
Ajax.post('/unicorns/create', unicorn)
    .then(data => ...)
    .catch(reason => ...);
```
### Ajax.method (type, url, data)
```
Ajax.method('delete', `/unicorns/${unicornId}`, {})
    .then(data => ...)
    .catch(reason => ...);
```
## License
GPL-3.0