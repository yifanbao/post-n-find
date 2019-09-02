import { SET_FOUND_NOTICES, REMOVE_FOUND_NOTICE, START_CREATING_FOUND_NOTICE, FOUND_NOTICE_CREATED } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startCreatingFoundNotice = () => {
  return {
    type: START_CREATING_FOUND_NOTICE
  }
};

export const createFoundNotice = (title, description, image, location) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found :(');
        dispatch(uiStopLoading());
      })
      .then(token => {
        authToken = token;
        return fetch(`https://us-central1-post-n-find-dev.cloudfunctions.net/storeImage`, {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
      })
      .then(res => res.json())
      .then(parsedRes => {
        const data = {
          title,
          description,
          location,
          image: parsedRes.imageUrl,
          date: new Date()
        };
        return fetch(`https://post-n-find-dev.firebaseio.com/foundNotices.json?auth=${authToken}`, {
          method: 'POST',
          body: JSON.stringify(data)
        })
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong. Please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        dispatch(foundNoticeCreated());
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong. Please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const foundNoticeCreated = () => {
  return {
    type: FOUND_NOTICE_CREATED
  }
};

export const getFoundNotices = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(`https://post-n-find-dev.firebaseio.com/foundNotices.json?auth=${token}`);
      })
      .catch(() => {
        alert('No valid token found :(');
      })
      .then(res => res.json())
      .then(parsedRes => {
        const foundNotices = [];
        for (let key in parsedRes) {
          if (parsedRes.hasOwnProperty(key)) {
            let date = new Date(parsedRes[key].date);
            date = date.toDateString().slice(4);
            foundNotices.push({
              ...parsedRes[key],
              image: { uri: parsedRes[key].image },
              date,
              key
            });
          }
        }
        dispatch(setFoundNotices(foundNotices.reverse()));
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong :(');
      })
  }
};

export const setFoundNotices = foundNotices => {
  return {
    type: SET_FOUND_NOTICES,
    foundNotices
  }
};

export const deleteFoundNotice = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found :(');
      })
      .then(token => {
        dispatch(removeFoundNotice(key));
        return fetch(`https://post-n-find-dev.firebaseio.com/foundNotices/${key}.json?auth=${token}`, {
          method: 'DELETE'
        });
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Notice deleted!');
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong :(');
      })
  };
};

export const removeFoundNotice = key => {
  return {
    type: REMOVE_FOUND_NOTICE,
    key
  }
};
