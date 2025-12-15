import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Css from "./css";
import About from "./about";
import Advanced from "./Advanced";
import Advancedjs from "./advancedjs";
import Beginer from "./Beginer"; 
import Express from "./express";
import Html from "./html";
import HTMLProgress from "./HtmlProgress";
import Intermediate from "./intermediate";
import Js from './js';
import Mysql from './mySql';
import Node from './node';
import Practice from './practice';
import ReactApp from './reactt'; 
import Graphql from './graphql';
import Module1 from './module1';
import Module2 from './module2';
import Module3 from './module3';
import Module4 from './module4';
import Module5 from './module5';
import Practicegraphql from './practicegraphql';
import Django from './django';
import Flask from './flask';
import Account from './account';
import Complete from './complete';
import Certificate from "./Certificate";

function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/css" element={<Css />} />
          <Route path="/about" element={<About />} />
          <Route path="/advanced" element={<Advanced />} />
          <Route path="/advancedjs" element={<Advancedjs />} />
          <Route path="/beginer" element={<Beginer />} /> 
          <Route path="/express" element={<Express />} />
          <Route path="/html" element={<Html />} />
          <Route path="/htmlProgress" element={<HTMLProgress />} />
          <Route path="/intermediate" element={<Intermediate />} />
          <Route path="/js" element={<Js />} />
          <Route path="/mysql" element={<Mysql />} />
          <Route path="/node" element={<Node />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/reactt" element={<ReactApp />} /> 
          <Route path='/graphql' element={<Graphql />} />
          <Route path='/module1' element={<Module1 />} />
          <Route path='module2' element={<Module2/>} />
          <Route path='module3' element={<Module3 />} />
          <Route path='module4' element={<Module4 />} />
          <Route path='module5' element={<Module5 />} />
          <Route path='practicegraphql' element={<Practicegraphql/>} />
          <Route path='django' element={<Django/>} /> 
          <Route path='flask' element={<Flask/>} />
          <Route path='account' element={<Account/>} />
          <Route path='complete' element={<Complete/>} />
          <Route path="/certificate/:course" element={<Certificate />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
