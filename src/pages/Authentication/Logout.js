import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"

import { logoutUser } from "../../store/actions"

//redux
import { useDispatch } from "react-redux"
import { useUser } from "../../../src/rainComputing/contextProviders/UserProvider"

const Logout = props => {
  const dispatch = useDispatch()
  const { setCurrentUser } = useUser()

  useEffect(() => {
    dispatch(logoutUser(props.history))
    setCurrentUser(null)
  }, [dispatch,props.history,setCurrentUser])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
