import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import scrollToSection from '../../util/scroll';
import {
    Nav,
    Footer,
    Promotion,
    Introduction,
    MagnifyingGlass,
    ArrowLogin,
} from '../../components';
import './index.css';

//메인화면
const Home = () => {
    useEffect(() => {
        window.addEventListener('scroll', scrollToSection);
        return () => window.removeEventListener('scroll', scrollToSection);
    }, []);

    const goToTop = () => {
        window.removeEventListener('scroll', scrollToSection);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            <Nav
                title="PieceART"
                ham={false}
                menu_link={{
                    search: <MagnifyingGlass />,
                    login: <ArrowLogin />,
                }}
                modal_link={{}}
            />
            <main>
                <Promotion />
                <Introduction>
                    <div>피사트에서</div>
                    <div>옥션과 투자를 동시에</div>
                    <div>진행합니다</div>
                </Introduction>
                <Introduction>
                    <div>입찰가 확인 후</div>
                    <div>미술품 조각 투자 여부를</div>
                    <div>선택할 수 있습니다</div>
                </Introduction>
                <Introduction>
                    <div>최종 낙찰 회원은</div>
                    <div>미술품을 소유,</div>
                    <div>조각을 구매한 회원은</div>
                    <div>수익금(낙찰가-시작가)을</div>
                    <div>분배받습니다</div>
                </Introduction>
                <Introduction>
                    <div>옥션과 투자를 동시에</div>
                </Introduction>
                <Link to="/" onClick={goToTop}>
                    <div className="top-button-box">
                        <button className="topButton" type="button">
                            go to top
                        </button>
                    </div>
                </Link>
            </main>
            <Footer />
        </>
    );
};

export default Home;
