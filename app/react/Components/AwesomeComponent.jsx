import React from 'react';
import PlaylistImagesComponent from './PlaylistImagesComponent.jsx';
import PlaylistContentComponent from './PlaylistContentComponent.jsx';
import SearchBar from './SearchBar.jsx';

class AwesomeComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			clicked:false,
			imageid:null,
			once:0,
			lgShow: false
		}
	}
	

	onClick(imageid){
		if(this.state.clicked === false){
			this.setState({
				clicked:true,
				imageid: imageid,
				lgShow: true
			})
		}
		else
		{
			this.setState({clicked:false})
		}
	}

	renderPlaylistContent(artist,track,trackUri,previewUrl,i){
		let lgClose = () => this.setState({lgShow: false});

		if(i<1){
			return <PlaylistContentComponent artist = {artist} previewUrl = {previewUrl} track={track} trackUri={trackUri} show = {this.state.lgShow} hd = {lgClose}/>
		}
	}

	render() {
		if(this.props.playlistImage){
			return (
				<div>
				<SearchBar />
				 {this.props.playlistImage.map(function(playlistImage,i){
					return (
					 <span key={i}>
					  <PlaylistImagesComponent												
						onSomeEvent={this.onClick.bind(this,i)} 
						imgsrc={this.props.playlistImage[i]}
					    />
					
							
					    {this.state.clicked ? this.renderPlaylistContent(
					    						this.props.artist[this.state.imageid],
					    						this.props.track[this.state.imageid],
					    						this.props.trackUri[this.state.imageid],
					    						this.props.previewUrl[this.state.imageid],
					    						i
					    						) :null}
					
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