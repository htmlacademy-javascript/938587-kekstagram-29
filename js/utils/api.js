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

const sendData = (url, body, onSuccess, onError) =>
  fetch(
    url, {
      method: 'POST',
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

