//메인 화면 섹션 스크롤 기능
export default function scrollToSection() {
    const scrollTo = (start, end, nth) => {
        if (
            window.scrollY > start + window.innerHeight * (nth - 1) &&
            window.scrollY < end + window.innerHeight * (nth - 1)
        ) {
            window.scrollTo({
                top: nth * window.innerHeight,
                behavior: 'smooth',
            });
        }
    };

    const scrollF = () => {
        for (let i = 1; i < 6; i++) {
            scrollTo(100, 130, i);
        }
    };

    return scrollF();
}
