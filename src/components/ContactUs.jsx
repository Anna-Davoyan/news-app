import React, {Component} from "react";

class ContactUs extends Component {

    state = {
        name: '',
        email: '',
        message: '',
        thankYouMessage: false,
        loading: false,
        errors: {
            name: false,
            email: false,
            message: false,
        }
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        let errors = this.state.errors;
        const validEmailRegex =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        switch (name) {
            case 'name':
                errors.name =
                    !(value.length > 2);
                break;
            case 'email':
                errors.email =
                    !validEmailRegex.test(value);
                break;
            case 'message':
                errors.message =
                    !(value.length > 5);
                break;
            default:
        }
        this.setState({errors, [name]: value})

    };

    onClose = () => {
        this.props.closeModal();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const error = this.state.errors;
        const state = this.state;
        if ((!state.name && state.email !== '' && state.message !== '') && (!error.name && !error.email && !error.message) ) {
                setTimeout(() => {
                    this.setState({
                        thankYouMessage: false
                    })
                    this.onClose();
                }, 2000)

                setTimeout(() => {
                    this.setState({
                        thankYouMessage: true,
                        loading: false,
                        errors: {
                            name: false,
                            email: false,
                            message: false,
                        }
                    })

                }, 500);

                this.setState({
                    loading: true
                })
        } else {
            this.setState({
                errors: {
                    name: true,
                    email: true,
                    message: true,
                }

            })
        }
    };


    render() {
        let modalState;
        if (this.props.showHideModal) {
            modalState = 'block'
        } else {
            modalState = 'none'
        }
        return (
            <div style={{display: modalState}} id="myModal" className="modal">
                <div className="modal-content">
                    <div style={{display: (!this.state.thankYouMessage) ? 'block' : 'none'}}>
                        <span onClick={this.onClose} className="close">&times;</span>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    type="name"
                                    className="form-control"
                                    id="exampleInputName"
                                    aria-describedby="nameHelp"
                                />
                                <small className="text-danger">
                                    {(this.state.errors.name) ? 'Name must be 3 characters long!' : ''}
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"/>
                                <small className="text-danger">
                                    {(this.state.errors.email) ? 'Email is not valid!' : ''}
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Message</label>
                                <textarea
                                    name='message'
                                    onChange={this.handleChange}
                                    value={this.state.message}
                                    className="form-control"
                                    id="exampleFormControlTextarea1" rows="3"
                                />
                                <small className="text-danger">
                                    {(this.state.errors.message) ? 'Name must be 5 characters long!' : ''}
                                </small>
                            </div>
                            <button
                                onClick={this.handleSubmit}
                                type="submit"
                                className="btn btn-color">
                                Send
                            </button>
                        </form>
                    </div>
                    <div style={{display: (this.state.loading) ? 'block' : 'none'}}>
                        <div className='overlay'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>


                    <div
                        className='thankYouMessage'
                        style={{display: (this.state.thankYouMessage && !this.state.loading) ? 'block' : 'none'}}
                    >
                        Thanks for contacting us!
                    </div>
                </div>

            </div>
        )

    }
}

export default ContactUs