import http from '../http-common';
import authService from './auth.service';

//미술품 조각 관련 fetch 메서드
class PiecesService {
    //사용자별 미술품 조각 구매 내역 가져오기
    findMyPieces() {
        return http.get('/users/pieces', {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //조각 구매 취소하기
    deleteMyPieces(pieceId) {
        return http.delete(`/users/pieces/${pieceId}`, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
    //조각 구매하기
    purchasePieces(pieces) {
        return http.post('/users/pieces', pieces, {
            headers: {
                Authorization: 'Bearer ' + authService.getHeader(),
            },
        });
    }
}

export default new PiecesService();
