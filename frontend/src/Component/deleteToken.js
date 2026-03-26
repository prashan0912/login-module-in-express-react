import Cookies from "js-cookie";

function deleteToken() {
  Cookies.remove("authToken");
  document.cookie = "authToken=; max-age=0; path=/;";
}

export default deleteToken;
