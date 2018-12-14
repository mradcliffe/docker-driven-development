import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageComponent extends Component {
  formatDate(time) {
    const date = new Date(time);

    return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}  ${date.getHours()}:${date.getMinutes()}`;
  }
  render() {
    const { message } = this.props;
    const { author, id, props } = message;
    const createdOn = this.formatDate(props.created * 1000);
    return (
      <article className="message panel my-2 p-2" id={`message${id}`}>
        <aside className="meta border-bottom">
          <span className="authoredBy">{ author.props.name }</span> on <time dateTime={ createdOn }>{ createdOn }</time>
        </aside>
        <div className="message-text">{ props.text }</div>
      </article>
    );
  }
}

MessageComponent.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageComponent;
