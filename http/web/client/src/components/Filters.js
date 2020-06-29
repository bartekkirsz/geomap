import * as React from "react";
import {
    Button,
    DropdownButton,
    DropdownItem, Form,
    FormCheck,
    FormControl,
    FormGroup,
    FormLabel,
    Row,
    Col
} from "react-bootstrap";
import {connect} from "react-redux";
import {addEnergySources, setPowerFilter, setPriceFilter, setSourceTypeFilter} from "../redux/actions";

class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            source_type: '',
            power: '',
            price: ''
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        fetch('/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.props)
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(json => {
                        console.log(json)
                        // this.setState({energy_sources: json});
                        this.props.addEnergySources(json);
                    })
                }
            });
    }

    onSourceType = (filter_type, filter_by) => {
        fetch('/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"filter_type": filter_type, "filter_by": filter_by})
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(json => {
                        console.log(json)
                        this.setState({energy_sources: json});
                        this.props.addEnergySources(this.state.energy_sources);
                    })
                }
            });
    }

    onPower = (filter_type, filter_by) => {
        fetch('/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"filter_type": filter_type, "filter_by": filter_by})
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(json => {
                        console.log(json)
                        this.setState({energy_sources: json});
                        this.props.addEnergySources(this.state.energy_sources);
                    })
                }
            });
    }

    onPrice = (filter_type, filter_by) => {
        fetch('/filter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"filter_type": filter_type, "filter_by": filter_by})
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(json => {
                        console.log(json)
                        this.setState({energy_sources: json});
                        this.props.addEnergySources(this.state.energy_sources);
                    })
                }
            });
    }


    render() {
        return (
            <div>
                <div>
                    <div style={{maxWidth: '100vh', position: 'relative', float: 'left'}}>
                        <FormLabel>Źródło energii</FormLabel>
                        <FormControl size="sm" as="select"
                                     onChange={((event) => this.props.setSourceTypeFilter(event.target.value))}>
                            <option value="--Wszystkie--">--Wszystkie--</option>
                            <option value="biomasa">Biomasa</option>
                            <option value="fotowoltaika">Fotowoltaika</option>
                            <option value="kolektory_sloneczne">Kolektory Sloneczne</option>
                            <option value="turbina_wiatrowa">Turbina Wiatrowa</option>
                            <option value="pompa_ciepla">Pompa Ciepła</option>
                            <option value="geotermia">Geotermia</option>
                            <option value="elektrownia_wodna">Elektrownia Wodna</option>
                        </FormControl>
                    </div>

                    <div style={{float: 'left'}}>
                        <FormLabel>Moc</FormLabel>
                        <FormControl size="sm" as="select" onChange={((event) => this.props.setPowerFilter(event.target.value))}>
                            <option value="--Wszystkie--">--Wszystkie--</option>
                            <option value="300">do 300W</option>
                            <option value="700">od 300W i do 700W</option>
                            <option value="2000">od 700W i do 2000W</option>
                            <option value="4000">od 2000W i do 4000W</option>
                            <option value="8000">od 4000W i do 8000W</option>
                            <option value="15000">do 8000W i do15000W</option>
                        </FormControl>
                    </div>


                    <div style={{float: 'left'}}>
                        <FormLabel>Cena</FormLabel>
                        <FormControl size="sm" as="select" onChange={((event) => this.props.setPriceFilter(event.target.value))}>
                            <option value="--Wszystkie--">--Wszystkie--</option>
                            <option value="10000">do 10 000 zl</option>
                            <option value="50000">od 10 000 zl do 50 000 zl</option>
                            <option value="300000">od 50 000 zl i do 300 000 zl</option>
                            <option value="500000">od 300 000 zl i do 500 000 zl</option>
                        </FormControl>
                    </div>


                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.filters;
}

export default connect(mapStateToProps, {addEnergySources, setPriceFilter, setSourceTypeFilter, setPowerFilter})(Filters);