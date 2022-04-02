import './App.css';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Editor from './components/Editor';
import MyBlogs from './components/MyBlogs';
import Categories from './components/Categories';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/editor' element={<Editor />} />
          <Route path='/editor/:id' element={<Editor />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/article/:id' element={<BlogPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/myblogs' element={<MyBlogs />} />
          <Route path='/categories' element={<Categories />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
