import http from '../http-common';
import authService from './auth.service';

//입찰 관련 fetch 메서드
class AuctionService {
    //사용자별 입찰 내역 가져오기
    findBidlists() {
        return http.get('/users/auction', {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //입찰 삭제
    deleteBid(auctionId) {
        return http.delete(`/users/auction/${auctionId}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //입찰하기
    createBid(auction) {
        return http.post('/users/auction', auction, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
}

export default new AuctionService();
