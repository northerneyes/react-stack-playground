export function loadHelp() {
  return dispatch => new Promise((resolve) => {
    setTimeout(() => {
      resolve(
          dispatch({
            type: 'HELP_DATA_LOADED',
            payload: 'Help text',
          }),
        );
    }, 2000);
  });
}
