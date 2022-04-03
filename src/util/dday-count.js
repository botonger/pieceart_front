import { useState, useEffect } from 'react';

//마감일로부터 남은 시간 계산 기능
export default function DayCounter(children) {
    const [myTime, setMyTime] = useState('');

    const getTime = () => {
        const baseline = new Date(children.children);
        const gap = (baseline.getTime() - new Date().getTime()) / 1000;

        if (gap <= 0) {
            setMyTime('마감');
            return;
        }
        const day = Math.floor(gap / (60 * 60 * 24));
        const hour = Math.floor((gap % (60 * 60 * 24)) / (60 * 60));
        const minute = Math.floor((gap % (60 * 60)) / 60);
        const seconds = Math.floor(gap % 60);

        setMyTime(`${day} 일 ${hour} 시간 ${minute} 분 ${seconds} 초`);
    };

    useEffect(() => {
        let t = setInterval(getTime, 5000);
        return () => clearInterval(t);
    }, [myTime]);

    return myTime;
}
