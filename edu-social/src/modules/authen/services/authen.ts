import request from '../../core/utils/request';
import { setAccessToken, setCoookieValue } from '../../core/utils/cookies';

export async function login(email: string, password: string) {
  const response = await request({
    url: '/auth/login',
    method: 'post',
    data: { email: email, password: password },
  });
  if (response.content.token) {
    const token = response.content.token as string;
    setAccessToken(token);
  }
  if (response.content.user._id) {
    const userID = response.content.user._id as string;
    setCoookieValue('userID', userID);
    setCoookieValue('user', response.content.user);
  }
  return response;
}
export async function register(data: any) {
  const response = await request({
    url: '/user/register',
    method: 'post',
    data: data,
  });
  return response;
}
