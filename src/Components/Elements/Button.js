import React from "react";

const CustomButton = ({ text, onClick }) => {
    return(
        <button type='submit' style={{border: '0', padding: '10px 25px', cursor: 'pointer', borderRadius: '5px', backgroundColor: 'greenyellow'}} onClick={onClick}>{text}</button>
    )
}

export default CustomButton;