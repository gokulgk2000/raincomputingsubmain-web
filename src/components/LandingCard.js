import React from 'react'
import { Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap'
import "./landingcard.scss"
import {attImages} from "../helpers/mockData"
const LandingCard = () => {
  const imgIndex = Math.floor(Math.random() * 8)

  return (
    <React.Fragment>
       <div className="mb-2 px-5">
            <div className="app-search ">
              <input
                type="text-success"
                className="form-control "
                placeholder="Search for Attorney..."
                style={{backgroundColor:"#d3d3d3"}}
                // value={searchText}
                // onChange={e => setSearchText(e.target.value)}
              />
              {/* <span className="bx bx-search-alt mt-3" /> */}
            </div>
          </div>
      <Row className='py-5 px-5'>
    <Col >

      <Card className="text-center " id="attcard" >
        <CardBody>
          <div className="d-flex">
            <div id="attimg">
              <img
                className="avatar-xl1"
             
                src={ attImages[imgIndex].url}
                alt="profile image"
              />
            </div>
            <div id="attdetail">
              <div className="mt-1 mx-3">
                <h5 id="attname" className="font-size-16 mb-1 text-primary ">
                </h5>
              </div>{" "}
              <br></br>
            
                <p className="mx-3 text-dark" id="attfirm">
         
                </p>
          
                <p className="mx-3 text-dark" id="attfirm">
                  {" PATTENT ATTORNEY & LAW"}
                </p>
         
              <p className="mx-3 text-muted">Attorney</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div id="prof">
            </div>
            <div className="d-flex mx-3">
                {/* <UncontrolledTooltip
                  placement="bottom"
                >
                  Chat
                </UncontrolledTooltip> */}
                <div id="attmenus">
                  <i className="bx bx-message-square-dots" id="atticon" />
                </div>
            </div>
            <div className="d-flex mx-3">
             
                <div id="attmenus">
                  <i className="bx bx-user-circle" id="atticon" />
                </div>
              {/* <UncontrolledTooltip
                placement="bottom"
             
              >
                Profile
              </UncontrolledTooltip> */}
            </div>
          </div>
        </CardBody>
      </Card>
      </Col>
      <Col>
      <Card className="text-center " id="attcard">
        <CardBody>
          <div className="d-flex">
            <div id="attimg">
              <img
                className="avatar-xl1"
             
                src={ attImages[imgIndex].url}

                alt="profile image"
              />
            </div>
            <div id="attdetail">
              <div className="mt-1 mx-3">
                <h5 id="attname" className="font-size-16 mb-1 text-primary ">
                </h5>
              </div>{" "}
              <br></br>
            
                <p className="mx-3 text-dark" id="attfirm">
         
                </p>
          
                <p className="mx-3 text-dark" id="attfirm">
                  {" PATTENT ATTORNEY & LAW"}
                </p>
         
              <p className="mx-3 text-muted">Attorney</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div id="prof"></div>
            <div className="d-flex mx-3">
                {/* <UncontrolledTooltip
                  placement="bottom"
                >
                  Chat
                </UncontrolledTooltip> */}
                <div id="attmenus">
                  <i className="bx bx-message-square-dots" id="atticon" />
                </div>
            </div>
            <div className="d-flex mx-3">
             
              
                <div id="attmenus">
                  <i className="bx bx-user-circle" id="atticon" />
                </div>
              {/* <UncontrolledTooltip
                placement="bottom"
             
              >
                Profile
              </UncontrolledTooltip> */}
            </div>
          
          </div>
        </CardBody>
      </Card>
      </Col>
      <Col>
      <Card className="text-center " id="attcard">
        <CardBody>
          <div className="d-flex">
            <div id="attimg">
              <img
                className="avatar-xl1"
             
                src={ attImages[imgIndex].url}

                alt="profile image"
              />
            </div>
            <div id="attdetail">
              <div className="mt-1 mx-3">
                <h5 id="attname" className="font-size-16 mb-1 text-primary ">
                </h5>
              </div>{" "}
              <br></br>
            
                <p className="mx-3 text-dark" id="attfirm">
         
                </p>
          
                <p className="mx-3 text-dark" id="attfirm">
                  {" PATTENT ATTORNEY & LAW"}
                </p>
         
              <p className="mx-3 text-muted">Attorney</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div id="prof"></div>
            <div className="d-flex mx-3">
                {/* <UncontrolledTooltip
                  placement="bottom"
                >
                  Chat
                </UncontrolledTooltip> */}
                <div id="attmenus">
                  <i className="bx bx-message-square-dots" id="atticon" />
                </div>
            </div>
            <div className="d-flex mx-3">
             
              
                <div id="attmenus">
                  <i className="bx bx-user-circle" id="atticon" />
                </div>
              {/* <UncontrolledTooltip
                placement="bottom"
             
              >
                Profile
              </UncontrolledTooltip> */}
            </div>
          
          </div>
        </CardBody>
      </Card>
      </Col>
     </Row>
      <Row className='py-5 px-5'>
    <Col >

      <Card className="text-center " id="attcard">
        <CardBody>
          <div className="d-flex">
            <div id="attimg">
              <img
                className="avatar-xl1"
             
                src={ attImages[imgIndex].url}

                alt="profile image"
              />
            </div>
            <div id="attdetail">
              <div className="mt-1 mx-3">
                <h5 id="attname" className="font-size-16 mb-1 text-primary ">
                </h5>
              </div>{" "}
              <br></br>
            
                <p className="mx-3 text-dark" id="attfirm">
         
                </p>
          
                <p className="mx-3 text-dark" id="attfirm">
                  {" PATTENT ATTORNEY & LAW"}
                </p>
         
              <p className="mx-3 text-muted">Attorney</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div id="prof"></div>
            <div className="d-flex mx-3">
                {/* <UncontrolledTooltip
                  placement="bottom"
                >
                  Chat
                </UncontrolledTooltip> */}
                <div id="attmenus">
                  <i className="bx bx-message-square-dots" id="atticon" />
                </div>
            </div>
            <div className="d-flex mx-3">
             
              
                <div id="attmenus">
                  <i className="bx bx-user-circle" id="atticon" />
                </div>
              {/* <UncontrolledTooltip
                placement="bottom"
             
              >
                Profile
              </UncontrolledTooltip> */}
            </div>
          </div>
        </CardBody>
      </Card>
      </Col>
      <Col>
      <Card className="text-center " id="attcard">
        <CardBody>
          <div className="d-flex">
            <div id="attimg">
              <img
                className="avatar-xl1"
             
                src={ attImages[imgIndex].url}

                alt="profile image"
              />
            </div>
            <div id="attdetail">
              <div className="mt-1 mx-3">
                <h5 id="attname" className="font-size-16 mb-1 text-primary ">
                </h5>
              </div>{" "}
              <br></br>
            
                <p className="mx-3 text-dark" id="attfirm">
         
                </p>
          
                <p className="mx-3 text-dark" id="attfirm">
                  {" PATTENT ATTORNEY & LAW"}
                </p>
         
              <p className="mx-3 text-muted">Attorney</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div id="prof"></div>
            <div className="d-flex mx-3">
                {/* <UncontrolledTooltip
                  placement="bottom"
                >
                  Chat
                </UncontrolledTooltip> */}
                <div id="attmenus">
                  <i className="bx bx-message-square-dots" id="atticon" />
                </div>
            </div>
            <div className="d-flex mx-3">
             
              
                <div id="attmenus">
                  <i className="bx bx-user-circle" id="atticon" />
                </div>
              {/* <UncontrolledTooltip
                placement="bottom"
             
              >
                Profile
              </UncontrolledTooltip> */}
            </div>
            
          </div>
        </CardBody>
      </Card>
      </Col>
      <Col>
      <Card className="text-center " id="attcard">
        <CardBody>
          <div className="d-flex">
            <div id="attimg">
              <img
                className="avatar-xl1"
             
                src={ attImages[imgIndex].url}

                alt="profile image"
              />
            </div>
            <div id="attdetail">
              <div className="mt-1 mx-3">
                <h5 id="attname" className="font-size-16 mb-1 text-primary ">
                </h5>
              </div>{" "}
              <br></br>
            
                <p className="mx-3 text-dark" id="attfirm">
         
                </p>
          
                <p className="mx-3 text-dark" id="attfirm">
                  {" PATTENT ATTORNEY & LAW"}
                </p>
         
              <p className="mx-3 text-muted">Attorney</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div id="prof"></div>
            <div className="d-flex mx-3">
                {/* <UncontrolledTooltip
                  placement="bottom"
                >
                  Chat
                </UncontrolledTooltip> */}
                <div id="attmenus">
                  <i className="bx bx-message-square-dots" id="atticon" />
                </div>
            </div>
            <div className="d-flex mx-3">
             
              
                <div id="attmenus">
                  <i className="bx bx-user-circle" id="atticon" />
                </div>
              {/* <UncontrolledTooltip
                placement="bottom"
             
              >
                Profile
              </UncontrolledTooltip> */}
            </div>
           
          </div>
        </CardBody>
      </Card>
      </Col>
     </Row>
   
    
  </React.Fragment>
  )
}

export default LandingCard