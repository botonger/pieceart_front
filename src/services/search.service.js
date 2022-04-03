import http from '../http-common';
import authService from './auth.service';

//작품 목록 관련 fetch 메서드
class SearchService {
    //작품 목록 가져오기
    findSearchlists() {
        return http.get('/works');
    }
    //특정 작품 가져오기
    findSpecificWork(worksId) {
        return http.get(`/works/${worksId}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
}

export default new SearchService();
