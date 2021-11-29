import { AsyncStorage } from "AsyncStorage";
import Axios from "axios";

export function dateFormat (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear']().toString().substr(2); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}

export function convertUTCTime (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear'](); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}


export async function fn_tokenValid (res){
  let returnData = "valid";
  if (res.hasOwnProperty("error")) {
    if (res.error === "invalid_token") {
      // //1. refresh토큰의 만료여부를 판단
      // //2. 만료되었을경우 로그인페이지로 이동
      // //3. 만료되지 않았을 경우, refresh토큰을 이용해 accessToken재 발급

      let refreshToken = '';
      AsyncStorage.getItem("refreshToken", (err, result) => {
        refreshToken = result;
      });

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic b3Blbm1jcC1jbGllbnQ6b3Blbm1jcC1zZWNyZXQ=`,
        },
      };

      const url = `/oauth/token`;
      const data = `grant_type=refresh_token&refresh_token=${refreshToken}`;

      await Axios.post(url, data, config).then((res, err) => {
        if (res.data.access_token !== "fail") {
          AsyncStorage.setItem("token", res.data.access_token);
          AsyncStorage.setItem("refreshToken", res.data.refresh_token);
          console.log("refresh");
          returnData = "refresh";
        } else {
          console.log("expired1");
          returnData = "expired";
        }
        
      }).catch((err) => {
        alert(err);
      });
    } else {
      console.log("expired2");
      returnData = "expired";
    }
    return returnData;
  } else {
    console.log("valid");
    returnData = "valid";
    return returnData;
  }



}

export function fn_goLoginPage(history){
  alert("인증이 만료되어 로그인페이지로 이동합니다.");
  AsyncStorage.setItem("token", null);
  AsyncStorage.setItem("userName", null);
  AsyncStorage.setItem("roles", null);
  AsyncStorage.setItem("projects", null);
  history.push("/login");
}