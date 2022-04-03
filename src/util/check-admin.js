//로그인한 사용자가 관리자인지 체크
export default function checkAdmin() {
    const r = sessionStorage.getItem('r');

    if (r) return true;
    else return false;
}
