import React, { useState} from "react"
import keys from "../../config.js"
const LocationForm: React.FC = () => {

  const [userLocation, setUserLocation] = useState(" ")
  const accessKeyId = keys.accessKeyId
  const secretAccessKey = keys.secretAccessKey

  // longterm need to update the type!
  const handleChange = (event: any) => {

    setUserLocation(event.target.value)

  }

  const AWS = require('aws-sdk')

  let awsParameters = {
    "IndexName": "explore.place",
    "Text": `${userLocation}`,
    "FilterCountries": ["USA"]
  }
  let location = new AWS.Location({
    region: "us-east-1",
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });

  location.searchPlaceIndexForSuggestions(awsParameters, function(err: any, data: any) {
      if (err) console.log("error",err, err.stack); // an error occurred
      else     console.log("data",data); })

  // console.log(SearchPlaceIndexForSuggestions(parameters, function(err: any, data: any) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data); }))

  return(
  <section>
    <input placeholder="Search For Your City" value={userLocation} onChange={handleChange} />
  </section>
  )
}

export default LocationForm