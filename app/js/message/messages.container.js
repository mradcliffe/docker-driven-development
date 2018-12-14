import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadMessage, addMessage } from '../actions';
import MessageComponent from './message.component';
import MessageForm from './message.form';

const mapStateToProps = function mapStateToProps(state) {
  const { message } = state;
  return { messages: message.data };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  const actions = { loadMessage, addMessage };
  return {
    actions: bindActionCreators(actions, dispatch),
    getContent: (id = null) => {
      dispatch(actions.loadMessage(id));
    },
    addContent: (name, message) => {
      const data = {
        author: name,
        message,
      };
      dispatch(actions.addMessage(data));
    },
  };
};

class MessagesContainer extends Component {
  componentDidMount() {
    const { getContent } = this.props;
    getContent();
  }
  sortMessages(a, b) {
    if (a.props.created > b.props.created) {
      return -1;
    } else if (a.props.created < b.props.created) {
      return 1;
    }
    return 0;
  }
  renderItem(item, index) {
    return <MessageComponent key={index} message={item} />;
  }
  render() {
    const { messages, addContent } = this.props;
    return (
      <section className="messages">
        <header className="messages__header">
          <MessageForm addMessage={addContent} />
        </header>
        { messages.sort(this.sortMessages).map(this.renderItem) }
      </section>
    );
  }
}

MessagesContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  getContent: PropTypes.func,
  addContent: PropTypes.func,
};

MessagesContainer.defaultProps = {
  messages: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
