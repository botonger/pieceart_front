import http from '../http-common';
import authService from './auth.service';

//사용자 관련 fetch 메서드
class UserService {
    //회원 가입
    createUser(user) {
        return http.post('/signup', user);
    }
    //회원 탈퇴
    deleteUser() {
        return http.delete(`/users/delete`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }

    //회원정보수정
    editUser(user) {
        return http.put('/users/edit', user, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }

    //로그인
    login(user) {
        return http.post('/login', user);
    }

    //로그아웃
    logout() {
        sessionStorage.removeItem('r');
        localStorage.removeItem('t');
        // return http.get('/users/logout');
    }
}

export default new UserService();
