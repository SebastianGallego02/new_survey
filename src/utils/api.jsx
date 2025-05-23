import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const LOGIN_URL = `${BASE_URL}/token/`;
const LOGOUT_URL = `${BASE_URL}/logout/`;
const USER_URL = `${BASE_URL}/user/`;
const SURVEYUSER_ID = `${BASE_URL}/survey-users-id/`;
const SURVEYUSER_ME_URL = `${BASE_URL}/survey-users/me/`;
const SURVEYUSER_URL = `${BASE_URL}/survey-users`;
const REFRESHTOKEN_URL = `${BASE_URL}/token/refresh/`;
const AUTHENTICATED_URL = `${BASE_URL}/authenticated/`;
const SURVEY_URL = `${BASE_URL}/survey-questions/`;
const SURVEYANSWERS_URL = `${BASE_URL}/survey-answers/`;




const formatError = (error) => {
  return JSON.stringify(
    {
      message: error.message,
      responseData: error.response?.data,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    },
    null,
    2
  );
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { email: email, password: password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

export const refresh_token = async () => {
  try {
    const response = await axios.post(
      REFRESHTOKEN_URL,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

const call_refresh_token = async (error, func) => {
  if (error.response?.status === 401) {
    try {
      await refresh_token();
      const retryResponse = await func();
      return retryResponse.data;
    } catch (refreshError) {
      throw new Error(formatError(refreshError));
    }
  }
  throw new Error(formatError(error));
};

export const get_user = async () => {
  try {
    const response = await axios.get(USER_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return await call_refresh_token(error, () =>
      axios.get(USER_URL, { withCredentials: true })
    );
  }
};

export const get_survey = async () => {
  try {
    const response = await axios.get(SURVEY_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return await call_refresh_token(error, () =>
      axios.get(SURVEY_URL, { withCredentials: true })
    );
  }
};


export const get_surveyer = async () => {
  try {
    const response = await axios.get(SURVEYUSER_ME_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return await call_refresh_token(error, () =>
      axios.get(SURVEYUSER_ME_URL, { withCredentials: true })
    );
  }
};



export const post_answer = async (answerData) => {
  try {
    const response = await axios.post(SURVEYANSWERS_URL, answerData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

export const get_survey_answers = async (user_id) => {
  try {
    const response = await axios.get(`${SURVEYANSWERS_URL}?user_id=${user_id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return await call_refresh_token(error, () =>
      axios.get(`${SURVEYANSWERS_URL}?user_id=${user_id}`, { withCredentials: true })
    );
  }
};


export const get_surveyer_id = async () => {
  try {
    const response = await axios.get(SURVEYUSER_ID, { withCredentials: true });
    return response.data;
  } catch (error) {
    return await call_refresh_token(error, () =>
      axios.get(SURVEYUSER_ID, { withCredentials: true })
    );
  }
};


export const post_surveyer_id = async (formData) => {
  try {
    const response = await axios.post(
      SURVEYUSER_ID,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.non_field_errors?.[0];
    const isDuplicateError = message?.includes('must make a unique set');

    if (isDuplicateError) {
      const patchResponse = await axios.patch(
        SURVEYUSER_ID,
        formData,
        { withCredentials: true }
      );
      return patchResponse.data;
    }
    throw new Error(formatError(error));
  }
};

export const logout_user = async () => {
  try {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true });
    return true;
  } catch (error) {
    throw new Error(formatError(error));
  }
};

export const is_authenticated = async () => {
  try {
    await axios.post(AUTHENTICATED_URL, {}, { withCredentials: true });
    return true;
  } catch (error) {
    throw new Error(formatError(error));
  }
};
