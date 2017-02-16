(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.index = mod.exports;
    }
})(this, function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ReactPainter = undefined;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ReactPainter = exports.ReactPainter = function (_Component) {
        _inherits(ReactPainter, _Component);

        function ReactPainter() {
            var _ref;

            _classCallCheck(this, ReactPainter);

            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_ref = ReactPainter.__proto__ || Object.getPrototypeOf(ReactPainter)).call.apply(_ref, [this].concat(props)));

            _this.hashTable = {};
            _this.rawData = [];

            _this.onMouseDown = function (event) {
                _this.setState({
                    isMouseDown: true
                });

                _this.ctx.moveTo((event.pageX || event.touches[0].pageX) - _this.bcr.left, (event.pageY || event.touches[0].pageY) - _this.bcr.top);
            };

            _this.onMouseUp = function () {
                if (_this.state.isMouseDown) {
                    _this.setState({
                        isMouseDown: false
                    });

                    _this.hashTable = {};

                    // remove duplicates
                    _this.rawData = _this.rawData.filter(function (element) {
                        var key = JSON.stringify(element);
                        var match = Boolean(_this.hashTable[key]);

                        return match ? false : _this.hashTable[key] = true;
                    });
                }
            };

            _this.onMouseMove = function (event) {
                if (_this.state.isMouseDown) {
                    event.preventDefault();

                    var coordinates = [event.pageX || event.touches[0].pageX, event.pageY || event.touches[0].pageY];

                    _this.rawData.push(coordinates);
                    _this.drawOnCanvas(coordinates);
                    _this.props.onUpdate();
                }
            };

            _this.drawOnCanvas = function (coordinates) {
                var _coordinates = _slicedToArray(coordinates, 2),
                    left = _coordinates[0],
                    top = _coordinates[1];

                _this.ctx.lineTo(left - _this.bcr.left, top - _this.bcr.top);
                _this.ctx.stroke();
            };

            _this.state = {
                isMouseDown: false
            };
            return _this;
        }

        _createClass(ReactPainter, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (self && (!this.canvas.getContext || !this.canvas.getBoundingClientRect)) {
                    throw new Error('HTML5 Canvas is not supported in your browser.');
                }
                this.ctx = this.canvas.getContext('2d') || {};
                this.bcr = this.canvas.getBoundingClientRect() || {};
                this.setDefaultAppearance();
            }
        }, {
            key: 'componentWillUpdate',
            value: function componentWillUpdate(nextProps) {
                var _props = this.props,
                    lineThickness = _props.lineThickness,
                    lineColor = _props.lineColor;


                if (lineThickness !== nextProps.lineThickness || lineColor !== nextProps.lineColor) {
                    this.setDefaultAppearance();
                }
            }
        }, {
            key: 'setDefaultAppearance',
            value: function setDefaultAppearance() {
                var _props2 = this.props,
                    lineThickness = _props2.lineThickness,
                    lineColor = _props2.lineColor,
                    lineStyle = _props2.lineStyle;


                this.ctx.lineWidth = lineThickness;
                this.ctx.strokeStyle = lineColor;
                this.ctx.lineJoin = this.ctx.lineCap = lineStyle;
                this.ctx.shadowBlur = 2;
                this.ctx.shadowColor = this.props.lineColor;
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props3 = this.props,
                    className = _props3.className,
                    height = _props3.height,
                    width = _props3.width,
                    style = _props3.style;


                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('canvas', {
                        ref: function ref(canvas) {
                            return _this2.canvas = canvas;
                        },
                        className: '' + className,
                        width: width,
                        height: height,
                        style: style,
                        onMouseDown: this.onMouseDown,
                        onTouchStart: this.onMouseDown,
                        onMouseUp: this.onMouseUp,
                        onTouchEnd: this.onMouseUp,
                        onMouseMove: this.onMouseMove,
                        onMouseOut: this.onMouseUp })
                );
            }
        }]);

        return ReactPainter;
    }(_react.Component);

    ReactPainter.propTypes = {
        className: _react.PropTypes.string,
        width: _react.PropTypes.number,
        height: _react.PropTypes.number,
        style: _react.PropTypes.object,
        lineThickness: _react.PropTypes.number,
        lineColor: _react.PropTypes.string,
        lineStyle: _react.PropTypes.string,
        onUpdate: _react.PropTypes.func
    };
    ReactPainter.defaultProps = {
        className: 'react-painter',
        width: 800,
        height: 600,
        style: {
            border: '1px solid #ccc'
        },
        lineThickness: 10,
        lineColor: '#333333',
        lineStyle: 'round', // acceptable: bevel, round, miter
        onUpdate: function onUpdate() {}
    };
    exports.default = ReactPainter;
});