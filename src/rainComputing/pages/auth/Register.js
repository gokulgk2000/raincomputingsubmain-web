import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

// import images
import profileImg from "../../../../src/assets/images/profile-img.png"
import logo from "../../../../src/assets/images/rain-drop.png"
import login from "../../../../src/assets/images/loginanimi.png"
import { userRegisteration } from "../../../../src/rainComputing/helpers/backend_helper"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useToggle } from "../../../../src/rainComputing/helpers/hooks/useToggle"
import TermsModal from "../../../../src/rainComputing/components/modals/TermsModal"
import DynamicModel from '../../../../src/rainComputing/components/modals/DynamicModal';
import DynamicSuspense from '../../../../src/rainComputing/components/loader/DynamicSuspense';
const RainRegister = () => {
  let history = useHistory()
  const [registrationError, setRegistrationError] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    toggleOpen: termsModelOpen,
    setToggleOpen: setTermsModelOpen,
    toggleIt: toggleTermsModelOpen,
  } = useToggle(false)
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstname: Yup.string().required("Please Enter Your firstname"),
      lastname: Yup.string().required("Please Enter Your lastname"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(/^(?=.{5,})/, "Must Contain 5 Characters"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      setLoading(true)
      //   dispatch(registerUser({ ...values, aflag: true }))
      const res = await userRegisteration({ ...values, aflag: true })
      if (res.success) {
        setRegistrationError("")
        setRegistrationSuccess(res.msg)
        // onSubmitProps.setSubmitting(false) //Vidhya
        onSubmitProps.resetForm()
        toastr.success(`Registered successfully `, "Success")
        history.push("/login")
      } else {
        setRegistrationSuccess("")
        setRegistrationError(res.msg)
      }
      setLoading(false)
    },
  })

  return (
    <React.Fragment>
      <div className="p-5 m-5">
        <MetaTags>
          <title>Register | Raincomputing</title>
        </MetaTags>
        <div className="d-flex ">
          <div className="d-none d-xl-block  ps-lg-5 ms-lg-5 mt-2 ">
            <div className="my-5">
              <div className="justify-content-center">
                <input type="img" src={login} height="450" width="600" />
              </div>
              {/* <p className="fs-5 pt-5 ps-5 ">
              Manage all communication in one place
            </p> */}
            </div>
          </div>
          <div className="container ">
            <Container className="cont1">
              <Row className="justify-content-center">
                <Col md={8} lg={7} xl={9}>
                  <Card className="overflow-hidden">
                    <div className="bg-primary bg-soft">
                      <Row>
                        <Col className="col-7 ">
                          <div className="text-primary p-3">
                            <h5 className="text-primary"> Register</h5>
                            <p>Get your rain account now.</p>
                          </div>
                        </Col>
                        <Col className="col-5 align-self-end">
                          <input type="img"
                            src={profileImg}
                            height="100"
                            width="300"
                            className="img-fluid"
                          />
                        </Col>
                      </Row>
                    </div>
                    <CardBody className="pt-0">
                      <div>
                        <Link to="/">
                          <div className="avatar-md profile-user-wid mb-1">
                            <span className="avatar-title rounded-circle bg-light">
                              <input type="img"
                                src={logo}
                                alt=""
                                className="rounded-circle"
                                height="34"
                              />
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="">
                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          {registrationSuccess && (
                            <Alert
                              className="fw-bolder text-center"
                              color="success"
                            >
                              {registrationSuccess}
                            </Alert>
                          )}

                          {registrationError && (
                            <Alert
                              color="danger"
                              className="fw-bolder text-center"
                            >
                              {registrationError}
                            </Alert>
                          )}

                          <div className="mb-2">
                            <Label className="form-label">First Name</Label>
                            <Input
                              name="firstname"
                              type="text"
                              placeholder="Enter first name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.firstname || ""}
                              invalid={
                                validation.touched.firstname &&
                                validation.errors.firstname
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.firstname &&
                            validation.errors.firstname ? (
                              <FormFeedback type="invalid">
                                {validation.errors.firstname}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <Label className="form-label">Last Name</Label>
                            <Input
                              name="lastname"
                              type="text"
                              placeholder="Enter last name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.lastname || ""}
                              invalid={
                                validation.touched.lastname &&
                                validation.errors.lastname
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.lastname &&
                            validation.errors.lastname ? (
                              <FormFeedback type="invalid">
                                {validation.errors.lastname}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <Label className="form-label">Email</Label>
                            <Input
                              id="email"
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

                          <div className="mb-2">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
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
                          <div className="mt-1">
                          <DynamicModel
                              open={termsModelOpen}
                              toggle={toggleTermsModelOpen}
                              size="lg"
                              modalTitle="Terms & Condition"
                              footer={false}
                              isClose={true}
                            >
                              <DynamicSuspense>
                                <TermsModal 
                                setModalOpen={setTermsModelOpen}/>
                              </DynamicSuspense>
                            </DynamicModel>
                            <p className="">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                required
                                id="flexCheckDefault"
                              />
                              By registering you agree to the raincomputing{" "}
                             
                              <button
  className="text-primary font-sm"
  onClick={() => {
    setTermsModelOpen(true);
  }}
>
  Terms of Use
</button> 
                            </p>
                          </div>
                          <div className="mt-3 d-grid">
                            {loading ? (
                              <button
                                type="button"
                                className="btn btn-dark"
                                style={{ cursor: "not-allowed" }}
                              >
                                <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                Registering...
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                              >
                                Register
                              </button>
                            )}
                          </div>

                          <div className=" mt-2 text-center">
                            <p>
                              Already have an account ?{" "}
                              <Link
                                to="/login"
                                className="font-weight-medium text-primary"
                              >
                                {" "}
                                Login
                              </Link>{" "}
                            </p>
                          </div>
                          {/* <div className="text-center ">
                          <a href="https://www.google.co.in/">
                          <i className="fab fa-google me-2 "></i>
                          </a>
                          <a href="">
                          <i class="fab fa-linkedin-in  me-2"></i>
                          </a>
                          <a href="">      
                          <i class="fab fa-twitter me-2"></i>
                           </a>
                        </div> */}
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
  )
}

export default RainRegister
