import React, { useState } from 'react'
import { debounce } from 'lodash';
import axios from 'axios';

// Importing redux
import { useSelector, useDispatch } from 'react-redux';
import { setTemplate } from '../features/templateSlice';

// Importing icons
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import FormatAlignRightOutlinedIcon from '@mui/icons-material/FormatAlignRightOutlined';

export default function Drawer() {

  const [text, setText] = useState({textContent : "", linkContent : "", colorContent: "#000000", widthContent : "", heightContent: ""})
  const [color,setColor] = useState('#000000')

  function handleChange(e){
    const {name, value} = e.target;
    setText({...text, [name]: value})
  }

  const changeColor = async (newColor) => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/changecolor/${selectedItem}`, {color: newColor})  
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const debouncedUpdatedColor = debounce((newColor) => {
    changeColor(newColor)
  }, 300)

  const handleCOlorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    debouncedUpdatedColor(newColor)
  }

  const dispatch = useDispatch()

  const selectedItem  = useSelector((state) => state.SelectedItem.selectedItem)

  const textBody = {
    'type': 'text',
    'content': 'Select on items you want to edit.',
    'style': {    
      "fontSize" : "2rem",
      "color" : "black",
      "textAlign" :"center"
    },
  }

  const imageBody = {
    'type': 'image',
    'content': 'https://i.pinimg.com/736x/20/8d/70/208d70e0ad0dba556decdf3a02e825f2.jpg',
    'style': {
      "width" : "800px",
      "height" : "280px",
      "margin" : "0 auto"
    },
  }

  const buttonBody = {
    "type" : "button",
    "content" : "Click Here",
    "style" : {
      "fontSize" : "1rem",
      "backgroundColor" : "#007BFF",
      "color" : "#fff",
      "padding" : ".6em 1.5em",
      "borderRadius" : "5px",
      "textAlign" : "center"
    }
  }

  const createItem = async (body) => {
    try {
      const response = await axios.post("https://easyemail.onrender.com/template/add", body);
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const moveUp = async (_id) => {
    try {
      const response = await axios.put("https://easyemail.onrender.com/template/moveup", {_id})
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const moveDown = async (_id) => {
    try {
      const response = await axios.put("https://easyemail.onrender.com/template/movedown", {_id})
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const addLink = async (_id, text) => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/addlink/${_id}`, {link: text.linkContent})
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const editText = async (_id, text) => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/edittext/${_id}`, {text: text.textContent})
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const changeFont = async (_id, fontSize) => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/fontSize/${_id}`, fontSize)  
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const changeAlign = async (_id, textAlign) => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/textalign/${_id}`, textAlign)  
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const changeItalic = async () => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/italic/${selectedItem}`)
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const changeBold = async () => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/bold/${selectedItem}`)
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const chaneUnderline = async () => {
    try {
      const response = await axios.put(`https://easyemail.onrender.com/template/underline/${selectedItem}`)
      dispatch(setTemplate(response.data))
    } catch (error) {
      console.error("Error moving item:", error);
    }
  }

  const changeImageSize = async (width, height) => {
    try {
      if (width || height) {
        const response = await axios.put(
          `https://easyemail.onrender.com/template/resize/${selectedItem}`,
          {
            width: `${width}px` || undefined,
            height: `${height}px` || undefined,
          }
        );
        
        dispatch(setTemplate(response.data));
      }
    } catch (error) {
      console.error("Error changing item size:", error);
    }
  };
  

  return (
    <div className='w-1/4 h-[calc(100vh-55px)]'>
      <div id='drawer' className='h-full border-[1px] overflow-y-auto border-black bg-[#EEECE8] mx-1 rounded-md'>
        <div className='flex flex-col'>
          <div className='flex flex-col px-4 pt-5 gap-3'>
            <p className='font-roboto font-semibold px-1'>Insert</p>
            <div className='flex justify-evenly border-[1px] rounded-md border-black'>
              <div onClick={() => createItem(textBody)} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold'>Text</div>
              <div onClick={() => createItem(imageBody)} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold'>Image</div>
              <div onClick={() => createItem(buttonBody)} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold'>Buttons</div>
            </div>
          </div>
          <div className='flex flex-col px-4 pt-5 gap-3'>
            <p className='font-roboto font-semibold px-1'>Movement</p>
            <div className='flex justify-evenly border-[1px] rounded-md border-black'>
              <div onClick={() => moveUp(selectedItem)} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold flex items-center gap-2'> <ArrowUpwardIcon/><p>Move up</p></div>
              <div onClick={() => moveDown(selectedItem)} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold flex items-center gap-2'><ArrowDownwardIcon/><p>Move down</p></div>
            </div>
          </div>
          <div className='flex flex-col px-4 pt-5 gap-3'>
            <p className='font-roboto font-semibold px-1'>Text</p>
            <div className='flex flex-col border-[1px] rounded-md border-black gap-2'>
              <div className='flex gap-2'>
                <div className='flex gap-2 ml-3 my-2 p-1 border-[1px] rounded-sm border-black'>
                  <div onClick={() => {changeBold()}} className='cursor-pointer flex justify-center items-center'><FormatBoldIcon></FormatBoldIcon></div>
                  <div onClick={() => {changeItalic()}} className='cursor-pointer flex justify-center items-center'><FormatItalicIcon></FormatItalicIcon></div>
                  <div onClick={() => {chaneUnderline()}} className='cursor-pointer flex justify-center items-center'><FormatUnderlinedIcon></FormatUnderlinedIcon></div>
                </div>
                <div className='flex gap-2 my-2 p-1 border-[1px] rounded-sm border-black'>
                  <div onClick={() => changeAlign(selectedItem, {textAlign: "left"})} className='cursor-pointer flex justify-center items-center'><FormatAlignLeftOutlinedIcon></FormatAlignLeftOutlinedIcon></div>
                  <div onClick={() => changeAlign(selectedItem, {textAlign: "center"})} className='cursor-pointer flex justify-center items-center'><FormatAlignCenterOutlinedIcon></FormatAlignCenterOutlinedIcon></div>
                  <div onClick={() => changeAlign(selectedItem, {textAlign: "right"})} className='cursor-pointer flex justify-center items-center'><FormatAlignRightOutlinedIcon></FormatAlignRightOutlinedIcon></div>
                </div>
                <div className='flex justify-center items-center border-[1px] my-2 p-1 border-black'>
                  <input type="color" value={text.colorContent} onChange={handleCOlorChange} id="" className='w-20 h-8'/>
                </div>
              </div>
              <textarea className='bg-[#EEECE8] resize-none rounded-md focus:outline-none px-3 font-lato text-lg' placeholder='Write text' name='textContent' value={text.textContent} onChange={handleChange} rows={4}></textarea>
              <button onClick={() => editText(selectedItem, text)} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold'>Submit</button>
            </div>
          </div>
          <div className='flex flex-col px-4 pt-5 gap-3'>
            <p className='font-roboto font-semibold px-1'>Fontsize</p>
            <div className='flex justify-evenly border-[1px] rounded-md border-black'>
              <div onClick={() => changeFont(selectedItem, {fontSize: "0.75rem"})} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold transition-all duration-300'>xs</div>
              <div onClick={() => changeFont(selectedItem, {fontSize: "0.875rem"})} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold transition-all duration-300'>sm</div>
              <div onClick={() => changeFont(selectedItem, {fontSize: "1rem"})} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold transition-all duration-300'>md</div>
              <div onClick={() => changeFont(selectedItem, {fontSize: "1.125rem"})} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold transition-all duration-300'>lg</div>
              <div onClick={() => changeFont(selectedItem, {fontSize: "1.5rem"})} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold transition-all duration-300'>xl</div>
              <div onClick={() => changeFont(selectedItem, {fontSize: "2rem"})} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold transition-all duration-300'>2xl</div>
              <div onClick={() => changeFont(selectedItem, {fontSize: "2.5rem"})} className='font-lato font-medium py-1 cursor-pointer hover:font-semibold transition-all duration-300'>3xl</div>
            </div>
          </div>
          <div className='flex flex-col px-4 pt-5 gap-3'>
            <p className='font-roboto font-semibold px-1'>Link</p>
            <div className='flex border-[1px] rounded-md border-black items-center'>
              <input name='linkContent' value={text.linkContent} onChange={handleChange} type="text" className='bg-transparent pl-2 focus:outline-none py-1 w-3/4' placeholder='link' />
              <button onClick={() => addLink(selectedItem, text)} className='w-1/4 hover:font-semibold transition-all duration-300' type="submit">Submit</button>
            </div>
          </div>
          <div className='flex flex-col px-4 pt-5 gap-3 mb-5 w-full'>
            <p className='font-roboto font-semibold px-1'>Image sizing</p>
            <div className='flex border-[1px] rounded-md border-black items-center w-full'>
              <div className='w-3/4 flex items-center justify-start gap-5'>
                <input type="number" className='bg-transparent pl-2 focus:outline-none py-1 w-24' onChange={handleChange} name='widthContent' value={text.widthContent} placeholder='200' />
                <p>X</p>
                <input type="number" className='bg-transparent pl-2 focus:outline-none py-1 w-24' onChange={handleChange} name='heightContent' value={text.heightContent} placeholder='200' />
                <button onClick={() => changeImageSize(text.widthContent, text.heightContent)} className='w-1/4 hover:font-semibold transition-all duration-300' type="submit">Resize</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
