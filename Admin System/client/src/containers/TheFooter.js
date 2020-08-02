import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">STET-Admin</a>
        <span className="ml-1">&copy; 2020 404-Found.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
