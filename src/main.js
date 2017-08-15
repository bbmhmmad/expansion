import React from 'react'
import  {Well,Panel,FormControl,FormGroup,ControlLabel,Button,InputGroup,DropdownButton,Image,Col,Row,MenuItem,Tooltip,OverlayTrigger} from 'react-bootstrap' 

import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AlertContainer from 'react-alert'
import {postUser,updateMsg} from './actions/userActions'
import {browserHistory} from "react-router";

class Main extends React.Component{
	componentDidUpdate(){
		
		if(typeof this.props.current_user !== 'object'){
			console.log('CURRENT USER IS',this.props.current_user)
			browserHistory.push("/new")
		}

	}


	showError(){
		this.msg.removeAll()
		this.msg.error('Please enter a valid email and matching passwords of at least 6 characters.', {
      	time: 200000,
      	type: 'error',
      	offset: 14,
    	position: 'top left',
    	theme: 'dark',
    	transition: 'scale'
    	})
	}

	handleRegistration(){
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(findDOMNode(this.refs.email).value) == true && findDOMNode(this.refs.password).value === findDOMNode(this.refs.confirmation_password).value && findDOMNode(this.refs.password).value.length >= 6 ){
			let user = {
				email:findDOMNode(this.refs.email).value,
				password:findDOMNode(this.refs.password).value,
				admin:findDOMNode(this.refs.admin).value
			}
			
			this.msg.removeAll()

			findDOMNode(this.refs.email).value = ''
			findDOMNode(this.refs.password).value = ''
			findDOMNode(this.refs.confirmation_password).value = ''


			this.props.postUser(user)
			


		}
		else{
			findDOMNode(this.refs.email).value = ''
			findDOMNode(this.refs.password).value = ''
			findDOMNode(this.refs.confirmation_password).value = ''
			this.showError()
		}
		
	}
	render(){
		return(
			<Well>
				<Col xs={12} sm={6}>
					<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
					<Panel>
						<h3>{(this.props.msg)?(this.props.msg):''}</h3>
						<h2>Register</h2>
						<FormGroup controlId='email'>
							<ControlLabel> Email </ControlLabel>
							<FormControl 
								type='text'
								placeholder='Email'
								ref='email' />
						</FormGroup>

						<FormGroup controlId='password'>
							<ControlLabel> Password </ControlLabel>
							<FormControl 
								type='password'
								placeholder='Password'
								ref='password' />
						</FormGroup>

						<FormGroup controlId='confirmation_password'>
							<ControlLabel> Confirm Password </ControlLabel>
							<FormControl 
								type='password'
								placeholder='Confirm Password'
								ref='confirmation_password' />
						</FormGroup>

						<FormGroup controlId='admin'>
							<OverlayTrigger placement="right" overlay={tooltip}>
							<ControlLabel> Admin *  </ControlLabel>
							</OverlayTrigger>
							    <FormControl componentClass="select" placeholder="false" ref='admin'>
							    	<option value="false">no</option>
       								 <option value="true">yes</option>
     						 	</FormControl>
						</FormGroup>

						<Button
						onClick={this.handleRegistration.bind(this)}
						> Register </Button>
					</Panel>
				</Col>
			</Well>
			)
	}
}

const tooltip = (
  <Tooltip id="tooltip"><strong>What is an admin?</strong> Select 'Yes' if you represent a masjid. Otherwise, select 'no'</Tooltip>
);

function mapStateToProps(state){
	return{current_user:state.users.current_user,msg:state.users.msg}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({postUser,updateMsg},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)