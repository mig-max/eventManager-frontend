/* eslint-disable react/prop-types */

function VenueSummary({venue}) {


    return (

        <div>
            <h2>{venue.name}</h2>

            {venue.imageUrl && 
            <img src={venue.imageUrl} 
            alt={venue.name} />}
            
        </div>
    )
}


export default VenueSummary;