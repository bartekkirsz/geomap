import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import * as React from "react";
import ImageUploader from 'react-images-upload';
import {storage} from '../firebase';
import Autocomplete from 'react-google-autocomplete';
import {connect} from "react-redux";
import {addEnergySource} from "../redux/actions";

class SourceCreate extends React.Component {

    constructor(props) {
        super(props);

        this.formRef = React.createRef();
        this.energy_type_ref = React.createRef();
        this.manufacturer_ref = React.createRef();
        this.name_ref = React.createRef();
        this.model_ref = React.createRef();
        this.power_ref = React.createRef();
        this.set_date_ref = React.createRef();
        this.phone_ref = React.createRef();
        this.price_ref = React.createRef();
        this.description_ref = React.createRef();

        this.state = {
            source_type: '',
            name: '',
            manufacturer: '',
            model: '',
            power: 500,
            price: 2000,
            assembly_data: '30-05-2020',
            description: '',
            photo: '',
            location: '',
            user_name: this.props.user ? this.props.user.name : '',
            user_email: this.props.user ? this.props.user.email : '',
            user_picture: this.props.user ? this.props.user.picture : '',
            user_phone: '',
            lat: '',
            lng: ''
        };


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

    handlePhoto = (photo) => {
        this.setState({photo: photo[0]});
    };

    handleLocation(e) {
        this.setState({location: e.target.value});
    }

    handlePhone(e) {
        this.setState({user_phone: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const uploadTask = storage.ref(`images/${this.state.photo.name}`).put(this.state.photo);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // this.setState({progress});
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage.ref('images').child(this.state.photo.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({photo: url});

                    let energy_source = {
                        source_type: this.energy_type_ref.current.value,
                        name: this.name_ref.current.value,
                        manufacturer: this.manufacturer_ref.current.value,
                        model: this.model_ref.current.value,
                        power: this.power_ref.current.value,
                        price: this.price_ref.current.value,
                        user_phone: this.phone_ref.current.value,
                        assembly_data: this.set_date_ref.current.value,
                        description: this.description_ref.current.value,
                        user_name: this.state.user_name,
                        user_email: this.state.user_email,
                        user_picture: this.state.user_picture,
                        photo: this.state.photo,
                        location: this.state.location,
                        lat: this.state.lat,
                        lng: this.state.lng
                    };
                    this.props.addEnergySource(energy_source);
                    this.setState(energy_source);


                    fetch('/energy_sources', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.state)
                    })
                        .then(response => response.json())
                        // .then(data => this.setState({ postId: data.id }));
                        .then(response => console.log(response))
                })
            });

    }

    // showForm() {
    //     this.formRef.current.style.display === 'none' ? this.formRef.current.style.display = 'block' : this.formRef.current.style.display = 'none';
    // }

    render() {
        return (
            <div style={{height: '80vh', width: '60vh', float: 'left'}}>
                <div ref={this.formRef} style={{position: 'static', display: 'inline', bottom: '20px'}}>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Row>
                            <FormGroup as={Col} controlId="formGridEmail">
                                <FormLabel>Typ Źródła Energii</FormLabel>
                                <FormControl size="sm" ref={this.energy_type_ref} as="select"
                                             onChange={this.handleSourceType.bind(this)}>
                                    <option value="biomasa">Biomasa</option>
                                    <option value="fotowoltaika">Fotowoltaika</option>
                                    <option value="kolektory_sloneczne">Kolektory Sloneczne</option>
                                    <option value="turbina_wiatrowa">Turbina Wiatrowa</option>
                                    <option value="pompa_ciepla">Pompa Ciepła</option>
                                    <option value="geotermia">Geotermia</option>
                                    <option value="elektrownia_wodna">Elektrownia Wodna</option>
                                </FormControl>
                            </FormGroup>

                            <FormGroup as={Col} controlId="formGridPassword">
                                <FormLabel>Nazwa</FormLabel>
                                <FormControl size="sm" ref={this.name_ref} value="Fotowoltaika 2.0"
                                             onChange={this.handleName.bind(this)}/>
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup as={Col} controlId="formGridAddress1">
                                <FormLabel>Producent</FormLabel>
                                <FormControl size="sm" ref={this.manufacturer_ref} value="Solar systems"
                                             onChange={this.handleManufacturer.bind(this)}/>
                            </FormGroup>

                            <FormGroup as={Col} controlId="formGridAddress2">
                                <FormLabel>Model</FormLabel>
                                <FormControl size="sm" ref={this.model_ref} value="Super panele"
                                             onChange={this.handleModel.bind(this)}/>
                            </FormGroup>

                            <FormGroup as={Col} controlId="formGridZip">
                                <FormLabel>Telefon</FormLabel>
                                <FormControl size="sm" ref={this.phone_ref} value="4163256"
                                             onChange={this.handlePhone.bind(this)}/>
                            </FormGroup>
                        </Row>


                        <Row>
                            <FormGroup as={Col} controlId="formGridCity">
                                <FormLabel>Moc</FormLabel>
                                <FormControl size="sm" type="number" ref={this.power_ref} value={this.state.power} onChange={this.handlePower.bind(this)}/>
                            </FormGroup>

                            <FormGroup as={Col} controlId="formGridState">
                                <FormLabel>Cena</FormLabel>
                                <FormControl size="sm" type="number" ref={this.price_ref} value={this.state.price}
                                             onChange={this.handlePrice.bind(this)}/>
                            </FormGroup>

                            <FormGroup as={Col} controlId="formGridZip">
                                <FormLabel>Data montażu</FormLabel>
                                <FormControl size="sm" type="date" ref={this.set_date_ref} value={this.state.assembly_data}
                                             onChange={this.handleAssemblyData.bind(this)}/>
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup as={Col} controlId="formGridCity">
                                <FormLabel>Opis</FormLabel>
                                <FormControl size="sm" ref={this.description_ref}
                                             value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                             as="textarea" onChange={this.handleDescription.bind(this)}/>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup as={Col} controlId="formGridState">
                                <FormLabel>Zdjęcie</FormLabel>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Wybierz zdjęcie źródła energii'
                                    onChange={this.handlePhoto.bind(this)}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            </FormGroup>

                            <FormGroup as={Col} controlId="formGridZip">
                                <FormLabel>Lokalizacja</FormLabel>
                                {/*<FormControl*/}
                                {/*             onChange={this.handleLocation.bind(this)}/>*/}
                                <Autocomplete
                                    onPlaceSelected={(place) => {
                                        console.log(place);
                                        this.setState({
                                            location: place.formatted_address,
                                            lat: `${place.geometry.location.lat()}`,
                                            lng: `${place.geometry.location.lng()}`
                                        })
                                    }}
                                    types={['address']}
                                />
                            </FormGroup>
                        </Row>

                        <Button vsize="sm" variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Form>
                </div>
            </div>


        )
    }
}

export default connect(null, {addEnergySource})(SourceCreate);