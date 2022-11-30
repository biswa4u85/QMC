import Config from "../common/Config";
import { message } from 'antd';
import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: Config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

function handleResponse(error) {
  let errorMessage = null
  if (error.response) {
    errorMessage = error.response.data.message
  } else if (error.request) {
    errorMessage = error.request
  } else {
    errorMessage = error.message
  }
  message.error(errorMessage);
  return { 'status': "error", 'data': errorMessage }
}

export function apiPostCall(path, params) {
  let headers = {}
  if (params.token) {
    headers.Authorization = params.token
  }
  if (params.razorPaySignature) {
    headers["x-razorpay-signature"] = params.razorPaySignature
  }
  delete params.token
  delete params.razorPaySignature
  return axiosAPI.post(path, params, { headers: headers })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return handleResponse(error);
    });
}

export function apiPutCall(path, params) {
  let token = params.token
  delete params.token
  return axiosAPI.put(path, params, { headers: { 'Authorization': token } })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return handleResponse(error);
    });
}

export function apiGetCall(path, params) {
  let token = params.token
  delete params.token
  let newUrl = `${path}?`
  for (const key of Object.keys(params)) {
    if (params[key]) {
      newUrl += `${key}=${params[key]}&`
    }
  }
  return axiosAPI.get(newUrl, { headers: { 'Authorization': token } })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return handleResponse(error);
    });
}

export function apiDeleteCall(path, params) {
  let token = params.token
  delete params.token
  return axiosAPI.delete(path, { headers: { 'Authorization': token } })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return handleResponse(error);
    });
}

export function uploadImgApi(file, token) {
  return axiosAPI.get(`${Config.apiBaseUrl}/uploader?filename=${file.name}`, { headers: { 'Authorization': token } })
    .then((response) => {
      let fields = response.data.data.fields
      let url = response.data.data.url
      let myHeaders = new Headers();
      myHeaders.append("key", fields.key);
      const formData = new FormData();
      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value);
      }
      formData.append('file', file);
      return fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: formData,
      })
        .then(response => {
          if (response.status == 204) {
            return `${url}/${fields.key}`
          } else {
            return null
          }
        })
        .catch(error => {
          return handleResponse(error);
        })
    })
    .catch((error) => {
      return handleResponse(error);
    });
}

export function uploadVideoApi(file, token) {
  const data = new FormData();
  data.append('file', file);
  return fetch(`${Config.apiBaseUrl}/videos/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization: token,
    },
    body: data,
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson) {
        return `${responseJson.data[0].url}`
      }
      return null
    }).catch(error => {
      return handleResponse(error);
    });
}