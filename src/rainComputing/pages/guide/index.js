import React from "react"
const Guide = () => {

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="py-5"
    >
    <iframe
  title="Document Viewer"
  style={{
    width: "60%", // Adjust the width as needed
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  }}
  src="https://docs.google.com/document/d/e/2PACX-1vSp0klcBAfwTarj2LzqJ-_fGyhDc_uB4ciOzu34Ml4GrrPH0kACB_-voNtqcB8i0OBM5iOlWC5VDceI/pub?embedded=true"
></iframe>
    </div>
  )
}

export default Guide
