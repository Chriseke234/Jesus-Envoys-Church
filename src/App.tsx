import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Sermons from './pages/Sermons';
import Events from './pages/Events';
import Ministries from './pages/Ministries';
import Blog from './pages/Blog';
import LiveStream from './pages/LiveStream';
import Contact from './pages/Contact';
import MembersPortal from './pages/MembersPortal';
import Give from './pages/Give';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sermons" element={<Sermons />} />
        <Route path="events" element={<Events />} />
        <Route path="ministries" element={<Ministries />} />
        <Route path="blog" element={<Blog />} />
        <Route path="live" element={<LiveStream />} />
        <Route path="contact" element={<Contact />} />
        <Route path="portal" element={<MembersPortal />} />
        <Route path="give" element={<Give />} />
      </Route>
    </Routes>
  );
}

export default App;
