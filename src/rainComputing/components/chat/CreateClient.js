import React, { useState } from "react"
import PropTypes from "prop-types"
import { Row } from "reactstrap"
import { useHistory } from 'react-router-dom';
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useUser } from "../../../../src/rainComputing/contextProviders/UserProvider"
import { initialNewCaseValues } from "../../../../src/rainComputing/helpers/initialFormValues"
import { createNewClient } from "../../../../src/rainComputing/helpers/backend_helper"

const CreateClient = ({
    formValues,
    setFormValues,
    setModalOpen,
    getAllClients
}) => {
    const { currentUser } = useUser()
    const history = useHistory();
    const [loading, setloading] = useState(false)

    toastr.options = {
        progressBar: true,
        closeButton: true,
    }

    const handleFormValueChange = e => {
        const { name, value } = e.target
        setFormValues(prevState => ({ ...prevState, [name]: value }))
    }

    const isDisabled = () => {
        if (
            !formValues?.clientName ||
            !formValues?.email
        )
            return true
        return false
    }

    const handleClientCreationCancel = () => {
        setFormValues(initialNewCaseValues)
        setModalOpen(false)
    }

    const handleCreatingClient = async () => {

        setloading(true)
        const payLoad = {
            clientName: formValues?.clientName,
            email: formValues?.email,
            address: formValues?.address,
            userId: currentUser?.userID
        }

        const clientRes = await createNewClient(payLoad)

        if (clientRes.success) {

            toastr.success(
                `Client ${formValues?.clientName} has been created successfully`,
                "Client creation success"
            )
            history.push(`/chat-rc`)
            await getAllClients()

            handleClientCreationCancel()

        } else {

            toastr.error(
                ` ${clientRes?.msg} Failed to Create NewClient `,
                "Client creation failed!!!"
            )

        }

        setloading(false)

    }


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
                        value={formValues.clientName}
                        name="clientName"
                        placeholder="Client Name"
                        onChange={e => handleFormValueChange(e)}
                    />
                </div>
            </Row>
            <Row>
                <label
                    htmlFor="example-text-input"
                    className="col-md-3 col-lg-2 col-form-label"
                >
                    Email
                </label>
                <div className="col-md-8">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        value={formValues.email}
                        name="email"
                        onChange={e => handleFormValueChange(e)}
                    />
                </div>
            </Row>
            <Row className="my-md-3">
                <label
                    htmlFor="example-text-input"
                    className="col-md-3 col-lg-2 col-form-label"
                >
                    Address
                </label>
                <div className="col-md-8">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                        value={formValues.address}
                        name="address"
                        onChange={e => handleFormValueChange(e)}
                    />
                </div>
            </Row>
            <Row>
                <div className="modal-footer">
                    {!loading && (
                        <button
                            type="button"
                            onClick={() => {
                                handleClientCreationCancel()
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
                            onClick={() => handleCreatingClient()}
                            disabled={isDisabled()}
                        >
                            Create Client
                        </button>
                    )}
                </div>
            </Row>
        </>
    )
}

CreateClient.propTypes = {
    userFormValues: PropTypes.object,
    formValues: PropTypes.object,
    setFormValues: PropTypes.func,
    setModalOpen: PropTypes.func,
    getAllCases: PropTypes.func,
    getAllClients: PropTypes.func,
}

export default CreateClient
