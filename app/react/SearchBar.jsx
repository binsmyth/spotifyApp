import React from 'react';

class SearchBar extends React.Component{
	constructor(props){
		super(props)
		this.state={
			query:''
		}
	}

	handleSearch(e){
		this.setState({query: e.target.value});
	}	

	handleSubmit(e){
		fetch("/search?query=" + this.state.query)
			.then(function(searchPromise){
				searchPromise.json()
					.then(function(searchObject){
						console.log(searchObject.playlists.items.map((a)=>a.name))
				});
			})

		e.preventDefault();
	}

	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
					 type="text"
					 size="45"
					 value={this.state.query}
					 onChange={this.handleSearch.bind(this)}					 
					/>
				</form>
			</div>
			)
	}
}

export default SearchBar;