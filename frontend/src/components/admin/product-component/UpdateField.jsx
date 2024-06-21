import React, { useState } from "react";

const EditableField = ({ value, onEdit, onBlur }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(value);
  
    const handleEditToggle = () => {
      setIsEditing(true);
    };
  
    const handleInputChange = (event) => {
      setEditedValue(event.target.value);
    };
  
    const handleBlur = () => {
      setIsEditing(false);
      onBlur(editedValue);
    };
  
    return (
      <div>
        {isEditing ? (
          <input
            type="text"
            value={editedValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        ) : (
          <p onClick={handleEditToggle}>{value}</p>
        )}
      </div>
    );

}
export default EditableField;
