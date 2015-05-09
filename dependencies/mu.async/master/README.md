async
=====

Collection of utilities for async development

API
---

### events()

Event emitter

Events are deferred ensuring an asynchronous execution

```js
var log = console.log.bind(console),
    channel = events();

channel.emit('foo');
channel.on('foo', log);
```
