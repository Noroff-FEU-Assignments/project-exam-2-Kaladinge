import React, { useState } from "react";

function Accommodation() {
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchDataError, setFetchDataError] = useState(null);

  return <div>Accommodation</div>;
}

export default Accommodation;
