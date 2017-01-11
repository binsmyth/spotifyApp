import React from 'react';

class PlaylistImagesComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
			return (
				<span>
					<img onClick={this.props.onSomeEvent.bind(this)} src={this.props.imgsrc}/>
				</span>
				);			
	}
}

export default PlaylistImagesComponent;