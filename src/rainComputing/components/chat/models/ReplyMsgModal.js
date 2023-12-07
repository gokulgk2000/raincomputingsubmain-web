import React, { useState } from 'react';
import { Col, Modal, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import {
    postReplies,
} from '../../../../../src/rainComputing/helpers/backend_helper';
import { useUser } from '../../../../../src/rainComputing/contextProviders/UserProvider';
import { useChat } from '../../../../../src/rainComputing/contextProviders/ChatProvider';
import { useSocket } from '../../../../../src/rainComputing/contextProviders/SocketProvider';
import 'react-quill/dist/quill.snow.css';
import ReactQuillInput from '../../../../../src/rainComputing/components/ReactQuill/ReactQuill';

const ReplyMsgModal = ({
    open,
    setOpen,
    toggleOpen,
    curMessageId,
    receivers,
    currentChat,
    caseId,
    handleSendMessage,
    curMessage,
    setcurMessage,
    getChatName,
    mentionsArray,
}) => {
    const { currentUser } = useUser();
    const { socket } = useSocket();
    const { setMessages, messages } = useChat();
    const [replyMessage, setReplyMessage] = useState('');
    const handlereplyMsgCancel = () => {
        setOpen(false);
    };
    const [isQuill, setIsQuill] = useState(false);
    const toggle_Quill = () => {
        setIsQuill(!isQuill);
    };
    // const handleReplyMessage = async id => {
    //     const payload = {
    //         id,
    //         sender: currentUser?.userID,
    //         currentChat,
    //         groupId: currentChat?._id,
    //         caseId: caseId,
    //         receivers,
    //         msg: replyMessage,
    //         isReply: true,
    //     };

    //     const res = await postReplies(payload);

    //     if (res?.success) {
    //         setMessages(messages?.map(m => (m?._id === id ? res?.replyMessage : m)));
    //         socket.emit('s_r', payload);

    //         setReplyMessage('');
    //         setOpen(false);
    //     }
    // };

    return (
        <>
            <Modal
                size="lg"
                isOpen={open && curMessageId}
                toggle={toggleOpen}
                backdrop={'static'}
                id="staticBackdrop"
                centered
            >
                <div className="modal-header">
                    <button
                        onClick={() => {
                            handlereplyMsgCancel();
                        }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h5>Reply :</h5>
                    <Row>
                        <Col>
                            <div className=" border border-2 border-primary rounded-4 position-relative">
                                <ReactQuillInput
                                    value={curMessage}
                                    onChange={setcurMessage}
                                    isQuill={isQuill}
                                    getChatName={getChatName}
                                    currentChat={currentChat}
                                    mentionsArray={mentionsArray}
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
                    {/* <i style={{ marginRight: "30px", marginTop: "8px", fontSize: "14px",cursor: "pointer" }}
            onClick={toggle_Quill}
            className="bi bi-menu-button-wide-fill text-primary"></i> */}
                    <button
                        type="button"
                        onClick={() => {
                            handlereplyMsgCancel();
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleSendMessage(curMessageId?._id)}
                    >
                        Send
                    </button>
                </div>
            </Modal>
        </>
    );
};

ReplyMsgModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    toggleOpen: PropTypes.func,
    curMessageId: PropTypes.any,
    socket: PropTypes.any,
    receivers: PropTypes.any,
    currentChat: PropTypes.any,
    caseId: PropTypes.any,
    handleSendMessage: PropTypes.any,
    curMessage: PropTypes.any,
    setcurMessage: PropTypes.any,
    getChatName: PropTypes.any,
    mentionsArray: PropTypes.any,
};
export default ReplyMsgModal;
