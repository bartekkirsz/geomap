import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import * as yup from "yup";
import React from "react";
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required(),
});

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {logged: false};
    }

    render() {
        return (
            <Formik
                initialValues={{email: "", lastName: "", username: "", firstName: "", city: "", state: "", zip: ""}}
                onSubmit={async values => {
                    const response = await fetch('/users', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(values),
                    })
                    console.log(await response.json());
                    this.props.setLogged();
                    // setRegistered(true);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
                validationSchema={schema}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;
                    return (
                        <form onSubmit={this.props.setLogged}>
                            <label htmlFor="email" style={{display: "block"}}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={this.props.user.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <label htmlFor="firstName" style={{display: "block"}}>
                                FirstName
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={this.props.user.given_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <label htmlFor="secondName" style={{display: "block"}}>
                                SecondName
                            </label>
                            <input
                                id="secondName"
                                type="text"
                                value={this.props.user.family_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <label htmlFor="username" style={{display: "block"}}>
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <label htmlFor="city" style={{display: "block"}}>
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <label htmlFor="state" style={{display: "block"}}>
                                State
                            </label>
                            <input
                                id="state"
                                type="text"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <label htmlFor="zip" style={{display: "block"}}>
                                Zip
                            </label>
                            <input
                                id="zip"
                                type="text"
                                value={values.zip}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />


                            <button
                                type="button"
                                className="outline"
                                onClick={handleReset}
                                disabled={!dirty || isSubmitting}
                            >
                                Reset
                            </button>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    );
                }}
            </Formik>
        );
    }
}

const setLogged = content => ({
    type: "SET_LOGGED",
    logged: true
});

export default connect(null, {setLogged})(RegisterForm)