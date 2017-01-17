import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
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
		this.props.onHide();
	}

	render() {
			return 	(
				<Modal show = {this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
		        <Modal.Header>
		          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		          {this.props.artist.map((element,i)=><div key = {i}><a href="/play">{element}</a></div>)}
		        </Modal.Body>
		        <Modal.Footer>
		          <Button onClick={this.clickHandle.bind(this)}>Close</Button>
		        </Modal.Footer>
		      </Modal>				
				)		
	}
}

export default PlaylistContentComponent;