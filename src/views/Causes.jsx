import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const Causes = () => {
  const [formData, setFormData] = useState([]);
  const [createModal] = useGlobalState('createModal')
  let [title, setTitle] =  useState('')
  let [description, setDescription] = useState('')
  let [cost, setCost] = useState('')
  let [date, setDate] = useState('')
  let [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (data) => {
    onClose()
    console.log("Entered")
   // console.log(data.title)
  //  data.preventDefault()
   
     if (!data.title || !data.Description || !data.cost  || !data.imageurl) return
    
    console.log("created")
    title=data.title
    description=data.Description
    cost=data.cost
    date=data.date
    imageURL=data.imageurl
    
    const params = {
      title,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    }
    console.log("created")
    await createProject(params)
    toast.success('Project created successfully, will reflect in 30sec.')
    onClose()
    window.location.reload()
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setTitle('')
    setCost('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

  useEffect(() => {
    async function fetchFormData() {
      const response = await axios.get("https://hashfund-server-production.up.railway.app/api/form-data");
      setFormData(response.data);
    }
    fetchFormData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://hashfund-server-production.up.railway.app/api/form-data/${id}`
      );
      console.log(response.data);
      setFormData(formData.filter((data) => data._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-60">

      {formData.map((data) => (
         <div
         class="font-bold block rounded-lg bg-grey p-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white-700">
         
          Image: {<img src={data.imageurl} alt="pan" />} <br />
         FirstName: {data.firstName} <br />
         MiddleName: {data.middleName} <br />
         LastName:{data.lastName} <br />
         Date:{data.date}<br/>
         Email: {data.email} <br /> Cost:{data.cost} <br />
         Title: {data.title} <br />
         Description :{data.Description} <br />
         Pan:{<img src={data.pan} alt="pan" />} <br />
          Hospital: {<img src={data.hospital} alt="Hospital" />} <br />
          Aadhaar: {<img src={data.aadhar} alt="Aadhar" />} <br />
          <button onClick={() => handleDelete(data._id)} style={{fontWeight:"bolder", border:"1px solid red",padding:"10px", color:"red",borderRadius:"40px"}}>Remove</button>
          <button  onClick={() => handleSubmit(data)}style={{fontWeight:"bolder", border:"1px solid green",padding:"10px", color:"green",borderRadius:"40px"}}>ADD</button>
          
        </div>
      ))}
    </div>
  );
};

export default Causes;
