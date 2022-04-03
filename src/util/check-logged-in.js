//로그인한 사용자인지 체크
export default function checkLoggedIn() {
    const t = localStorage.getItem('t');

    if (t) return true;
    else return false;
}
