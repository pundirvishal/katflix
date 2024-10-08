import axios from 'axios';

export const moviesAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesAPI.get('/authentication/token/new');

    if (data.success) {
      localStorage.setItem('request_token', data.request_token);

      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Your authentication token could not be created.');
  }
};

export const createSessionID = async () => {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const { data: { session_id } } = await moviesAPI.post('/authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session_id', session_id);

      if (session_id) {
        window.location.href = '/';
    }

      return session_id;
    } catch (error) {
      console.log('Your session id could not be created.');
    }
  }
};