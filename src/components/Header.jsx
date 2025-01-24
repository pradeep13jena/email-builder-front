import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
  const htmlContent = useSelector((state) => state.htmlContentSlice.htmlContent)

  const handleDownload = () => {
    if(htmlContent) {

      const downloadContent = `
      <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>`;

      const blob = new Blob([downloadContent], { type: "text/html" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "emailTemplate.html"
      link.click()
    } else {
      alert("No content available to download.");
    }
  }

  return (
    <div className='m-2 flex justify-end items-center mr-4'>
      <button onClick={handleDownload} className='bg-[#EEECE8] px-2 py-1 rounded-md hover:border-2 hover:border-black border-2 transition-all duration-200'> Download </button>
    </div>
  )
}
