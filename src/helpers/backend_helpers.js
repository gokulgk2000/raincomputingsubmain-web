import {  post  } from "./api_helper"
import { SERVER_URL } from "./configuration"
const BASE_URL = `${SERVER_URL}/api`

const userRegister = payload => post(`${BASE_URL}/user/register`, payload)


export  {
 userRegister
}