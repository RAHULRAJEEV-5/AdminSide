import React from "react";
import  { useEffect, useState } from "react";
import axios from "axios"

const contmsg = () => {
    const [formData, setFormData] = useState([]);


    useEffect(() => {
        async function fetchFormData() {
          const response = await axios.get("https://hashfund-server-production.up.railway.app/api/ContactUS");
          setFormData(response.data);
        }
        fetchFormData();
      }, []);

      console.log(formData);

    return ( 
    
    <div className="ml-60">
    
        
        {formData.map((data) => (
        <div
        class="font-bold block rounded-lg bg-grey p-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white-700">
        

         Name: {data.name} <br />
          Phone: {data.phone} <br />
          Email: {data.email} <br />
          Message: {data.message} <br />
        </div>
      ))}
        </div> 
     );
}
 
export default contmsg;