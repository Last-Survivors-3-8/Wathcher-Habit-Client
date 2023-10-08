import api from '../../lib/api';

const loginAndRedirect = async (loginData, nickname, navigate) => {
  try {
    const response = await api.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/login`,
      { email: loginData },
      { withCredentials: true },
    );

    const accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);

    navigate(`/my-habit/${nickname}`);
  } catch (error) {
    console.error(error);
    throw new Error('로그인에 문제가 발생했습니다.');
  }
};

export default loginAndRedirect;
