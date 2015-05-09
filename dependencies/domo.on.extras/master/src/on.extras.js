define('domo.on.input', function (require) {
  'use strict';

  var on  = require('domo.on'),
      val = require('domo.val');

  var onInput = function (node, listener) {
    on(node, 'input', function (event) {
      event.preventDefault();
      listener(val(this));
    });
  };

  return onInput;
});

define('domo.on.click', function (require) {
  'use strict';

  var on  = require('domo.on');

  var onClick = function (node, listener) {
    on(node, 'click', function (event) {
      event.preventDefault();
      listener();
    });
  };

  return onClick;
});

define('domo.on.submit', function (require) {
  'use strict';

  var on  = require('domo.on');

  var onSubmit = function (node, listener) {
    on(node, 'submit', function (event) {
      event.preventDefault();
      listener();
    });
  };

  return onSubmit;
});
