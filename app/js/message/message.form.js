import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.message = null;
    this.name = null;

    this.setRef = this.setRef.bind(this);
    this.submit = this.submit.bind(this);
  }
  setRef(el) {
    if (el.hasAttribute('name')) {
      this[el.getAttribute('name')] = el;
    }
  }
  submit(event) {
    const { addMessage } = this.props;
    const name = this.name.value;
    const message = this.message.value;
    event.preventDefault();
    addMessage(name, message);
    this.message.value = '';
  }
  render() {
    return (
      <form id="messageForm" className="d-flex flex-column w-75 m-auto justify-content-center align-content-start px-3" onSubmit={this.submit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input id="name" className="form-control" type="text" name="name" ref={this.setRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="newMessage" className="sr-only">New Message</label>
          <textarea id="newMessage" className="form-control" cols="40" rows="2" name="message" ref={this.setRef} required></textarea>
        </div>
        <div className="actions align-self-end">
          <button className="btn btn-primary" name="save">Save</button>
        </div>
      </form>
    );
  }
}

MessageForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
};

export default MessageForm;
