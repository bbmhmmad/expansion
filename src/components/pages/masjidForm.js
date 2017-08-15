import React from 'react'
import {Well,Panel,FormControl,FormGroup,ControlLabel,Button,InputGroup,DropdownButton,Image,Col,Row,MenuItem} from 'react-bootstrap'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from "react-router";

import TextInput from './textInput.js'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import AlertContainer from 'react-alert'

export default class MasjidForm extends React.Component{
	constructor(props) {
    super(props)
    this.state = { address: 'San Francisco, CA' }
    this.onChange = (address) => this.setState({ address })
  }

  	handleFormSubmit(){
  		

  		geocodeByAddress(this.state.address)
      	.then(results => getLatLng(results[0]))
      	.then(latLng => console.log('Success', latLng))
      	.catch(error => this.msg.error('No result. Try again.',
      		{
		      	time: 200000,
		      	type: 'error',
		      	offset: 14,
		    	position: 'top left',
		    	theme: 'dark',
		    	transition: 'scale'
		    	}
      		))

  	}

	render(){
		  const inputProps = {
      	value: this.state.address,
      	onChange: this.onChange,
    	}

		return(
			<Well>
				<Row>
				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
					<Panel>
						<TextInput controlId = 'name' />
						<b>LOCATION:</b>
							<PlacesAutocomplete inputProps={inputProps} />

					</Panel>
						<Button
							block
							onClick={this.handleFormSubmit.bind(this)}
							> Register </Button>
				</Row>
			</Well>
			)
	}
}