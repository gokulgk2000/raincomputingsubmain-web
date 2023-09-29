import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Button, Col, Row } from "reactstrap"
import { useHistory } from "react-router-dom"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useUser } from "../../../../src/rainComputing/contextProviders/UserProvider"
import { initialNewCaseValues } from "../../../../src/rainComputing/helpers/initialFormValues"
import {
  createNewCase,
  getAllUsers,
} from "../../../../src/rainComputing/helpers/backend_helper"

const CreateCase = ({
  formValues,
  setFormValues,
  setModalOpen,
  getAllCases,
  clientId,
  caseData,
}) => {
  const { currentUser } = useUser()
  const history = useHistory()
  const [loading, setloading] = useState(false)
  const [contacts, setContacts] = useState([])
  const [searchText, setSearchText] = useState("")  
  const [clientName, setClientName] = useState("")
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  const handleFormValueChange = e => {
    const { name, value } = e.target
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }

  const handleAddingGroupMembers = member => {
    if (formValues.members.includes(member)) {
      const membersAfterRemove = formValues.members.filter(
        m => m._id !== member?._id
      )

      setFormValues(prevState => ({
        ...prevState,
        members: membersAfterRemove,
      }))
    } else {
      setFormValues(prevState => ({
        ...prevState,
        members: [...prevState.members, member],
      }))
    }
  }

  const isDisabled = () => {
    if (
      !formValues?.caseName ||
      !formValues?.caseId ||
      formValues?.members?.length < 1
    )
      return true
    return false
  }

  const handleCaseCreationCancel = () => {
    setFormValues(initialNewCaseValues)
    setModalOpen(false)
  }

  const handleCreatingCase = async () => {
    setloading(true)
    const filteredMembers = formValues?.members.map(m => m?._id)
    const generateThreadId = () => {
      const min = 100000 // Minimum 6-digit number
      const max = 999999 // Maximum 6-digit number
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const randomThreadId = generateThreadId()
    const payLoad = {
      admin: currentUser?.userID,
      caseId: formValues?.caseId,
      caseName: formValues?.caseName,
      // serialNumber: caseSerialNo,
      members: [currentUser?.userID, ...filteredMembers],
      threadId: randomThreadId, // Assign the generated ThreadId
      threadIdCondition: "GroupMembers",
      clientName: clientName,
      clientId: clientId,
    }
    const caseRes = await createNewCase(payLoad)
    if (caseRes.success) {
      toastr.success(
        `Case ${formValues?.caseId} has been created successfully`,
        "Case creation success"
      )
      history.push(`/chat-rc?g_id=${caseRes?.group}&c_id=${caseRes?.case}`)
      await getAllCases({ isSet: false })

      handleCaseCreationCancel()
    } else {
      toastr.error(
        ` ${caseRes?.msg} Failed to create case `,
        "Case creation failed!!!"
      )
    }
    setloading(false)
  }

  useEffect(() => {
    if (caseData) {
      // setCaseId(caseData?.caseId)
      // setCaseName(caseData?.caseName)
      setClientName(caseData?.clientName)
      // setCaseMembers(
      //   caseData?.caseMembers.map(m => {
      //     const { id } = m
      //     return {
      //       id: id?._id,
      //       firstname: id?.firstname,
      //       lastname: id?.lastname,
      //       email: id?.email,
      //     }
      //   })
      // )
    }
    return () => {
      // setCaseName("")
      // setCaseId("")
      setClientName("")
      // setCaseMembers([])
    }
  }, [caseData])


  useEffect(() => {
    const handleFetchingContacts = async () => {
      if (searchText === "") {
        setContacts([])
      } else {
        const contactRes = await getAllUsers({
          userID: currentUser.userID,
          searchText,
        })
        if (contactRes.success) {
          setContacts(contactRes.users)
        } else {
          toastr.error(
            `Failed to fetch contacts ${contactRes?.msg}`,
            "Failed on fetching contacts"
          )
          setContacts([])
        }
      }
    }
    handleFetchingContacts()
  }, [searchText,currentUser.userID])

  return (
    <>
      <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label">
          Client Name
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            value={clientName}
            placeholder="Client Name"
            onChange={e => setClientName(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Case name
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="Case Anonymous"
            value={formValues.caseName}
            name="caseName"
            onChange={e => handleFormValueChange(e)}
          />
        </div>
      </Row>
      <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Case Id
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="xxxx-xxxx"
            value={formValues.caseId}
            name="caseId"
            onChange={e => handleFormValueChange(e)}
          />
        </div>
      </Row>
      {/* <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Serial Number
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="xxxx-xxxx"
            value={caseSerialNo}
            name="caseId"
            onChange={e => setCaseSerialNo(e.target.value)}
          />
        </div>
      </Row> */}
      {/* <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Event Date
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="date"
            value={caseEventDate}
            name="caseId"
            onChange={e => setCaseEventDate(e.target.value)}
          />
        </div>
      </Row> */}
      {/* <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Event
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="Enter the event"
            value={caseEvent}
            name="caseId"
            onChange={e => setCaseEvent(e.target.value)}
          />
        </div>
      </Row> */}
      <Row className="my-3">
        <label
          htmlFor="user-search-text"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Select members
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            id="user-search-text"
            placeholder="Search by name,email"
            value={searchText}
            name="searchText"
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      </Row>

      <Row>
        <Col xs={6} className="px-3 border-end border-info">
          <span className="text-muted">Members</span>
          <div className="d-flex flex-wrap gap-2 my-2">
            {contacts &&
              contacts
                .filter(f => !formValues.members.some(g => g?._id === f?._id))
                .filter(a => a?._id !== currentUser?.userID)
                .map((contact, c) => (
                  <Button
                    key={c}
                    color={
                      formValues.members.includes(contact._id)
                        ? "success"
                        : "light"
                    }
                    className="btn mx-1 mb-2"
                    onClick={() => handleAddingGroupMembers(contact)}
                  >
                    <div className="d-flex justify-content-between ">
                      <div>
                        {" "}
                        {contact.firstname} {contact.lastname}{" "}
                      </div>
                      {contact?.attorneyStatus === "approved" && (
                        <div>
                          {" "}
                          <i className="fas fa-star text-warning"></i>
                        </div>
                      )}
                    </div>

                    <div className="font-size-0 text-body ">
                      {contact.email}
                    </div>
                  </Button>
                ))}
          </div>
        </Col>
        <Col xs={6} className="px-3">
          <span className="text-muted">Case Members</span>
          <div className="d-flex flex-wrap gap-2 my-2">
            <Button color="success" className="btn mx-1 mb-2">
              <div className="d-flex  ">
                <div>
                  {currentUser?.firstname} {currentUser?.lastname}
                </div>
              </div>

              <div className="font-size-0 text-body ">{currentUser?.email}</div>
            </Button>
            {formValues?.members &&
              formValues?.members.map((member, m) => (
                <Button
                  key={m}
                  color="success"
                  className="btn mx-1 mb-2"
                  onClick={() => handleAddingGroupMembers(member)}
                >
                  <div className="d-flex justify-content-between">
                    <div> {member?.firstname + " " + member?.lastname}</div>
                    {member?.attorneyStatus === "approved" && (
                      <div>
                        {" "}
                        <i className="fas fa-star text-warning"></i>
                      </div>
                    )}
                  </div>

                  <div className="font-size-0 text-body ">{member?.email}</div>
                </Button>
              ))}
          </div>
        </Col>
      </Row>

      <Row>
        <div className="modal-footer">
          {!loading && (
            <button
              type="button"
              onClick={() => {
                handleCaseCreationCancel()
              }}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Close
            </button>
          )}
          {loading ? (
            <button type="button" className="btn btn-dark ">
              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
              Loading
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleCreatingCase()}
              disabled={isDisabled()}
            >
              Create Case
            </button>
          )}
        </div>
      </Row>
    </>
  )
}

CreateCase.propTypes = {
  formValues: PropTypes.object,
  setFormValues: PropTypes.func,
  setModalOpen: PropTypes.any,
  getAllCases: PropTypes.func,
  clientId: PropTypes.any,
  caseData: PropTypes.object,
  onGetAllClientNames: PropTypes.func
}

export default CreateCase
