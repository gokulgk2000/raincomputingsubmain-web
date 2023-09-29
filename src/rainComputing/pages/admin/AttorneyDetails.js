import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { useQuery } from "../../../../src/rainComputing/helpers/hooks/useQuery"
import { removeAttorney } from "../../../../src/rainComputing/helpers/backend_helper"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
//Import Breadcrumb
import Breadcrumb from "../../../../src/components/Common/Breadcrumb"

import DeleteModal from "../../../../src/rainComputing/components/modals/DeleteModal"
import { useModal } from "../../../../src/rainComputing/helpers/hooks/useModal"
import { getAttorneyByUserID,getAllAttorneys } from "../../../../src/rainComputing/helpers/backend_helper"
const AttorneyDetails = () => {
  const query = useQuery()
  const [modalOpen, setModalOpen, toggleModal] = useModal(false)
  const [attorneyDetail, setAttorneyDetail] = useState(null)
  //Toaster settings
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  const getAttorneys = async () => {
    const res = await getAttorneyByUserID({
      userID: query.get("id"),
    })
    if (res.success) {
      setAttorneyDetail(res.attorney)
    } else {
      console.log("Failed to Deactivate", res)
    }
  }

  useEffect(() => {
    getAttorneys()
  }, )
  const handleRemovingAttorney = async () => {
    const payload = {
      regUser: [attorneyDetail?._id],
    }
    const res = await removeAttorney(payload)
    if (res.success) {
      toastr.success(`Attorney has been Deactivated successfully`, "Success")
      await getAllAttorneys()
    } else {
      toastr.error("Failed to Deactivate Attorney", "Failed!!!")
    }
    setModalOpen(false)
  }
  return (
    <React.Fragment>
      <DeleteModal
        show={modalOpen}
        onDeleteClick={handleRemovingAttorney}
        confirmText="Yes,DeActive"
        cancelText="Cancel"
        onCloseClick={toggleModal}
      />
      <div className="page-content">
        <MetaTags>
          <title>Attorney Details | RainComputing </title>
        </MetaTags>
        <Container fluid>
          <Link to="/attorneylist-page">
            <Breadcrumb title="Rain" breadcrumbItem="Attorney Details" />
          </Link>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Attorney Name
                    </label>
                    {/* {attorneyDetail?regUser.map((ad, i) => ( */}
                    {/* {attorneyDetail.map((cd, i) => ( */}
                    <div className="col-md-5 col-lg-2 col-form-label">
                      <label className="fw-bolder">
                        {/* {} */}
                        {attorneyDetail?.regUser?.firstname +
                          " " +
                          attorneyDetail?.regUser?.lastname}
                      </label>
                    </div>
                    {/* ))} */}
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Bar Number
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder text-primary">
                        {" "}
                        {attorneyDetail?.barNumber}
                      </label>
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Email
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder">
                        {attorneyDetail?.regUser?.email}
                      </label>

                      {/* <label className="fw-bolder">{ad?.regUser?.email}</label> */}
                    </div>
                  </Row>
                  <Row>
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Phone Number
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder">
                        {attorneyDetail?.phoneNumber}
                      </label>
                      {/* <label className="fw-bolder">{ad?.phoneNumber}</label> */}
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Address
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder">
                        {attorneyDetail?.address}
                      </label>
                      {/* <label className="fw-bolder">{ad?.address}</label> */}
                    </div>
                  </Row>
                  <Row>
                    <div className="modal-footer">
                      <Link to="/attorneylist-page">
                        <button
                          type="button"
                          // onClick={() => {
                          //   handleClose()
                          // }}
                          className="btn btn-primary "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          // setSelectedUser(user)
                          setModalOpen(true)
                        }}
                      >
                        DeActivate
                      </button>
                    </div>
                  </Row>
                  {/* </li>
                  ))} */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AttorneyDetails
