webpackHotUpdate(0,{

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _PlaylistImagesComponent = __webpack_require__(184);

	var _PlaylistImagesComponent2 = _interopRequireDefault(_PlaylistImagesComponent);

	var _PlaylistContentComponent = __webpack_require__(185);

	var _PlaylistContentComponent2 = _interopRequireDefault(_PlaylistContentComponent);

	var _SearchBar = __webpack_require__(334);

	var _SearchBar2 = _interopRequireDefault(_SearchBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AwesomeComponent = function (_React$Component) {
		_inherits(AwesomeComponent, _React$Component);

		function AwesomeComponent(props) {
			_classCallCheck(this, AwesomeComponent);

			var _this = _possibleConstructorReturn(this, (AwesomeComponent.__proto__ || Object.getPrototypeOf(AwesomeComponent)).call(this, props));

			_this.state = {
				clicked: false,
				imageid: null,
				once: 0,
				lgShow: false
			};
			return _this;
		}

		_createClass(AwesomeComponent, [{
			key: 'onClick',
			value: function onClick(imageid) {
				if (this.state.clicked === false) {
					this.setState({
						clicked: true,
						imageid: imageid,
						lgShow: true
					});
				} else {
					this.setState({ clicked: false });
				}
			}
		}, {
			key: 'renderPlaylistContent',
			value: function renderPlaylistContent(artist, track, trackUri, previewUrl, i) {
				var _this2 = this;

				var lgClose = function lgClose() {
					return _this2.setState({ lgShow: false });
				};

				if (i < 1) {
					return _react2.default.createElement(_PlaylistContentComponent2.default, { artist: artist, previewUrl: previewUrl, track: track, trackUri: trackUri, show: this.state.lgShow, hd: lgClose });
				}
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.props.playlistImage) {
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_SearchBar2.default, null),
						this.props.playlistImage.map(function (playlistImage, i) {
							return _react2.default.createElement(
								'span',
								{ key: i },
								_react2.default.createElement(_PlaylistImagesComponent2.default, {
									onSomeEvent: this.onClick.bind(this, i),
									imgsrc: this.props.playlistImage[i]
								}),
								this.state.clicked ? this.renderPlaylistContent(this.props.artist[this.state.imageid], this.props.track[this.state.imageid], this.props.trackUri[this.state.imageid], this.props.previewUrl[this.state.imageid], i) : null
							);
						}, this)
					);
				} else {
					return _react2.default.createElement(
						'div',
						null,
						'Loading...'
					);
				}
			}
		}]);

		return AwesomeComponent;
	}(_react2.default.Component);

	exports.default = AwesomeComponent;

/***/ }),

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
						console.log(searchObject.playlists.items.map(function (a) {
							return a.name;
						}));
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