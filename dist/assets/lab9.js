"use strict";



define('lab9/app', ['exports', 'ember', 'lab9/resolver', 'ember-load-initializers', 'lab9/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = window.App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('lab9/components/canvas-graph', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({
    r: "1",
    didInsertElement: function didInsertElement() {
      this.triggerAction({
        action: 'drawCanvas',
        target: this
      });
    },

    actions: {
      drawCanvas: function drawCanvas() {
        function drawCoordinates(context, r) {
          var pixel_transform = 50;
          context.beginPath();
          /*Draw coordianates*/
          context.moveTo(200, 200);
          context.lineTo(200, 0);
          context.lineTo(205, 5);
          context.moveTo(200, 0);
          context.lineTo(195, 5);
          context.moveTo(0, 200);
          context.lineTo(200, 200);
          context.lineTo(200, 400);
          context.moveTo(200, 200);
          context.lineTo(400, 200);
          context.lineTo(395, 205);
          context.moveTo(400, 200);
          context.lineTo(395, 195);
          context.moveTo(0, 200);
          if (r > 0) {
            var pix = r * pixel_transform;
            /*Draw measures*/
            var i = void 0;
            for (i = 200 + pix; i >= 200 - pix; i -= pix / 2) {
              context.moveTo(195, i);
              context.lineTo(205, i);
              context.moveTo(i, 195);
              context.lineTo(i, 205);
            }
          }
          context.strokeStyle = "black";
          context.stroke();
          /*Draw coordinates text*/
          context.font = "16px Georgia";
          context.textBaseline = "top";
          context.textAlign = "left";
          context.fillStyle = "black";
          context.fillText("Y", 210, 0);
          context.textAlign = "right";
          context.textBaseline = "bottom";
          context.fillText("X", 400, 190);
        }

        function drawFigure(context, r) {

          var pixel_transform = 50;
          /*Arc fill*/
          context.beginPath();
          context.arc(199, 201, r / 2 * pixel_transform, 0.5 * Math.PI, Math.PI);
          context.moveTo(199 - r / 2 * pixel_transform, 201);
          context.lineTo(199, 201);
          context.lineTo(199, 201 + r / 2 * pixel_transform);
          /*Triangle fill*/
          context.moveTo(199 - r / 2 * pixel_transform, 199);
          context.lineTo(199, 199);
          context.lineTo(199, 199 - r * pixel_transform);
          context.lineTo(199 - r / 2 * pixel_transform, 199);
          /*Rectangle fill */
          context.rect(201, 201, r * pixel_transform, r / 2 * pixel_transform);
          context.closePath();
          context.fillStyle = "#5c99ED";
          context.fill();
          /*Figure Draw End*/
        }
        function canvasFill(r) {
          var canvas = document.getElementById("graph");

          var context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
          if (r > 0) {
            drawFigure(context, r);
          }
          drawCoordinates(context, r);
        }
        canvasFill(this.get("r"));
      }
    },
    store: _ember.default.inject.service(),
    click: function click(event) {
      alert(this.get("r"));
      var x = (event.clientX - 8 - 200) / 50;
      var y = (event.clientY - 8 - 200) / 50;
      this.get("store").createRecord("point", {
        x: x,
        y: y,
        r: this.get("r")
      }).save();

      this.triggerAction({
        action: 'drawCanvas',
        target: this
      });
    }
  });
});
define('lab9/components/list-of-points', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({});
});
define("lab9/components/login-form", ["exports", "ember"], function (exports, _ember) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _ember.default.Component.extend({
        username: "",
        password: "",
        actions: {
            userLogin: function userLogin() {
                this.get("store").createRecord('user', {
                    username: this.get("username"),
                    password: this.get("password")
                });
            }
        }

    });
});
define('lab9/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define("lab9/controllers/graph", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({
    xVars: ["-3", "-2", "-1", "0", "1", "2", "3", "4", "5"],
    xInp: "",
    yInp: "",
    rInp: 1,
    points: _ember.default.computed(function () {
      return this.get('store').findAll('point');
    }),
    actions: {
      xchangeListener: function xchangeListener(xInp) {
        this.set('xInp', xInp);
      },
      rchangeListener: function rchangeListener(rInp) {
        this.set('rInp', rInp);
      },
      ychangeListener: function ychangeListener(xInp) {
        this.set('yInp', xInp);
      },
      sendPoint: function sendPoint() {
        this.get("store").createRecord('point', {
          x: this.get('xInp'),
          y: this.get('yInp'),
          r: this.get('rInp')
        }).save();
      }
    }

  });
});
define('lab9/helpers/app-version', ['exports', 'ember', 'lab9/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('lab9/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('lab9/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('lab9/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'lab9/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('lab9/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('lab9/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('lab9/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('lab9/initializers/export-application-global', ['exports', 'ember', 'lab9/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('lab9/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('lab9/initializers/store', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('lab9/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("lab9/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define("lab9/models/point", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    x: _emberData.default.attr("number"),
    y: _emberData.default.attr("number"),
    r: _emberData.default.attr("number"),
    isIn: _emberData.default.attr("boolean")
  });
});
define('lab9/models/user', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    isLogged: _ember.default.computed('jwt', function () {
      return !(this.get("jwt") === "" || this.get("jwt") === null);
    }),
    jwt: "",
    username: "",
    password: ""
  });
});
define('lab9/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('lab9/router', ['exports', 'ember', 'lab9/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('graph');
    this.route('ind', { path: '/' });
  });

  exports.default = Router;
});
define('lab9/routes/graph', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    redirect: function redirect() {}
  });
});
define('lab9/routes/ind', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('lab9/routes/ind/login', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('lab9/routes/login', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('lab9/routes/nahui', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('lab9/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("lab9/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+ubaltrZ", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/application.hbs" } });
});
define("lab9/templates/components/canvas-graph", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dabs8N98", "block": "{\"statements\":[[11,\"canvas\",[]],[15,\"class\",\"brd\"],[15,\"id\",\"graph\"],[15,\"width\",\"400\"],[15,\"height\",\"400\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/components/canvas-graph.hbs" } });
});
define("lab9/templates/components/list-of-points", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jlKFQ16M", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/components/list-of-points.hbs" } });
});
define("lab9/templates/components/login-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oC4uLVM3", "block": "{\"statements\":[[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"value\",[34,[[26,[\"urername\"]]]]],[13],[14],[0,\"\\n\"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"value\",[34,[[26,[\"password\"]]]]],[13],[14],[0,\"\\n\"],[11,\"input\",[]],[15,\"type\",\"button\"],[16,\"onclick\",[34,[[33,[\"action\"],[[28,[null]],[28,[\"userLogin\"]]],null]]]],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/components/login-form.hbs" } });
});
define("lab9/templates/graph", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sFV8JiVQ", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[11,\"script\",[]],[13],[0,\"\\n  function drawPoint(context, x, y, isInside){\\n    context.beginPath();\\n    if(isInside){\\n      context.fillStyle = \\\"Green\\\";\\n    } else {\\n      context.fillStyle = \\\"Black\\\";\\n    }\\n    context.arc(x, y, 3, 0*Math.PI, 2*Math.PI);\\n    context.fill();\\n  }\\n\"],[14],[0,\"\\n\"],[1,[33,[\"canvas-graph\"],null,[[\"r\"],[[28,[\"rInp\"]]]]],false],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\nX: \"],[11,\"select\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"xchangeListener\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"xVars\"]]],null,{\"statements\":[[0,\"    \"],[11,\"option\",[]],[16,\"value\",[28,[\"value\"]],null],[13],[1,[28,[\"value\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"value\"]},null],[14],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\nY: \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"ychangeListener\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\nR: \"],[11,\"select\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"rchangeListener\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"xVars\"]]],null,{\"statements\":[[0,\"    \"],[11,\"option\",[]],[16,\"value\",[28,[\"value\"]],null],[13],[1,[28,[\"value\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"value\"]},null],[14],[0,\"\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[11,\"input\",[]],[15,\"type\",\"button\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"sendPoint\"],null],null],[15,\"value\",\"Check point\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/graph.hbs" } });
});
define("lab9/templates/ind", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ldy8cmhh", "block": "{\"statements\":[[0,\"\\n\"],[11,\"h1\",[]],[13],[0,\"LAB 9\"],[14],[0,\"\\n\"],[11,\"h2\",[]],[13],[0,\"Grishin Dmitrii And Norin Evgeniy\"],[14],[0,\"\\n\"],[11,\"h3\",[]],[13],[0,\" 1034 \"],[14],[0,\"\\n\"],[6,[\"link-to\"],[\"graph\"],null,{\"statements\":[[0,\"GRAPH\"]],\"locals\":[]},null],[0,\"\\n\"],[1,[26,[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/ind.hbs" } });
});
define("lab9/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pHv08CkJ", "block": "{\"statements\":[[0,\"LOGIN:\\n\"],[1,[26,[\"login-form\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/login.hbs" } });
});
define("lab9/templates/nahui", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0rGSj5Lu", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "lab9/templates/nahui.hbs" } });
});


define('lab9/config/environment', ['ember'], function(Ember) {
  var prefix = 'lab9';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("lab9/app")["default"].create({"name":"lab9","version":"0.0.0+a6b7804b"});
}
//# sourceMappingURL=lab9.map
