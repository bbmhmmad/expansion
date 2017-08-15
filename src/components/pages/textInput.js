import React from 'react'

import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap'

export default class TextInput extends React.Component{
	render(){
		return(
			<FormGroup controlId={this.props.controlId} >
				<ControlLabel> {this.props.controlId.toUpperCase()} </ControlLabel>
				<FormControl 
					type='text'
					placeholder={this.props.controlId}
					ref={this.props.controlId} />
			</FormGroup>
			)
	}
}