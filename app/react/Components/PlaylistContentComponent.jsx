import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import AudioPlayer from 'react-responsive-audio-player';

class PlaylistContentComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist : this.props.artist
		}
	}

	clickHandle(){
		this.setState({
			artist:null
		})
		this.props.hd();
	}

	sendReq(url){
		fetch("/play?id=" + url)
		.then(function(response){
			return response.blob();
		})
	}

	render() {
		var preview = [];
		var list = [];
			return 	(
				<Modal show = {this.props.show} onHide={this.clickHandle.bind(this)} bsSize="large" aria-labelledby="contained-modal-title-lg">
		        <Modal.Header closeButton>
		          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		          {
		          	this.props.artist.map(function(element,i){
		          		preview.push({
		          			url:this.props.previewUrl[i],
		          			displayText: element
		          		});
		          		
		          		list.push(<ul key = {i} id='plList' onClick={
				          				this.sendReq.bind(this,this.props.trackUri[i])
				          			}>
				          			<li>
					          			<div className='plItem'>{element}</div>
					          			<i className="fa fa-spotify" aria-hidden="true"></i>
					          		</li>
				          			</ul>
		          				);
		          		if(i === this.props.artist.length -1){
		          			return (
		          					<div key = {i}>
		          						Preview
			          					<AudioPlayer playlist={preview} hideBackSkip={true} />
			          					<div>&nbsp;</div>
			          					<div>Play in Spotify</div>
			          					{list}								
									</div>
		          				)
		          		}
		          	},this)	  
		          }

		        </Modal.Body>
		        <Modal.Footer>
		          <Button onClick={this.clickHandle.bind(this)}>Close</Button>
		        </Modal.Footer>
		      </Modal>				
				)		
	}
}

export default PlaylistContentComponent;