import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Col, Collapse, Row } from "reactstrap"
import "./style/case-grid.scss"
import Chevron from "../../../../src/assets/icon/chevron-down.svg"
import profile from "../../../../src/assets/images/avatar-defult.jpg"
import { useToggle } from "../../../../src/rainComputing/helpers/hooks/useToggle"
import DynamicModel from "../modals/DynamicModal"
import CaseMembers from "./CaseMembers"
import CaseFilesGrid from "./CaseFilesGrid"
import DeleteModal from "../modals/DeleteModal"
import { useUser } from "../../../../src/rainComputing/contextProviders/UserProvider"
import {
  LeaveGroup,
  caseIdbySubCase,
} from "../../../../src/rainComputing/helpers/backend_helper"
import toastr from "toastr"
import DocketResultModel from "./models/DocketResultModel"
import EventMaster from "./models/EventMaster"
import DynamicSuspense from "../loader/DynamicSuspense"
import EventCalender from "./models/EventCalender"
import { useHistory } from "react-router-dom"
import SubCase from "./models/SubCase"

const SubCaseGrid = ({
  caseData,
  index,
  active,
  onAccordionButtonClick,
  handleSelectingCase,
  selected,
  notifyCountforCase,
  ongetAllCases,
}) => {
  const history = useHistory()
  const { currentUser } = useUser()
  const [casedetails] = useState(caseData)
  const [caseIdSubCases, setCaseIdSubCases] = useState([])
  const [newCaseId] = useState()
console.log("caseIdSubCases",caseIdSubCases)
  const {
    toggleOpen: membersModelOpen,
    setToggleOpen: setMembersModelOpen,
    toggleIt: toggleMembersModelOpen,
  } = useToggle(false)
  const {
    toggleOpen: leavegroupModalOpen,
    setToggleOpen: setLeaveGroupModalOpen,
    toggleIt: toggleleavegroupModal,
  } = useToggle(false)
  const {
    toggleOpen: filesModelOpen,
    setToggleOpen: setFilesModelOpen,
    toggleIt: toggleFilesModelOpen,
  } = useToggle(false)
  const {
    toggleOpen: docketModelOpen,
    // setToggleOpen: setDocketModelOpen,
    toggleIt: toggleDocketModelOpen,
  } = useToggle(false)
  // const {
  //   toggleOpen: createEventMasterModelOpen,
  //   setToggleOpen: setCreateEventMasterModelOpen,
  //   toggleIt: toggleCreateEventMasterModelOpen,
  // } = useToggle(false)
  const {
    toggleOpen: eventMasterModelOpen,
    setToggleOpen: setEventMasterModelOpen,
    toggleIt: toggleEventMasterModelOpen,
  } = useToggle(false)
  const {
    toggleOpen: eventCalenderModelOpen,
    // setToggleOpen: setEventCalenderModelOpen,
    toggleIt: toggleEventCalenderModelOpen,
  } = useToggle(false)
  const {
    toggleOpen: subCaseModelOpen,
    setToggleOpen: setNewSubCaseModelOpen,
    toggleIt: toggleNewSubCaseModelOpen,
  } = useToggle(false)
  const handleLeave = () => {
    setLeaveGroupModalOpen(true)
  }
  const AccordionContainer = ({ children, handleAccordionClick }) => (
    <Row
      className="align-items-baseline my-2 text-muted pointer"
      style={{ maxWidth: "100%" }}
      onClick={() => handleAccordionClick()}
    >
      <Col xs={11}>{children}</Col>
      <Col xs={1} style={{ padding: 0 }}>
        <img src={Chevron} className="accordion-icon-right" />
      </Col>
    </Row>
  )
  const handleAccordionClick = caseData => {
    history.push({
      pathname: "/case_events",
      state: { caseData },
    })
  }

  const handleLeaveGroup = async () => {
    const payload = {
      caseId: casedetails?._id,
      memberId: currentUser?.userID,
    }
    const res = await LeaveGroup(payload)
    if (res.success) {
      await ongetAllCases({ isSet: false })
      toastr.success(`case left  successfully`, "Success")
      setLeaveGroupModalOpen(false)
    }
  }
 
  const onGetCaseIdSubcases = async () => {
    const payload = {
      caseId: casedetails?.caseId,
      userID: caseData?.userID
    }
    const res = await caseIdbySubCase(payload)
    if (res.success) {
      setCaseIdSubCases(res?.caseIdSubCases)
    }
  }
  useEffect(() => {
    onGetCaseIdSubcases()
  }, [])
  return (
    <>
      <>
        <DeleteModal
          show={leavegroupModalOpen}
          onDeleteClick={handleLeaveGroup}
          confirmText="Yes,Remove"
          cancelText="Cancel"
          onCloseClick={toggleleavegroupModal}
        />
        {/*Case files Model*/}
        <DynamicModel
          open={filesModelOpen}
          toggle={toggleFilesModelOpen}
          size="xl"
          modalTitle="Shared Files"
          isClose={true}
        >
          <CaseFilesGrid caseId={caseData?._id} />
        </DynamicModel>
        <DynamicModel
          open={docketModelOpen}
          toggle={toggleDocketModelOpen}
          size="xl"
          modalTitle="Dockets Results"
          isClose={true}
        >
          <DocketResultModel caseId={caseData} />
        </DynamicModel>
        <DynamicModel
          open={eventMasterModelOpen}
          toggle={toggleEventMasterModelOpen}
          size="lg"
          modalTitle="Event Master"
          isClose={true}
          footer={false}
        >
          <DynamicSuspense>
            <EventMaster
              caseId={caseData}
              closeModal={toggleEventMasterModelOpen}
            />
          </DynamicSuspense>
        </DynamicModel>
        <DynamicModel
          open={subCaseModelOpen}
          toggle={toggleNewSubCaseModelOpen}
          size="lg"
          modalTitle="New Case"
          footer={false}
        >
          <DynamicSuspense>
            <SubCase
              // ongetAllCases={ongetAllCases}
              setModalOpen={setNewSubCaseModelOpen}
              caseId={caseData}
              newCaseId={newCaseId}
            />
          </DynamicSuspense>
        </DynamicModel>
        {/* <DynamicModel
          open={createEventMasterModelOpen}
          toggle={toggleCreateEventMasterModelOpen}
          size="xl"
          modalTitle="Event Master"
          isClose={true}
          footer={false}
        >
          <DynamicSuspense>
          <CreateEvent 
          caseId={caseData}
          closeModal={toggleCreateEventMasterModelOpen} 
          /></DynamicSuspense>
        </DynamicModel> */}
        <DynamicModel
          open={eventCalenderModelOpen}
          toggle={toggleEventCalenderModelOpen}
          size="lg"
          modalTitle="Event Calender"
          isClose={true}
          footer={false}
        >
          <DynamicSuspense>
            <EventCalender
              caseId={caseData}
              closeModal={toggleEventCalenderModelOpen}
            />
          </DynamicSuspense>
        </DynamicModel>

        {/*Case members Model*/}
        <DynamicModel
          open={membersModelOpen}
          toggle={toggleMembersModelOpen}
          size="lg"
          modalTitle=" Case Members"
          modalSubtitle={`You have ${caseData?.caseMembers?.length} Members`}
        >
          <CaseMembers
            members={caseData?.caseMembers}
            admins={caseData?.admins}
            caseId={caseData?._id}
          />
        </DynamicModel>
      </>
      <li className={classNames("px-3 py-2", selected && "active-case-bg")}>
        <Row
          className="align-middle py-1 text-break "
          style={{ maxWidth: "100%" }}
        >
          <Col
            xs={10}
            className="pointer"
            onClick={() => handleSelectingCase(caseData)}
          >
           <svg version="1.1" viewBox="0 0 122.88 89.09"
              style={{ cursor: "pointer", width: "15px", height: "15px", fill: "#f0b40e" }} >
              <path class="st0" d="M3.97,9.75l-3.93,8.73l122.77,0.01l-3.96-8.74H55.82c-1.59,0-2.88-1.29-2.88-2.88V0H11.97v6.87 c0,1.59-1.29,2.88-2.88,2.88H3.97L3.97,9.75L3.97,9.75z" />
              <path class="st1" d="M4.63,18.48H0l7.03,67.03c0.11,1.07,0.55,2.02,1.2,2.69c0.55,0.55,1.28,0.89,2.11,0.89h100.1 c0.82,0,1.51-0.33,2.05-0.87c0.68-0.68,1.13-1.67,1.28-2.79l9.1-66.94H4.63V18.48L4.63,18.48z" />
            </svg>
            {" "}
            {/* <span className="fw-medium">{caseData.caseId}</span> */}
            <span className="text-muted fw-medium font-size-12 ms-2">
              {caseData.caseName}
            </span>
          </Col>
          <Col xs={1} style={{ padding: 2 }}>
            {notifyCountforCase(caseData?._id) && (
              <i className="bx bxs-bell bx-tada text-danger" />
            )}
          </Col>
          <Col xs={1} style={{ padding: 2 }}>
            {/* <i
              style={{ cursor: "pointer" }}
              className="bx bxs-plus-square font-size-14 pt-1 me-2"
              onClick={()=>handleClick()}
            ></i> */}
            <img
              src={Chevron}
              onClick={() => onAccordionButtonClick(index)}
              aria-expanded={index === active}
              className="accordion-icon"
              style={{ cursor: "pointer" }}
            />
          </Col>
        </Row>
        <div className="px-2 border-top">
          <Collapse isOpen={index === active} className="accordion-collapse ">
            <div className="mb-4 pointer">
              <span className="fw-medium font-size-13 text-primary-emphasis">
                Case Members
              </span>
              <AccordionContainer
                handleAccordionClick={() => setMembersModelOpen(true)}
              >
                <div className="members-container">
                  {caseData?.caseMembers.map((member, m) => (
                    <div className="align-self-center me-1" key={m}>
                      <img
                        src={
                          member?.id?.profilePic
                            ? member?.id?.profilePic
                            : profile
                        }
                        className="avatar-xs rounded-circle "
                        alt=""
                        style={{ objectFit: "cover" }}
                      />
                      {/* <span className="d-flex fw-medium">
                      {members?.id?.firstname}{" "}
                    </span> */}
                    </div>
                  ))}
                </div>
              </AccordionContainer>
            </div>

            <div className="mb-4 ">
              <AccordionContainer
                handleAccordionClick={() => setEventMasterModelOpen(true)}
              >
                <div>
                  <span
                    className="fw-medium font-size-12 text-secondary"
                    style={{ cursor: "pointer" }}
                  >
                    Manage Events
                  </span>{" "}
                </div>
              </AccordionContainer>
              <div>
                <span
                  className="fw-medium font-size-11 pointer text-secondary"
                  onClick={() => handleAccordionClick(caseData)}
                >
                  <i
                    className="bi bi-calendar4-event"
                    style={{ fontSize: "12px", cursor: "pointer" }}
                  >
                    {" "}
                  </i>
                  Event Calendar
                </span>
              </div>

              {/* <AccordionContainer>
              <span>
                Bookmarks <span>({caseData?.bookmarks?.length})</span>
              </span>
            </AccordionContainer> */}
              {/* <AccordionContainer>
              <span>
                Pending Messages <span>(1)</span>
              </span>
            </AccordionContainer> */}
              <br />
              <span className="fw-medium font-size-13 text-primary-emphasis">
                Saved Messages & Files
              </span>

              <AccordionContainer
                handleAccordionClick={() => setFilesModelOpen(true)}
              >
                <i
                  className="bi bi-share"
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                </i>
                <span className="fw-medium font-size-12 text-secondary">
                  Shared Files
                </span>
              </AccordionContainer>
            </div>

            <div className="d-flex justify-content-end">
              {/* <button
              type="button"
              className="btn btn-primary "
              style={{ fontSize: "10px" }}
              onClick={() => setDocketModelOpen(true)}
            >
              Docket
            </button> */}
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLeave}
                style={{ fontSize: "10px" }}
              >
                Exit Case
              </button>
            </div>
            {/* <div className="mb-2 pointer">
            <span className="fw-medium font-size-11">Case Notification</span>
            <div className="d-flex justify-content-between me-3">
              <span className="text-muted">Message Notification</span>
              <OnOffSwitch
                isNotificationOn={notifyOn}
                setNotify={setNotifyOn}
              />
            </div>
          </div> */}
          </Collapse>
        </div>
      </li>
    </>
  )
}

SubCaseGrid.propTypes = {
  caseData: PropTypes.object,
  index: PropTypes.number,
  active: PropTypes.number,
  onAccordionButtonClick: PropTypes.func,
  handleSelectingCase: PropTypes.func,
  ongetAllCases: PropTypes.func,
  children: PropTypes.any,
  selected: PropTypes.bool,
  notifyCountforCase: PropTypes.func,
  handleAccordionClick: PropTypes.func,
}

export default SubCaseGrid
