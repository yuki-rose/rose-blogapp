import axios from "axios";

// ✅ CSRFトークンを取得して設定
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
  axios.defaults.headers.common['X-CSRF-Token'] = token;
}

// ✅ ベースURLなどを指定したい場合はここに追加可能
// axios.defaults.baseURL = '/api';

// ✅ どこでも使えるようにexport
export default axios;