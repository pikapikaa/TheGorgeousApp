export async function client(
  endpoint: string,
  {body = null, ...customConfig}: RequestInit = {},
) {
  const headers = {'content-type': 'application/json'};
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(endpoint, config).then(async response => {
    if (response.status === 401) {
      return;
    }
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}
