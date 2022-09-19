import React, { useState, useEffect} from "react"
import debounce  from "lodash.debounce"
const LocationForm: React.FC = () => {

  const [userSearch, setUserSearch] = useState("")
  const accessKeyId = process.env.REACT_APP_accessKeyId
  const secretAccessKey = process.env.REACT_APP_secretAccessKey

  useEffect(() => {
    if(userSearch.length) {
      console.log("hello")
      search()
    }
  }, [userSearch])


  const AWS = require('aws-sdk')

  let awsParameters = {
    "IndexName": "explore.place",
    "Text": `${userSearch}`,
    "FilterCountries": ["USA"]
  }

  let location = new AWS.Location({
    region: "us-east-1",
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

  // longterm need to update the type!
  const handleChange = (event: any) => {

    setUserSearch(event?.target?.value)
    console.log("handlechange")
    
  }

  const debounced = debounce(handleChange, 1000)
  
  
  const search = () => {location.searchPlaceIndexForSuggestions(awsParameters, function(err: any, data: any) {
    console.log("aws")
    if (err) console.log("error",err, err.stack); // an error occurred
    else     console.log("data",data); })
  }
      
  return(
  <section>
    <input placeholder="Search For Your City" onChange={debounced} />
  </section>
  )
}

export default LocationForm