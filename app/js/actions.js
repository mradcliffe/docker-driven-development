import messageService from './message/message.service';

const FETCH = 'FETCH';
const CREATE = 'CREATE';

const getMessage = function getMessage(data) {
  return { type: FETCH, data };
};

const setMessage = function setMessage(data) {
  return { type: CREATE, data };
};

const loadMessage = (id = null) => (dispatch) => {
  const action = id === null ? 'index' : 'show';
  const options = {
    params: [],
  };
  if (action === 'show') {
    options.params.push(id);
  }
  return messageService(action, options)
    .then(data => dispatch(getMessage(data)))
    .catch(error => console.error(error));
};

const addMessage = data => dispatch => (
  messageService('create', { data })
    .then(result => dispatch(setMessage(result)))
    .catch(error => console.error(error))
);

export { getMessage, setMessage, loadMessage, addMessage };
