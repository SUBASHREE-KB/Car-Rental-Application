
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login.js';
import Layout from './Pages/Layout.js';
import Register from './Pages/Register.js';
import Agencydb from './Pages/agencydb.js';
import Admindb from './Pages/Admindb.js';
import Customerdb from './Pages/Customerdb.js';
import Display1 from './Pages/Display1.js';
import Display3 from './Pages/Display3.js';
import Display2 from './Pages/Display2.js';
import Display4 from './Pages/Display4.js';
import Display5 from './Pages/Display5.js';
import Display6 from './Pages/Display6.js';
import Display7 from './Pages/Display7.js';
import Display8 from './Pages/Display8.js';
import Display9 from './Pages/Display9.js';
import Booknow from './Pages/Booknow.js';
import Payment from './Pages/Payment.js';
import Aboutus from './Pages/Aboutus.js';
import Contact from './Pages/Contact.js';
import AgencyRequestTable from './Pages/AgencyRequestTable.js';
import History from './Pages/History.js';
import Home from './Pages/Home.js';
import HomeLog from './Pages/HomeLog.js';
import Profile from './Pages/Profile.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/agencydb" element={<Agencydb />} />
            <Route path="/Admindb" element={<Admindb />} />
            <Route path="/Customerdb" element={<Customerdb />} />
            <Route path="/Booknow" element={<Booknow />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Display1" element={<Display1 />} />
            <Route path="/Display2" element={<Display2 />} />
            <Route path="/Display3" element={<Display3 />} />
            <Route path="/Display4" element={<Display4 />} />
            <Route path="/Display5" element={<Display5 />} />
            <Route path="/Display6" element={<Display6 />} />
            <Route path="/Display7" element={<Display7 />} />
            <Route path="/Display8" element={<Display8 />} />
            <Route path="/Display9" element={<Display9 />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/AgencyRequestTable" element={<AgencyRequestTable />} />
            <Route path="/History" element={<History />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/HomeLog" element={<HomeLog />} />
            <Route path="/Profile" element={<Profile />} />

          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
