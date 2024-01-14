import Cookies from 'universal-cookie';
import { User } from '../models';
const accessToken = 'accessTokenEduSocial';
const cookie = new Cookies();
export function getAccessToken() {
  return cookie.get(accessToken);
}
export function getUser() {
  const value = cookie.get('user');
  return value as User;
}
export function getValueByKey(key: string): any {
  if (!key) return;
  const value = cookie.get(key);
  return value;
}
export function setAccessToken(token = '', options = {}) {
  return cookie.set(accessToken, token, options);
}
export function setCoookieValue(key = '', value = '', options = {}) {
  if (!key) return;
  return cookie.set(key, value, options);
}
export function removeAccessToken() {
  if (getAccessToken()) {
    return cookie.remove(accessToken);
  }
}
