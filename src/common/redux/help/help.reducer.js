export default (state = '', action) => {
  switch (action.type) {
    case 'HELP_DATA_LOADED':
      return action.payload;
    default:
      return state;
  }
};
