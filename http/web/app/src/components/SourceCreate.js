import {Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import * as React from "react";

export class SourceCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            source_type: '',
            name: '',
            manufacturer: '',
            model: '',
            power: '',
            price: '',
            assembly_data: '',
            description: '',
            photo: '',
            location: '',
            lat: '',
            lng: ''
        }
    }

    handleSourceType(e) {
        this.setState({source_type: e.target.value});
    }

    handleName(e) {
        this.setState({name: e.target.value});
    }

    handleManufacturer(e) {
        this.setState({manufacturer: e.target.value});
    }

    handleModel(e) {
        this.setState({model: e.target.value});
    }

    handlePower(e) {
        this.setState({power: e.target.value});
    }

    handlePrice(e) {
        this.setState({price: e.target.value});
    }

    handleAssemblyData(e) {
        this.setState({assembly_data: e.target.value});
    }

    handleDescription(e) {
        this.setState({description: e.target.value});
    }

    handlePhoto(e) {
        this.setState({photo: e.target.value});
    }

    handleLocation(e) {
        this.setState({location: e.target.value});
    }

    handleLat(e) {
        this.setState({lat: e.target.value});
    }

    handleLng(e) {
        this.setState({lng: e.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        };
        fetch('/energy_sources', requestOptions)
            .then(response => response.json())
            // .then(data => this.setState({ postId: data.id }));
            .then(response => console.log(response))
    }

    render() {
        return (
            <div style={{position: 'absolute', bottom: '20px'}}>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <FormGroup as={Col} controlId="formGridEmail">
                            <FormLabel>Source Type</FormLabel>
                            <FormControl onChange={this.handleSourceType.bind(this)}/>
                        </FormGroup>

                        <FormGroup as={Col} controlId="formGridPassword">
                            <FormLabel>Name</FormLabel>
                            <FormControl onChange={this.handleName.bind(this)}/>
                        </FormGroup>
                    </Row>

                    <FormGroup controlId="formGridAddress1">
                        <FormLabel>Manufacturer</FormLabel>
                        <FormControl onChange={this.handleManufacturer.bind(this)}/>
                    </FormGroup>

                    <FormGroup controlId="formGridAddress2">
                        <FormLabel>Model</FormLabel>
                        <FormControl onChange={this.handleModel.bind(this)}/>
                    </FormGroup>

                    <Row>
                        <FormGroup as={Col} controlId="formGridCity">
                            <FormLabel>Power</FormLabel>
                            <FormControl onChange={this.handlePower.bind(this)}/>
                        </FormGroup>

                        <FormGroup as={Col} controlId="formGridState">
                            <FormLabel>Price</FormLabel>
                            <FormControl onChange={this.handlePrice.bind(this)}/>
                        </FormGroup>

                        <FormGroup as={Col} controlId="formGridZip">
                            <FormLabel>Assembly Date</FormLabel>
                            <FormControl onChange={this.handleAssemblyData.bind(this)}/>
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup as={Col} controlId="formGridCity">
                            <FormLabel>Description</FormLabel>
                            <FormControl onChange={this.handleDescription.bind(this)}/>
                        </FormGroup>

                        <FormGroup as={Col} controlId="formGridState">
                            <FormLabel>Photo</FormLabel>
                            <FormControl onChange={this.handlePhoto.bind(this)}/>
                        </FormGroup>

                        <FormGroup as={Col} controlId="formGridZip">
                            <FormLabel>Location</FormLabel>
                            <FormControl onChange={this.handleLocation.bind(this)}/>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="formGridCity">
                            <FormLabel>Latitude</FormLabel>
                            <FormControl onChange={this.handleLat.bind(this)}/>
                        </FormGroup>
                        <FormGroup as={Col} controlId="formGridCity">
                            <FormLabel>Longtitude</FormLabel>
                            <FormControl onChange={this.handleLng.bind(this)}/>
                        </FormGroup>
                    </Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}