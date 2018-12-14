
const baseUrl = '/api/message';
const defaultOptions = {
  params: [],
  data: {},
};

const getUrl = function getUrl(action, params = []) {
  return params.reduce((url, param) => `${url}/${encodeURIComponent(param)}`, baseUrl);
};

const getMethod = function getMethod(action) {
  if (action === 'index' || action === 'show') {
    return 'GET';
  }

  return 'POST';
};

export default function messageService(action = 'index', options = defaultOptions) {
  const headers = new Map([
    ['Content-Type', 'application/json'],
    ['Accept', 'application/json'],
  ]);
  const fetchOptions = {
    headers,
    method: getMethod(action),
    body: JSON.stringify(options.data),
  };

  return fetch(getUrl(action, options.params), fetchOptions)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
}
