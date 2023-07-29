const DEFAULT_METHOD = 'POST';

const getData = (url, onSuccess, onError) =>
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch((error) => onError(error));

const sendData = (url, body, onSuccess, onError, method = DEFAULT_METHOD) =>
  fetch(
    url, {
      method,
      body,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      onSuccess();
    })
    .catch(() => {
      onError();
    });

export { getData, sendData };
