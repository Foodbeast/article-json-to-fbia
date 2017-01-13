'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var embedTypes = {
  youtube: function youtube() {
    return {
      figureProps: {
        'data-feedback': 'fb:likes,fb:comments',
        'class': 'op-interactive'
      }
    };
  },
  vine: function vine() {
    return {
      figureProps: {
        'data-feedback': 'fb:likes,fb:comments',
        'class': 'op-interactive'
      }
    };
  },
  spotify: function spotify() {
    return {
      figureProps: {
        'class': 'op-interactive'
      }
    };
  },
  instagram: function instagram() {
    return {
      figureProps: {
        'data-feedback': 'fb:likes,fb:comments',
        'class': 'op-interactive'
      }
    };
  },
  image: function image() {
    return {
      figureProps: {
        'data-feedback': 'fb:likes,fb:comments'
      }
    };
  },
  twitter: function twitter() {
    return {
      figureProps: {
        'class': 'op-interactive'
      }
    };
  },
  tumblr: function tumblr() {
    return {
      figureProps: {
        'class': 'op-interactive'
      }
    };
  },
  jwPlayer: function jwPlayer() {
    return {
      figureProps: {
        'class': 'op-interactive'
      }
    };
  }
};

exports.default = function (items) {
  return items.map(function (item) {
    return item && item.type === 'embed' && embedTypes[item.embedType] ? (0, _objectAssign2.default)(embedTypes[item.embedType](), item) : item;
  });
};