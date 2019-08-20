import { CREATE_FOUND_NOTICE, DELETE_FOUND_NOTICE } from './actionTypes';

export const createFoundNotice = (title, image, location) => {
  return dispatch => {
    console.log(image.base64)
    fetch('https://us-central1-post-n-find-dev.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        const data = {
          title,
          location,
          image: parsedRes.imageUrl
        };
        console.log(parsedRes)
        return fetch('https://post-n-find-dev.firebaseio.com/foundNotices.json', {
          method: 'POST',
          body: JSON.stringify(data)
        })
      })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
      });
  };
};

export const deleteFoundNotice = key => {
  return {
    type: DELETE_FOUND_NOTICE,
    key
  };
};
