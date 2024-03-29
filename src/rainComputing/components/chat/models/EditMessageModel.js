import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { messageUpdate } from '../../../../../src/rainComputing/helpers/backend_helper';
import { useChat } from '../../../../../src/rainComputing/contextProviders/ChatProvider';
import 'react-quill/dist/quill.snow.css';
import ReactQuillInput from '../../../../../src/rainComputing/components/ReactQuill/ReactQuill';
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const EditMessageModel = ({ open, setOpen, toggleOpen, curMessageId ,curEditMessageId, currentChat,
    getChatName,
    currentCase,}) => {
    const { setMessages, messages } = useChat();
    const [updateMessages, setUpdateMessages] = useState(null);

    const [isQuill, setIsQuill] = useState(false);
    const toggle_Quill = () => {
        setIsQuill(!isQuill);
    };

    const handleUpdateMsgCancel = () => {
        setOpen(false);
    };
    const handleUpdateMessage = async id => {
        const payload = {
          _id: id,
          // sender: currentUser?.userID,
          messageData: updateMessages,
          createdAt: curEditMessageId.createdAt,
        }
        const res = await messageUpdate(payload)
        if (res?.success) {
          console.log("success :", res?.success)
          toastr.success(`Message  has been Edited successfully`, "Success")
          setMessages(messages?.map(m => (m?._id === id ? res?.updatedMessage : m)))
          setUpdateMessages(curMessageId)
        } else {
          toastr.error("Unable to Edit Message after 10 min", "Failed!!!")
        }
        setOpen(false)
      }
    

    useEffect(() => {
        setUpdateMessages(curMessageId?.messageData);
    }, [curMessageId?.messageData]);
    return (
        <>
            <Modal
                size="lg"
                isOpen={open && curMessageId}
                toggle={toggleOpen}
                backdrop="static"
                id="staticBackdrop"
                centered
            >
                <div className="modal-header">
                    <button
                        onClick={handleUpdateMsgCancel}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h5>Update Message:</h5>
                    <Row>
                        <Col>
                            <div className="border border-2 border-primary rounded-4 position-relative">
                                <ReactQuillInput
                                    value={updateMessages}
                                    onChange={setUpdateMessages}
                                    messages={messages}
                                    curMessageId={curMessageId}
                                    isQuill={isQuill}
                                    currentChat={currentChat}
                                    currentCase={currentCase}
                                    getChatName={getChatName}
                                />
                            </div>
                            <div style={{ position: 'absolute', right: '30px', top: '7px' }}>
                                <i className="bi bi-type"
                                    onClick={() => { toggle_Quill(); }}
                                    style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}

                                    title={isQuill ? 'Show Formatting' : 'Hide Formatting'}
                                ></i>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        onClick={handleUpdateMsgCancel}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
            Close
                    </button>

                    {updateMessages && updateMessages !== null && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleUpdateMessage(curMessageId?._id)}
                        >
              Update
                        </button>
                    )}
                </div>
            </Modal>
        </>
    );
};

EditMessageModel.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    toggleOpen: PropTypes.func,
    curMessageId: PropTypes.any,
    curEditMessageId: PropTypes.any,
    msgData: PropTypes.array,
    currentChat: PropTypes.any,
    getChatName: PropTypes.any,
    currentCase: PropTypes.any,
  }
  

export default EditMessageModel;
