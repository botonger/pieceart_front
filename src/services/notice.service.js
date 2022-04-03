import http from '../http-common';
import authService from './auth.service';

//공지사항 관련 fetch 메서드
class NoticeService {
    //공지사항 전체 가져오기
    findAllNotices() {
        return http.get('/notices');
    }
    //특정 공지사항 가져오기
    readNotice(id) {
        return http.get(`/notices/${id}`);
    }
    //페이지별 공지사항 가져오기(10개씩)
    findNoticesByPage(page) {
        return http.get(`/notices?page=${page}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //검색어별 공지사항 가져오기
    findNoticesByPageSearch(search) {
        return http.get(`/notices?search=${search}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //공지사항 등록
    postNotice(notice) {
        return http.post('/admin/notices/', notice, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    //공지사항 수정
    modifyNotice(id, notice) {
        return http.put(`/admin/notices/${id}`, notice, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    //공지사항 삭제
    deleteNotice(id, pass) {
        return http.delete(`/admin/notices/${id}?pass=${pass}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
}

export default new NoticeService();
