/* eslint-disable react/prop-types */

function VenueSummary({venue}) {


    return (

        <div>
            <h2>{venue.name}</h2>
            <p>{venue.venueType}</p>
        </div>
    )
}


export default VenueSummary;