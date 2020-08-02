import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
} from '@coreui/react'

const WidgetsDropdown = (stats) => {
  // render
  return (
    <CRow>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={stats.stats.registerd}
          text="Registerd For the exam"
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={stats.stats.amount}
          text="Rupees Received"
        >
        </CWidgetDropdown>
      </CCol>
      
      {/* 
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Option 2"
        >
        </CWidgetDropdown>
      </CCol> */}
      
    </CRow>
  )
}

export default WidgetsDropdown
