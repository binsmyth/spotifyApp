import React from 'react';

class PlaylistContentComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
			return 	<span>{this.props.artist}</span>;			
	}
}

export default PlaylistContentComponent;