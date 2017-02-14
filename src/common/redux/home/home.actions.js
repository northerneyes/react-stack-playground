export function loadHome() {
  return dispatch => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          dispatch({
            type: 'HOME_DATA_LOADED',
            payload: 'Home text'
          })
        );
      }, 2000);
    });
  }
}