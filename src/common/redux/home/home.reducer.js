export default (state = '', action) => {
  switch (action.type) {
    case 'HOME_DATA_LOADED':
      return action.payload;

    case 'HOME_NEW_DATA_LOADED':
      return action.payload;

    default:
      return state;
  }
};
