export function loadHome() {
  return dispatch => new Promise((resolve) => {
    setTimeout(() => {
      resolve(
          dispatch({
            type: 'HOME_DATA_LOADED',
            payload: 'Home text',
          }),
        );
    }, 2000);
  });
}

export function loadHomeNewData() {
  return { type: 'LOAD_HOME_NEW_DATA' };
}
