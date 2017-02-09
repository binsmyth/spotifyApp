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
		$.get("/search?query=" + this.state.query, function(data){
				console.log(data);
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