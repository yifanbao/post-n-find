import { SET_LOST_NOTICES, REMOVE_LOST_NOTICE, START_CREATING_LOST_NOTICE, LOST_NOTICE_CREATED } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startCreatingLostNotice = () => {
  return {
    type: START_CREATING_LOST_NOTICE
  }
};

export const createLostNotice = (title, description, image, location) => {
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
        return fetch(`https://post-n-find-dev.firebaseio.com/lostNotices.json?auth=${authToken}`, {
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
        dispatch(lostNoticeCreated());
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong. Please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const lostNoticeCreated = () => {
  return {
    type: LOST_NOTICE_CREATED
  }
};

export const getLostNotices = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(`https://post-n-find-dev.firebaseio.com/lostNotices.json?auth=${token}`);
      })
      .catch(() => {
        alert('No valid token found :(');
      })
      .then(res => res.json())
      .then(parsedRes => {
        const lostNotices = [];
        for (let key in parsedRes) {
          if (parsedRes.hasOwnProperty(key)) {
            let date = new Date(parsedRes[key].date);
            date = date.toDateString().slice(4);
            lostNotices.push({
              ...parsedRes[key],
              image: { uri: parsedRes[key].image },
              date,
              key
            });
          }
        }
        dispatch(setLostNotices(lostNotices.reverse()));
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong :(');
      })
  }
};

export const setLostNotices = lostNotices => {
  return {
    type: SET_LOST_NOTICES,
    lostNotices
  }
};

export const deleteLostNotice = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found :(');
      })
      .then(token => {
        dispatch(removeLostNotice(key));
        return fetch(`https://post-n-find-dev.firebaseio.com/lostNotices/${key}.json?auth=${token}`, {
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

export const removeLostNotice = key => {
  return {
    type: REMOVE_LOST_NOTICE,
    key
  }
};
