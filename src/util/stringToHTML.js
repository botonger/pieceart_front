//string으로 저장된 태그를 dom 객체로 변환
export default function stringToHTML(string) {
    return <div dangerouslySetInnerHTML={{ __html: string }}></div>;
}
