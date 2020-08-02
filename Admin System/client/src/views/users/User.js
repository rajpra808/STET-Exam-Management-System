import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"  
import Loader from 'react-loader-spinner'

const { ServerPORT } = require('../newports');
const uri = "http://localhost:"+ServerPORT;
const User = ({match}) => {
  const [user, setData] = useState({});
  const [isBusy, setBusy] = useState(true);
  const [userDetails,setDetails] = useState({})
  //http://localhost:8081
  const url = uri+"/alldetails/"+match.params.id;
  async function fetchData() {
    if(isBusy)
    {
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      
      const res = await axios(url, {
          mode: 'cors',
          method: 'GET',
          headers: headers
      })
      setData(res.data)
      setDetails(user ? Object.entries(user) : 
      [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]])
      setBusy(false)
    }
  }

  useEffect(() => {
    fetchData();
  }); 

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          {isBusy ? (
                <Loader
                  type="Circles"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              ) : (  
              <CCardBody>
                  <table className="table table-striped table-hover">
                    <tbody>
                      {
                        userDetails.map(([key, value], index) => {
                          return (
                            <tr key={index.toString()}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
              </CCardBody>
            )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
