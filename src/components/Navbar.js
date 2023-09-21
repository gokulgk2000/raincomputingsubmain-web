import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.scss"
import rainlglogo from "../assets/images/raincom_Logo1.png"
const Header = () => {
  return (
    <React.Fragment>
   <div className='px-5'>
      <header id="page-topbar">
        <div className="d-flex justify-content-md-between flex-grow-1 col-md-12  ">
          <div className="d-flex ">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-lg">
                    
                  <img src={rainlglogo} alt="" height="50" />
                </span>
              </Link>
               <h3>Hsuanyeh Law Group,PC</h3>
              {/* <Link to="/" className="logo logo-light  ">
                <span className="logo-sm">
                  <img src={rainlglogo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={rainlglogo} alt="" height="50" />
                </span>
              </Link> */}
            </div>
          </div>
          <div className="d-flex justify-content-md-between " id="">
            {/* <div id="navbox"></div> */}
           
                  <ul id="menunav" className="d-flex">
                    <li id="navmen" className="">
                      <Link to="/">Home</Link>
                    </li>
                    <li id="navmen" className="">
                      <Link to="#">
                        <Link
                          className=""
                          to="#"
                        >
                         ChatPro<sup>TM</sup>
                        </Link>
                      </Link>
                    </li>
                      <li id="navmen" className="">
                        <Link to="#">Help</Link>
                      </li>
                      <li id="navmen" className="">
                        <Link to="#">Requests</Link>
                      </li>
                      <li id="navmen" className="">
                        <Link to="#">Connection</Link>   
                      </li>
                                   
                  </ul>
               <div className='pt-3'>
                  <Link to="/login" className="dropdown">
            {/* <i className="bx bx-log-in-circle font-size-20 align-middle me-1 text-primary" /> */}
            <button id="logbtn" type="button">
              <span>Login</span>
            </button>
          </Link>    
          </div>        {/* <div id="topinput">
            <form >
            <span className="bx bx-search-alt mx-2 bg-primary text-white px-2 py-1" id="topsearch"/>
              <input type="text" placeholder="Search for Attorney..." className="border-0"/>={}
            </form>
          </div> */}
          </div>
        </div>
      </header>
      </div>

      </React.Fragment>
  )
}

export default Header