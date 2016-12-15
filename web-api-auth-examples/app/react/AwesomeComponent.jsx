import React from 'react';
import PlaylistImagesComponent from './PlaylistImagesComponent.jsx';
import PlaylistContentComponent from './PlaylistContentComponent.jsx';

class AwesomeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked:false
		}
	}
	

	onClick(){
		if(this.state.clicked === false){
			this.setState({clicked:true})
		}
		else
		{
			this.setState({clicked:false})
		}
	}

	render() {
		if(this.props.playlistImage){
			return (
				<div>
						{this.props.playlistImage.map(function(playlistImage,i){
							return (
								<span key={i}>
									<PlaylistImagesComponent												
												onSomeEvent={this.onClick.bind(this)} 
												imgsrc={this.props.playlistImage[i]}
											/>//Change the below part and put it in child component 
											//to make it simpler and put a id prop on PlaylistImagescomponent
									<PlaylistContentComponent artist = {this.props.artist[i]}/>
								</span>
							)
						},this)}
				</div>
				);	
		}
		else {
			return <div>Loading...</div>
		}
		
	}
}

export default AwesomeComponent;