var isDate = require('is-date-object');
var isRegexp = require('is-regexp');

var React = require('react');

var $ = React.createElement;

var Markdown = require('./Markdown');
var Data = require('./Data');
var RegExpBody = require('./RegExpBody');

var styleGuide = require('../style-guide');
var style = {
  number: {
    fontFamily: styleGuide.monoFontFamily,
    background: 'inherit',
    color: '#3B5BB5',
    fontSize: '25px',
  }
};

var Body = React.createClass({
  displayName: 'Body',
  propTypes: {
    body: React.PropTypes.any.isRequired,
  },
  render: function() {
    var body = this.props.body;
    if (typeof body === 'string') {
      return $(Markdown, { source: body });
    }
    if (typeof body === 'number') {
      return $('code', { style: style.number }, body);
    }
    if (React.isValidElement(body)) {
      return $('div', {}, body);
    }
    if (isRegexp(body)) {
      return $(RegExpBody, null, body);
    }
    if (isDate(body)) {
      return $(Data, null, body.toString());
    }
    return $(Data, null, JSON.stringify(body, null, ' '));
  }
});

module.exports = Body;
