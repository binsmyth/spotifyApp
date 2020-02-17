webpackHotUpdate(0,{

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SearchBar = function (_React$Component) {
		_inherits(SearchBar, _React$Component);

		function SearchBar(props) {
			_classCallCheck(this, SearchBar);

			var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

			_this.state = {
				query: ''
			};
			return _this;
		}

		_createClass(SearchBar, [{
			key: 'handleSearch',
			value: function handleSearch(e) {
				this.setState({ query: e.target.value });
			}
		}, {
			key: 'handleSubmit',
			value: function handleSubmit(e) {
				fetch("/search?query=" + this.state.query).then(function (searchPromise) {
					searchPromise.json().then(function (searchObject) {
						console.table(searchObject.playlists.items);
					});
				});

				e.preventDefault();
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'form',
						{ onSubmit: this.handleSubmit.bind(this) },
						_react2.default.createElement('input', {
							type: 'text',
							size: '45',
							value: this.state.query,
							onChange: this.handleSearch.bind(this)
						})
					)
				);
			}
		}]);

		return SearchBar;
	}(_react2.default.Component);

	exports.default = SearchBar;

/***/ })

})