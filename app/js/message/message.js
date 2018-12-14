const initialState = {
  data: [],
};

export default function message(state = initialState, action) {
  const nextState = Object.assign({}, state);
  const { type } = action;

  switch (type) {
    case 'CREATE':
      nextState.data = nextState.data.concat(action.data);

      return nextState;
    case 'FETCH':
      if (nextState.data.length === 0) {
        nextState.data = action.data;
      } else {
        action.data.forEach((newItem) => {
          const index = nextState.data.findIndex(item => item.id === newItem.id);
          if (index === -1) {
            nextState.data.push(newItem);
          } else {
            nextState[index] = Object.assign(nextState[index], newItem);
          }
        });
      }

      return nextState;
    default:
      return nextState;
  }
}
