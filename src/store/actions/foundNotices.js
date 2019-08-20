import { SET_FOUND_NOTICES, REMOVE_FOUND_NOTICE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const createFoundNotice = (title, image, location) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch('https://us-central1-post-n-find-dev.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    })
      .then(res => res.json())
      .then(parsedRes => {
        const data = {
          title,
          location,
          image: parsedRes.imageUrl
        };
        return fetch('https://post-n-find-dev.firebaseio.com/foundNotices.json', {
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
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong. Please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const getFoundNotices = () => {
  return dispatch => {
    fetch('https://post-n-find-dev.firebaseio.com/foundNotices.json')
      .then(res => res.json())
      .then(parsedRes => {
        const foundNotices = [];
        for (let key in parsedRes) {
          if (parsedRes.hasOwnProperty(key)) {
            foundNotices.push({
              ...parsedRes[key],
              image: { uri: parsedRes[key].image },
              key
            });
          }
        }
        dispatch(setFoundNotices(foundNotices));
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
    dispatch(removeFoundNotice(key));
    fetch(`https://post-n-find-dev.firebaseio.com/foundNotices/${key}.json`, {
      method: 'DELETE'
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
