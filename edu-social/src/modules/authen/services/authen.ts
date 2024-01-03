import request from '../../core/utils/request';
import { setAccessToken } from '../../core/utils/cookies';

export async function login(email: string, password: string) {
  const response = await request({
    url: '/auth/login',
    method: 'post',
    data: { email: email, password: password },
  });
  if (response.token) {
    const token = response.token as string;
    setAccessToken(token);
  }
}
