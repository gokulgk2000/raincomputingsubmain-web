import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Row } from "reactstrap"
import { useHistory } from 'react-router-dom';
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useUser } from "../../../../src/rainComputing/contextProviders/UserProvider"
import { updateClient } from "../../../../src/rainComputing/helpers/backend_helper"

const EditClient = ({
    setModalOpen,
    getAllClients,
    getAllCases,
    currentClient
}) => {
    console.log("currentClient-1r:", currentClient)
    const { currentUser } = useUser()
    const history = useHistory();
    const [loading, setloading] = useState(false)
    const [clientName, setClientName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    toastr.options = {
        progressBar: true,
        closeButton: true,
    }

    const isDisabled = () => {
        if (!clientName || !email) return true
        return false
    }

    const handleClientUpdateCancel = () => {
        setModalOpen(false)
    }

    const handleUpdatingClient = async () => {
        setloading(true)
        const payLoad = {
            id: currentClient?._id,
            clientName: clientName,
            email: email,
            address: address,
            userId: currentUser?.userID
        }
        const res = await updateClient(payLoad)
        console.log("Today-res:", res)
        if (res.success) {
            toastr.success(
                `Client ${res?.updatedClient?.clientName} has been updated successfully`,
                "Success"
            )
            history.push(`/chat-rc`)
            await getAllClients()
            await getAllCases({ isSet: false })
            handleClientUpdateCancel()
        } else {
            toastr.error(
                toastr.error(`Failed to update client due to ${res?.msg}`, "Failed!!!")
            )
        }
        setloading(false)
    }

    useEffect(() => {
        if (currentClient) {
            setClientName(currentClient?.clientName)
            setEmail(currentClient?.email)
            setAddress(currentClient?.address)
        }
        return () => {
            setClientName("")
            setEmail("")
            setAddress("")
        }
    }, [currentClient])

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
                        name="clientName"
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
                    Email
                </label>
                <div className="col-md-8">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={e => setEmail(e.target.value)}
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
                        value={address}
                        name="address"
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
            </Row>
            <Row>
                <div className="modal-footer">
                    {!loading && (
                        <button
                            type="button"
                            onClick={() => {
                                handleClientUpdateCancel()
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
                            onClick={() => handleUpdatingClient()}
                            disabled={isDisabled()}
                        >
                            Update Client
                        </button>
                    )}
                </div>
            </Row>
        </>
    )
}

EditClient.propTypes = {
    setModalOpen: PropTypes.func,
    getAllClients: PropTypes.func,
    getAllCases: PropTypes.func,
    currentClient: PropTypes.any,
}

export default EditClient
