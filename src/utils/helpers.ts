import Cookies from 'universal-cookie';

export function hello() {
  return "hello";
}
export function setToken(token: string) {
  const cookies = new Cookies();
  cookies.set("access_token", `Bearer ${token}`);
}

export function deleteToken() {
  const cookies = new Cookies();
  const token = cookies.get('access_token');
  if (token) {
    cookies.remove('access_token');
  }
  
  return;
}
