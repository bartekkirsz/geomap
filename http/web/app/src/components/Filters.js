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

export class Filters extends React.Component {


    render() {
        return (
            <div style={{position: "absolute",left: "58vh", "alignText": "right"}}>
                <div>
                    <DropdownButton id="dropdown-basic-button" title="Source Type">
                        <DropdownItem href="#/action-1">Action</DropdownItem>
                        <DropdownItem href="#/action-2">Another action</DropdownItem>
                        <DropdownItem href="#/action-3">Something else</DropdownItem>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Power">
                        <DropdownItem href="#/action-1">Action</DropdownItem>
                        <DropdownItem href="#/action-2">Another action</DropdownItem>
                        <DropdownItem href="#/action-3">Something else</DropdownItem>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Model">
                        <DropdownItem href="#/action-1">Action</DropdownItem>
                        <DropdownItem href="#/action-2">Another action</DropdownItem>
                        <DropdownItem href="#/action-3">Something else</DropdownItem>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Manufacturer">
                        <DropdownItem href="#/action-1">Action</DropdownItem>
                        <DropdownItem href="#/action-2">Another action</DropdownItem>
                        <DropdownItem href="#/action-3">Something else</DropdownItem>
                    </DropdownButton>
                </div>
            </div>
        )
    }
}