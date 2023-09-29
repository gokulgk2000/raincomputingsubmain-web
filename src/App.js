import React from "react"

import { Switch, BrowserRouter as Router, Route } from "react-router-dom"

// Import Routes all
import { authProtectedRoutes, publicRoutes, adminRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"


// Import scss
import "./assets/scss/theme.scss"

import { ChatProvider } from "../src/rainComputing/contextProviders/ChatProvider"
import { useSocket } from "../src/rainComputing/contextProviders/SocketProvider"
import LandingGrid from "../src/rainComputing/pages/landing/LandingGrid"

const App = () => {
  // LogRocket.init("jk2db1/demo", {
  //   dom: {
  //     textSanitizer: true,
  //     inputSanitizer: true,
  //   },
  // })
  // if (currentUser?.userID) {
  //   LogRocket.identify(currentUser?.userID, {
  //     name: currentUser?.firstname + " " + currentUser?.lastname,
  //     email: currentUser?.email,
  //   })
  // }

  const { socket } = useSocket()

  return (
    <ChatProvider socket={socket}>
      {/* <NotificationsProvider> */}
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <HorizontalLayout>
                  <LandingGrid {...props} />
                </HorizontalLayout>
              )}
            />
            {publicRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={HorizontalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={HorizontalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}

            {adminRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={VerticalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
      {/* </NotificationsProvider> */}
    </ChatProvider>
  )
}

export default App
