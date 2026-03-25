function getToken() {
  // console.log(document.cookie);
  // return token;
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((c) => c.startsWith("authToken="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}
export default getToken;
