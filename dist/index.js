'use strict';

var _deku = require('deku');

var _magicVirtualElement = require('magic-virtual-element');

var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

var _articleJsonHtmlRender = require('article-json-html-render');

var _articleJsonHtmlRender2 = _interopRequireDefault(_articleJsonHtmlRender);

var _formatItems = require('./format-items');

var _formatItems2 = _interopRequireDefault(_formatItems);

var _embeds = require('embeds');

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable deku/no-unknown-property */

function renderSpotify(_ref) {
  var url = _ref.url,
      height = _ref.height;

  var w = 300;
  // Small and large sizes are supported only
  var h = height <= 80 ? 80 : 380;
  return (0, _magicVirtualElement2.default)('iframe', { src: url, width: w, height: h, frameborder: '0' });
}

var embeds = {
  youtube: function youtube(_ref2) {
    var youtubeId = _ref2.youtubeId;
    return (0, _embeds.render)({ type: 'youtube', youtubeId: youtubeId });
  },
  image: function image(_ref3) {
    var src = _ref3.src;
    return (0, _embeds.render)({ type: 'image', src: src });
  },
  twitter: function twitter(_ref4) {
    var embedAs = _ref4.embedAs,
        text = _ref4.text,
        url = _ref4.url,
        date = _ref4.date,
        user = _ref4.user,
        id = _ref4.id;
    return (0, _magicVirtualElement2.default)(
      'iframe',
      null,
      (0, _embeds.render)({
        type: 'twitter',
        embedAs: embedAs, text: text, url: url, date: date, user: user, id: id
      }),
      (0, _magicVirtualElement2.default)('script', { async: 'true', src: '//platform.twitter.com/widgets.js', charset: 'utf-8' })
    );
  },
  vine: function vine(_ref5) {
    var url = _ref5.url;
    return (0, _embeds.render)({ type: 'vine', url: url, size: 480 });
  },

  // the embeds module adds the instagram embed code, for FBIA the iframe is enough
  instagram: function instagram(_ref6) {
    var url = _ref6.url;
    return (0, _magicVirtualElement2.default)('iframe', { src: (0, _urlJoin2.default)(url, 'embed') });
  },

  spotify: renderSpotify,

  tumblr: function tumblr(_ref7) {
    var did = _ref7.did,
        url = _ref7.url,
        text = _ref7.text;
    return (0, _magicVirtualElement2.default)(
      'iframe',
      null,
      (0, _embeds.render)({ type: 'tumblr', did: did, url: url, text: text }),
      (0, _magicVirtualElement2.default)('script', { async: true, src: 'https://secure.assets.tumblr.com/post.js' })
    );
  },

  jwPlayer: function jwPlayer(_ref8) {
    var src = _ref8.src,
        width = _ref8.width,
        height = _ref8.height,
        scriptSrc = _ref8.scriptSrc;

    return (0, _magicVirtualElement2.default)(
      'iframe',
      {
        width: width,
        height: height,
        frameborder: '0',
        allowfullscreen: true
      },
      (0, _magicVirtualElement2.default)('script', { src: scriptSrc })
    );
  },

  // custom needs to be last
  custom: function custom(_ref9) {
    var src = _ref9.src,
        width = _ref9.width,
        height = _ref9.height,
        secure = _ref9.secure;
    return (0, _embeds.render)({ type: 'custom', src: src, width: width, height: height }) || '';
  }
};

var customCaption = function customCaption(text) {
  return (0, _magicVirtualElement2.default)(
    'figcaption',
    null,
    (0, _magicVirtualElement2.default)(
      'cite',
      null,
      text
    )
  );
};

var Article = (0, _articleJsonHtmlRender2.default)({ embeds: embeds, customCaption: customCaption });

module.exports = function (items) {
  return (0, _deku.renderString)((0, _deku.tree)((0, _magicVirtualElement2.default)(Article, { items: (0, _formatItems2.default)(items || []) }))).replace(/<br><\/br>/g, '<br/>');
}; // fix double br bug