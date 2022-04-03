import http from '../http-common';

//메인 화면 프로모션 관련 fetch 메서드
class PromotionService {
    //프로모션 목록 가져오기
    findAllPromotion() {
        return http.get('/promotion');
    }
}

export default new PromotionService();
