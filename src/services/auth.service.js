//로컬스토리지 토큰 여부 체크
class AuthService {
    //헤더에서 토큰 값 가져오기
    getHeader() {
        let t = localStorage.getItem('t');
        return JSON.parse(t);
    }
    //로컬스토리지에 토큰 저장
    setStorage(t) {
        return localStorage.setItem('t', JSON.stringify(t));
    }
    //로컬스토리지 데이터 삭제
    removeStorage() {
        return localStorage.removeItem('t');
    }
}

export default new AuthService();
