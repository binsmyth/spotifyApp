import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
						playlistImage: null,
						artist : null,
        				track : null,
        				previewUrl : null,
        				trackUri: null,				
		};
	}

	componentDidMount(){
		let intervals = setInterval(function(){
			this.setState({
				playlistImage:JSON.parse(localStorage.getItem('playlistImage')),
				artist: JSON.parse(localStorage.getItem('artist')),
				track: JSON.parse(localStorage.getItem('track')),
				previewUrl: JSON.parse(localStorage.getItem('previewUrl')),
				trackUri: JSON.parse(localStorage.getItem('trackUri'))
			});
			if(this.state.playlistImage !== null){
				clearInterval(intervals);
			}
		}.bind(this),3000);
	}

	render() {
		var target = this;
		return (
			<div>
			 <AwesomeComponent playlistImage = {this.state.playlistImage} artist={this.state.artist}/>			
			</div>
			)
	}
}

render(<App />, document.getElementById('app'));