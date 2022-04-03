import './App.css';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
// import { Home, Search } from './pages';

const LogIn = loadable(() => import('./pages/LogIn'));
const Home = loadable(() => import('./pages/Home'));
const SignUp = loadable(() => import('./pages/SignUp'));
const Search = loadable(() => import('./pages/Search'));
const Notice = loadable(() => import('./pages/Notice'));
const MyPage = loadable(() => import('./pages/MyPage'));
const Detail = loadable(() => import('./pages/Detail'));
const LogOut = loadable(() => import('./pages/LogOut'));
const Write = loadable(() => import('./pages/Write'));

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/notice" element={<Notice />} />
            <Route exact path="/notice/write" element={<Write />}>
                <Route path=":id" element={<Write />} />
            </Route>
            <Route exact path="/mypage" element={<MyPage />}>
                <Route path=":id" element={<MyPage />} />
            </Route>
            <Route path="/detail/:worksId" element={<Detail />}>
                <Route path=":worksId" element={<Detail />} />
            </Route>
            <Route exact path="/logout" element={<LogOut />}></Route>
            <Route path="*" element={<Home />} />
        </Routes>
    );
}

export default App;
