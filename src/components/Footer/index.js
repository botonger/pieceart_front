import './index.css';

const Footer = () => {
    return (
        <footer>
            <div>
                <a href="https://github.com/shinecheyenne/pieceart" target="_blank">
                    Github
                </a>{' '}
                |{' '}
                <a
                    href="https://ten-fossa-bca.notion.site/289423afa96043ee89ed453b8db0755c"
                    target="_blank"
                >
                    Notion
                </a>
            </div>
            <div>Copyright ⓒ shingonglee. All Rights Reserved</div>
            <div>
                본 사이트는 학습용 구현 사이트로 케이옥션 사이트의 이미지, 문자 등의 자료 일부를
                이용하였으니, 케이옥션 사이트의 정책에 따라 주시기 바랍니다. <br />
                케이옥션 사이트의 이미지 및 영상, 문자 등의 자료 또는 정보(웹사이트 화면 포함)에
                대한 무단복제, 전송, 배포, 크롤링/스크래핑 등의 행위는 저작권법, 부정경쟁방지 및
                영업비밀보호에 관한 법률 등 관련 법령에 의하여 엄격히 금지됩니다.
            </div>
        </footer>
    );
};

export default Footer;
