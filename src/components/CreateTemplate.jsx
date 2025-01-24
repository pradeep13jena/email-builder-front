import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

// Importing redux store and slices
import { useSelector, useDispatch } from 'react-redux'
import { setTemplate } from '../features/templateSlice.js'
import { sethtmlContent } from '../features/htmlContentSlice.js'
import { setSelectedItem } from '../features/selectedItemSlice.js'

// Importing icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function CreateTemplate() {
  const [file, setFile] = useState(null)
  const templateRef = useRef(null)
  const dispatch = useDispatch()

  const template = useSelector((state) => state.template.template);
  const selectedItem  = useSelector((state) => state.SelectedItem.selectedItem)

  const getTemplate = async () => {
    try {
      const response = await axios.get("https://easyemail.onrender.com/template");
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error fetching the template:", error);
    }
  }; 
  
  const deleteItem = async (_id) => {
    try {
      const response = await axios.delete("https://easyemail.onrender.com/template/delete", {
        data: { _id }
      });
      dispatch(setTemplate(response.data));
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    
    if(!file) {
      alert("No file selected")
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "cloudinary_upload")
    formData.append("cloud_name", "dwqukaxyb")

    const response = await axios.post(`https://api.cloudinary.com/v1_1/dwqukaxyb/image/upload`, formData)

    const res = await axios.put(`https://easyemail.onrender.com/template/image/${selectedItem}`, 
      {content : response.data.url}
    )

    dispatch(setTemplate(res.data))
  } 

  useEffect(() => {
    getTemplate()
  }, [])

  useEffect(() => {
    if(templateRef.current) {
      const htmlContent = templateRef.current.innerHTML
      dispatch(sethtmlContent(htmlContent))
    }
  }, [template])

  return (
    <div className='w-3/4 border-[1px] h-[calc(100vh-55px)] border-black rounded-md bg-[#EEECE8] mx-4 py-4'>
      <div id='createTemplate' ref={templateRef} className='w-[600px] h-full overflow-y-auto px-3 py-2 border-black mx-auto rounded-md bg-white flex flex-col gap-3'>
      {template?.items?.length === 0 ? (
        <div className='flex justify-center items-center h-full'>
          <p className='text-gray-500 font-lato'>Begin your creativity.</p>
        </div>
      ) : (
        template?.items?.map((item) => (
          <div key={item._id} onClick={() => dispatch(setSelectedItem(item._id))} className={`w-full relative group hover:border-[2px] hover:border-blue-500 hover:border-dashed rounded-sm py-[5px] cursor-pointer ${item._id === selectedItem ? "border-[2px] border-blue-500 border-dashed rounded-sm" : ""} ${item.type === "button" ? "text-center" : ""}`}>
            {item.type === 'text' ? (
              item.link ? (
                <a href={item.link} target="_blank" onClick={(event) => event.preventDefault()}>
                  <p className='relative' style={item.style}>{item.content}</p>
                  <span onClick={() => deleteItem(item._id)} className="text-red-500 z-50 bg-white absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-10 h-10 flex justify-center items-center cursor-pointer">
                    <DeleteOutlineIcon />
                  </span>
                </a>
              ) : (
                <>
                  <p style={item.style}>{item.content}</p>
                  <span onClick={() => deleteItem(item._id)} className="text-red-500 absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-10 h-10 flex justify-center items-center cursor-pointer">
                    <DeleteOutlineIcon />
                  </span>
                </>
              )
            ) : item.type === 'image' ? (
              item.link ? (
                <a href={item.link} target="_blank">
                  <img style={item.style} src={item.content} alt="image" className="block relative" />
                  <form onSubmit={handleFileUpload}  className='flex flex-col justify-start items-start gap-3 absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 bg-gray-100 p-2 rounded-tr-2xl'>
                    <input type="file" onChange={handleFileChange}/>
                    <button className='px-2 py-1 border-2 border-gray-500 hover:border-black rounded-lg transition-all duration-150 bg-gray-200' type="submit">Upload</button>
                  </form>
                  <span onClick={() => deleteItem(item._id)} className="text-red-500 absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-10 h-10 flex justify-center items-center cursor-pointer">
                    <DeleteOutlineIcon />
                  </span>
                </a>
              ) : (
                <>
                  <img style={item.style} src={item.content} alt="image" className="block relative" />
                  <form onSubmit={handleFileUpload}  className='flex flex-col justify-start items-start gap-3 absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 bg-gray-100 p-2 rounded-tr-2xl'>
                    <input type="file" onChange={handleFileChange}/>
                    <button className='px-2 py-1 border-2 border-gray-500 hover:border-black rounded-lg transition-all duration-150 bg-gray-200' type="submit">Upload</button>
                  </form>
                  <span onClick={() => deleteItem(item._id)} className="text-red-500 absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-10 h-10 flex justify-center items-center cursor-pointer">
                    <DeleteOutlineIcon />
                  </span>
                </>
              )
            ) : item.type === 'button' ? (
              item.link ? (
                <a href={item.link} target="_blank" onClick={(event) => event.preventDefault()}>
                  <button style={item.style} className='relative'>{item.content}</button>
                  <span onClick={() => deleteItem(item._id)} className="text-red-500 absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-10 h-10 flex justify-center items-center cursor-pointer">
                    <DeleteOutlineIcon />
                  </span>
                </a>
              ) : (
                <>
                  <button style={item.style}>{item.content}</button>
                  <span onClick={() => deleteItem(item._id)} className="text-red-500 absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex justify-center items-center cursor-pointer">
                    <DeleteOutlineIcon />
                  </span>
                </>
              )
            ) : null}
          </div>
        ))
      )}
      </div>
    </div>
  )
}