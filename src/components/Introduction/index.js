import './index.css';
import { React } from 'react';

//메인페이지 소개 (섹션) 컴포넌트
const Introduction = ({ children }) => {
    return <div className="introduction">{children}</div>;
};

export default Introduction;
