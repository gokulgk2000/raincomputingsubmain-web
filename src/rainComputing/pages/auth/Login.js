import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState } from "react";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import profile from "../../../../src/assets/images/profile-img.png";
import logo from "../../../../src/assets/images/rain-drop.png";
import login from "../../../../src//assets/images/loginanimi.png";
import { userLogin } from "../../../../src/rainComputing/helpers/backend_helper";
import { useSocket } from "../../../../src/rainComputing/contextProviders/SocketProvider";
import { useUser } from "../../../../src/rainComputing/contextProviders/UserProvider";

const RainLogin = (props) => {
  const { setSocket } = useSocket();
  const { setCurrentUser } = useUser();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const res = await userLogin(values);
      if (res.success) {
        setSocket(res.userID);
        localStorage.setItem("authUser", JSON.stringify(res));
        setCurrentUser(res);
        props.history.push("/");
      } else {
        setLoginError(res?.msg);
      }
      setLoading(false);
    },
  });

  // //handleGoogleLoginResponse
  // const googleResponse = response => {}

  // // handleTwitterLoginResponse
  // const twitterResponse = e => {}

  // //handleFacebookLoginResponse
  // const facebookResponse = e => {}

  return (
    <React.Fragment>
      <div className="p-5 m-5">
        <MetaTags>
          <title>Login | Raincomputing</title>
        </MetaTags>
        <div className="d-flex ">
          <div className="d-none d-xl-block  ">
            <div className="d-none d-lg-block   my-5 pt-sm-5 ms-lg-5  p-5">
              <div className="justify-content-center">
                <img alt="RC Icon" src={login} width="600" height="450" />
              </div>
              {/* <p className="fs-5 pt-5 ps-5 ">
              Manage all communication in one place
            </p> */}
            </div>
          </div>
          <div className="container">
            <Container className="cont mt-5 mb-5">
              <Row className="justify-content-center">
                <Col md={8} lg={7} xl={10}>
                  <Card className="overflow-hidden">
                    <div className="bg-primary bg-soft">
                      <Row>
                        <Col xs={7}>
                          <div className="text-primary p-4">
                            <h4 className="text-primary">Welcome</h4>
                            <p>Sign in to continue</p>
                          </div>
                        </Col>
                        <Col className="col-5 align-self-end">
                          <img
                            alt="RC Icon"
                            src={profile}
                            width="300"
                            height="200"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                    </div>
                    <CardBody className="pt-0">
                      <div>
                        <Link to="/" className="auth-logo-light">
                          <div className="avatar-md profile-user-wid mb-3">
                            <span className="avatar-title rounded-circle bg-light">
                              <img
                                src={logo}
                                alt="RC icon"
                                className="rounded-circle"
                                height="34"
                              />
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="p-2">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          {loginError && (
                            <Alert
                              className="fw-bolder text-center"
                              color="danger"
                            >
                              {loginError}
                            </Alert>
                          )}

                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>

                          {/* <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div> */}

                          <div className="mt-4 d-grid">
                            {loading ? (
                              <button
                                type="button"
                                className="btn btn-dark"
                                style={{ cursor: "not-allowed" }}
                              >
                                <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                Validating login...
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            )}
                          </div>
                          <div className="mt-3 text-center">
                            <p>
                              Don&#39;t have an account ?{" "}
                              <Link
                                to="/register"
                                className="fw-medium text-primary"
                              >
                                {" "}
                                Signup now{" "}
                              </Link>{" "}
                            </p>
                          </div>

                          {/* <div className="mt-3 text-center">
                          <h5 className="font-size-14 mb-3">Sign in with</h5>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <FacebookLogin
                                appId={facebook.APP_ID}
                                autoLoad={false}
                                callback={facebookResponse}
                                render={renderProps => (
                                  <Link
                                    to="#"
                                    className="social-list-item bg-primary text-white border-primary"
                                    onClick={renderProps.onClick}
                                  >
                                    <i className="mdi mdi-facebook" />
                                  </Link>
                                )}
                              />
                            </li>
                            <li className="list-inline-item">
                              <GoogleLogin
                                clientId={google.CLIENT_ID}
                                render={renderProps => (
                                  <Link
                                    to="#"
                                    className="social-list-item bg-danger text-white border-danger"
                                    onClick={renderProps.onClick}
                                  >
                                    <i className="mdi mdi-google" />
                                  </Link>
                                )}
                                onSuccess={googleResponse}
                                onFailure={() => {}}
                              />
                            </li>
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-primary text-white border-primary"
                              >
                                <i className="mdi mdi-twitter"></i>
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-danger text-white border-danger"
                              >
                                <i className="mdi mdi-linkedin"></i>
                              </Link>
                            </li>
                          </ul>
                        </div> */}

                          <div className="mt-4 text-center">
                            <Link to="/emailforgotPwd" className="text-black">
                              <i className="mdi mdi-lock me-1" />
                              Forgot your password?
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(RainLogin);

RainLogin.propTypes = {
  history: PropTypes.object,
};
