import React, { useState, useEffect } from "react";

export default function Home() {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");

  // Simulating a fetch from the database
  useEffect(() => {
    // This simulates pulling the template from the database
    const fetchedTemplate = {
      content: [
        { type: "title", value: "Editable Title" },
        { type: "paragraph", value: "This is an editable paragraph." },
        { type: "image", value: "https://dummyimage.com/200x200/000/fff" },
      ],
    };
    setContent(fetchedTemplate.content);
    setTitle(fetchedTemplate.content[0].value); // Assuming the first element is the title
  }, []);

  const handleContentChange = (index, newValue) => {
    setContent((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, value: newValue } : item
      )
    );
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      handleContentChange(index, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const moveSection = (index, direction) => {
    setContent((prev) => {
      const newContent = [...prev];
      const [removed] = newContent.splice(index, 1); // Remove the current item
      newContent.splice(index + direction, 0, removed); // Re-insert in the new position
      return newContent;
    });
  };

  const handleSave = () => {
    // Send updated content to the database
    console.log("Updated content:", content);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Editable Title */}
        <h1
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => setTitle(e.target.innerText)}
          style={{
            outline: "none",
            cursor: "text",
            border: "1px dashed #007BFF",
            padding: "4px",
            marginBottom: "16px",
          }}
        >
          {title}
        </h1>

        {/* Dynamic Content */}
        {content.map((item, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            {item.type === "paragraph" && (
              <p
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) => handleContentChange(index, e.target.innerText)}
                style={{
                  outline: "none",
                  cursor: "text",
                  border: "1px dashed #007BFF",
                  padding: "4px",
                }}
              >
                {item.value}
              </p>
            )}
            {item.type === "image" && (
              <div style={{ textAlign: "center" }}>
                <img
                  src={item.value}
                  alt="Editable"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                  style={{ marginTop: "8px" }}
                />
              </div>
            )}

            {/* Reorder Buttons */}
            <div>
              <button
                onClick={() => moveSection(index, -1)}
                disabled={index === 0}
                style={{
                  marginRight: "8px",
                  padding: "4px 8px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Move Up
              </button>
              <button
                onClick={() => moveSection(index, 1)}
                disabled={index === content.length - 1}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Move Down
              </button>
            </div>
          </div>
        ))}

        {/* Save Button */}
        <button
          onClick={handleSave}
          style={{
            display: "block",
            margin: "8px 0",
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
