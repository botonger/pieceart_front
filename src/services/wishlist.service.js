import http from '../http-common';
import authService from './auth.service';

//위시리스트 관련 fetch 메서드
class WishlistService {
    //위시리스트 가져오기
    findMyWishlists() {
        return http.get('/users/wishlist', {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //위시리스트 삭제
    deleteWishlist(wishId) {
        return http.delete(`/users/wishlist/${wishId}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //위시리스트 추가
    createWishlist(worksId) {
        return http.get(`/users/wishlist/works/${worksId}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
}

export default new WishlistService();
