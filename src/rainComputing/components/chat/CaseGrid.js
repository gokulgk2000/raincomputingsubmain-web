import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col, Collapse, Row } from "reactstrap";
import "./style/case-grid.scss";
import Chevron from "../../../../src/assets/icon/chevron-down.svg";
import profile from "../../../../src/assets/images/avatar-defult.jpg";
import { useToggle } from "../../../../src/rainComputing/helpers/hooks/useToggle";
import DynamicModel from "../../../../src/rainComputing/components/modals/DynamicModal";
import CaseMembers from "./CaseMembers";
import CaseFilesGrid from "./CaseFilesGrid";
import DeleteModal from "../modals/DeleteModal";
import { useUser } from "../../../../src/rainComputing/contextProviders/UserProvider";
import {
  LeaveGroup,
  getCasesByClientId,
} from "../../../../src/rainComputing/helpers/backend_helper";
import toastr from "toastr";
import DocketResultModel from "./models/DocketResultModel";
import EventMaster from "./models/EventMaster";
import DynamicSuspense from "../loader/DynamicSuspense";
import EventCalender from "./models/EventCalender";
import { useHistory } from "react-router-dom";
import SubCaseGrid from "./SubCaseGrid";
import useAccordian from "../../../../src/rainComputing/helpers/hooks/useAccordian";
import { useNotifications } from "../../../../src/rainComputing/contextProviders/NotificationsProvider";
import { initialNewCaseValues } from "../../../../src/rainComputing/helpers/initialFormValues";
import CreateCase from "./CreateCase";
const CaseGrid = ({
  caseData,
  index,
  active,
  onAccordionButtonClick,
  handleSelectingCase,
  selected,
  notifyCountforCase,
  ongetAllCases,
  onGetAllClientNames,
}) => {
  console.log("Clients-caseData:", caseData);
  const { currentAttorney } = useUser();
  const history = useHistory();
  // const { toggleOpen: notifyOn, toggleIt: setNotifyOn } = useToggle(false);
  const { notifications } = useNotifications();
  const { currentUser } = useUser();
  // const [caseIdSubCases, setCaseIdSubCases] = useState([]);
  // const [newCaseId, setNewCaseId] = useState();
  // const [currentCase, setCurrentCase] = useState(null);
  const { activeAccordian, handleSettingActiveAccordion } = useAccordian(-1);
  // const [subCaseList, setSubCaseList] = useState(false);
  // const [caseClientNames, setCaseClientNames] = useState([]);
  const [clientCases, setClientCases] = useState([]);
  const [newCase, setNewCase] = useState(initialNewCaseValues);
  const [cases, setCases] = useState(false);

  const handleCaseClick = () => {
    setCases(!cases);
  };
  const {
    toggleOpen: membersModelOpen,
    setToggleOpen: setMembersModelOpen,
    toggleIt: toggleMembersModelOpen,
  } = useToggle(false);
  const {
    toggleOpen: leavegroupModalOpen,
    setToggleOpen: setLeaveGroupModalOpen,
    toggleIt: toggleleavegroupModal,
  } = useToggle(false);
  const {
    toggleOpen: filesModelOpen,
    setToggleOpen: setFilesModelOpen,
    toggleIt: toggleFilesModelOpen,
  } = useToggle(false);
  const {
    toggleOpen: docketModelOpen,
    // setToggleOpen: setDocketModelOpen,
    toggleIt: toggleDocketModelOpen,
  } = useToggle(false);
  // const {
  //   toggleOpen: createEventMasterModelOpen,
  //   setToggleOpen: setCreateEventMasterModelOpen,
  //   toggleIt: toggleCreateEventMasterModelOpen,
  // } = useToggle(false)
  const {
    toggleOpen: eventMasterModelOpen,
    setToggleOpen: setEventMasterModelOpen,
    toggleIt: toggleEventMasterModelOpen,
  } = useToggle(false);
  const {
    toggleOpen: eventCalenderModelOpen,
    // setToggleOpen: setEventCalenderModelOpen,
    toggleIt: toggleEventCalenderModelOpen,
  } = useToggle(false);
  // const {
  //   toggleOpen: subCaseModelOpen,
  //   setToggleOpen: setNewSubCaseModelOpen,
  //   toggleIt: toggleNewSubCaseModelOpen,
  // } = useToggle(false);
  const {
    toggleOpen: newCaseModelOpen,
    setToggleOpen: setNewCaseModelOpen,
    toggleIt: toggleNewCaseModelOpen,
  } = useToggle(false);
  const handleLeave = () => {
    setLeaveGroupModalOpen(true);
  };
  const AccordionContainer = ({ children, handleAccordionClick }) => (
    <Row
      className="align-items-baseline my-2 text-muted pointer"
      style={{ maxWidth: "100%" }}
      onClick={() => handleAccordionClick()}
    >
      <Col xs={11}>{children}</Col>
      <Col xs={1} style={{ padding: 0 }}>
        <img src={Chevron} className="accordion-icon-right" alt="#" />
      </Col>
    </Row>
  );
  const handleAccordionClick = (caseData) => {
    history.push({
      pathname: "/case_events",
      state: { caseData },
    });
  };

  const handleLeaveGroup = async () => {
    const payload = {
      caseId: caseData?._id,
      memberId: currentUser?.userID,
    };
    const res = await LeaveGroup(payload);
    if (res.success) {
      await ongetAllCases({ isSet: false });
      toastr.success(`case left  successfully`, "Success");
      setLeaveGroupModalOpen(false);
    }
  };
  // const handleClick = () => {
  //   if (caseClientNames && caseClientNames.length > 0) {
  //     const lastCaseId = caseClientNames[caseClientNames.length - 1].caseId
  //     const lastDigit = parseInt(lastCaseId.slice(-1))
  //     const newLastDigit = lastDigit + 1
  //     const newCaseId =
  //       lastCaseId.slice(0, -1) + newLastDigit.toString().padStart(0, "0")
  //     setNewCaseId(newCaseId)
  //   } else {
  //     const lastCaseId = casedetails?.caseId
  //     const lastDigit = parseInt(lastCaseId.slice(-1))
  //     const newLastDigit = lastDigit + 1
  //     const newCaseId =
  //       lastCaseId.slice(0, -1) + newLastDigit.toString().padStart(0, "0")
  //     setNewCaseId(newCaseId)
  //   }
  //   setNewSubCaseModelOpen(true)
  // }

  // const onGetCaseIdSubcases = async () => {
  //   const payload = {
  //     caseId: casedetails?.caseId,
  //   }
  //   const res = await caseIdbySubCase(payload)
  //   if (res.success) {
  //     setCaseIdSubCases(res?.caseIdSubCases)
  //   }
  // }
  // useEffect(() => {
  //   onGetCaseIdSubcases()
  // }, [])

  // const onGetClientNames = async () => {
  //   const payload = {
  //     clientName: casedetails?.clientName,
  //     userID: currentUser?.userID
  //   }
  //   const res = await caseIdbySubCase(payload)
  //   if (res.success) {
  //     setCaseClientNames(res?.caseClientNames)
  //   }
  // }
  // useEffect(() => {
  //   onGetClientNames()
  // }, [])

  // get All Client Cases
  const onGetClientCases = async (client) => {
    if (currentAttorney) {
      if (client?.address) {
        const payload = {
          clientId: client?._id,
          userId: currentUser.userID,
        };

        const res = await getCasesByClientId(payload);
        if (res.success) {
          setClientCases(res?.cases);
        }
      } else {
        const payload = {
          clientId: client?.clientId,
          userId: currentUser.userID,
        };

        const res = await getCasesByClientId(payload);
        if (res.success) {
          setClientCases(res?.cases);
        }
      }
    }
  };
  useEffect(() => {
    onGetClientCases();
  });

  const notificationSubCase = (clientName) => {
    console.log("clientName:", clientName);
    const matchingCase = notifications.find(
      (i) => i?.clientName === clientName
    );
    return matchingCase ? true : false;
  };
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
        {/* <DynamicModel
          open={subCaseModelOpen}
          toggle={toggleNewSubCaseModelOpen}
          size="lg"
          modalTitle="New Case"
          footer={false}
        >
          <DynamicSuspense>
            <SubCase
              ongetAllCases={ongetAllCases}
              setModalOpen={setNewSubCaseModelOpen}
              caseId={caseData}
              newCaseId={newCaseId}
            />
          </DynamicSuspense>
        </DynamicModel> */}
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
          open={newCaseModelOpen}
          toggle={toggleNewCaseModelOpen}
          size="lg"
          modalTitle="Create Case"
          footer={false}
        >
          <DynamicSuspense>
            <CreateCase
              formValues={newCase}
              setFormValues={setNewCase}
              // contacts={contacts}
              setModalOpen={setNewCaseModelOpen}
              getAllCases={ongetAllCases}
              clientId={caseData?._id}
              caseData={caseData}
              onGetAllClientNames={onGetAllClientNames}
            />
          </DynamicSuspense>
        </DynamicModel>
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
            className="pointer position-relative"
            onClick={() => caseData.caseName && handleSelectingCase(caseData)}
          >
            {currentAttorney && caseData.clientName ? (
              cases && caseData.clientName ? (
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    cursor: "pointer",
                    width: "15px",
                    height: "15px",
                    fill: "#f0b40e",
                  }}
                  viewBox="0 0 113.84 122.88"
                >
                  <title>Case List</title>
                  <path
                    class="cls-1"
                    d="M1.78,4,.18,7.55H44.23L42.61,4H23a1.17,1.17,0,0,1-1.18-1.17V0H5.05V2.81A1.17,1.17,0,0,1,3.87,4Zm67.7,95.21,2.88,22.22a1.49,1.49,0,0,0,1.36,1.47h35c.81,0,1.26-.78,1.36-1.5l3.73-22.19Zm1.78-5.77L69.66,97h44l-1.62-3.57H92.44a1.17,1.17,0,0,1-1.18-1.17V89.44H74.52v2.81a1.17,1.17,0,0,1-1.17,1.17ZM66.87,55.49l2.89,22.22a1.48,1.48,0,0,0,1.35,1.47h35c.81,0,1.26-.78,1.36-1.5l3.73-22.19Zm1.78-5.77-1.6,3.57H111.1l-1.62-3.57H89.83a1.17,1.17,0,0,1-1.17-1.18v-2.8H71.92v2.81a1.18,1.18,0,0,1-1.18,1.17ZM25.18,62.65H58.7v6H25.18v42H58.37v6H19.18V37.71h6V62.65ZM0,9.75,2.88,32a1.5,1.5,0,0,0,1.36,1.47h35c.81,0,1.26-.78,1.36-1.5L44.36,9.75Z"
                  />
                </svg>
              ) : caseData.clientName ? (
                <svg
                  version="1.1"
                  viewBox="0 0 122.88 89.09"
                  style={{
                    cursor: "pointer",
                    width: "15px",
                    height: "15px",
                    fill: "#f0b40e",
                  }}
                >
                  <title>Client Cases</title>
                  <path
                    class="st0"
                    d="M3.97,9.75l-3.93,8.73l122.77,0.01l-3.96-8.74H55.82c-1.59,0-2.88-1.29-2.88-2.88V0H11.97v6.87 c0,1.59-1.29,2.88-2.88,2.88H3.97L3.97,9.75L3.97,9.75z"
                  />
                  <path
                    class="st1"
                    d="M4.63,18.48H0l7.03,67.03c0.11,1.07,0.55,2.02,1.2,2.69c0.55,0.55,1.28,0.89,2.11,0.89h100.1 c0.82,0,1.51-0.33,2.05-0.87c0.68-0.68,1.13-1.67,1.28-2.79l9.1-66.94H4.63V18.48L4.63,18.48z"
                  />
                </svg>
              ) : (
                <i
                  className="bx bxs-message-rounded "
                  style={{
                    cursor: "pointer",
                    width: "15px",
                    height: "15px",
                    color: "blue",
                  }}
                />
              )
            ) : (
              <i
                className="bx bxs-message-rounded "
                style={{
                  cursor: "pointer",
                  width: "15px",
                  height: "15px",
                  color: "blue",
                }}
              />
            )}

            {/* <span className="fw-medium">{caseData.caseId}</span> */}
            <span
              className="text-muted font-size-12 fw-bold ms-2"
              onClick={() => {
                caseData.clientName && onGetClientCases(caseData);
                handleCaseClick();
              }}
            >
              {currentAttorney
                ? caseData.clientName && caseData.clientName
                : caseData.caseName}
            </span>
          </Col>
          <Col xs={1} style={{ padding: 2 }}>
            {currentAttorney && notificationSubCase(caseData?.clientName) && (
              <i className="bx bxs-bell bx-tada text-danger" />
            )}
            {notifyCountforCase(caseData?._id) && (
              <i className="bx bxs-bell bx-tada text-danger" />
            )}
          </Col>
          <Col xs={1} style={{ padding: 2 }}>
            {currentAttorney && (
              <i
                style={{ cursor: "pointer" }}
                className="bx bxs-plus-square font-size-14 pt-1 me-2"
                title="Create Case"
                onClick={() => setNewCaseModelOpen(true)}
              ></i>
            )}
            <div className="md:ml-20">
              {!caseData.clientName && (
                <div
                  onClick={() => onAccordionButtonClick(index)}
                  aria-expanded={index === active}
                  className="accordion-icon"
                  role="button"
                >
                  <img
                    src={Chevron}
                    alt="#"
                  />
                </div>
              )}
            </div>

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
          {cases && (
            <ul className="list-unstyled chat-list">
              {clientCases
                .map((caseData) => ({
                  caseData,
                  notifyCount: notifyCountforCase(caseData._id),
                }))
                .sort((a, b) => {
                  const notifyCountDiff = b.notifyCount - a.notifyCount;
                  if (notifyCountDiff !== 0) {
                    return notifyCountDiff; // Sort by notifyCount first
                  }
                  return 0; // Default return value when notifyCountDiff is 0
                })
                .map(({ caseData, notifyCount }, index) => (
                  <SubCaseGrid
                    caseData={caseData}
                    index={index}
                    key={index}
                    active={activeAccordian}
                    onAccordionButtonClick={handleSettingActiveAccordion}
                    handleSelectingCase={handleSelectingCase}
                    selected={selected}
                    notifyCountforCase={notifyCountforCase}
                    ongetAllCases={ongetAllCases}
                  />
                ))}
            </ul>
          )}

        </div>
      </li>
    </>
  );
};

CaseGrid.propTypes = {
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
  onGetAllClientNames: PropTypes.func,
};

export default CaseGrid;
