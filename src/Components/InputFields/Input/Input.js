import React, { useEffect, useState } from "react";

const CustomInput = ({f, onChange, value = ''}) => {
    const [labelText, setLabelText] = useState("")

    useEffect(() => {
        setLabelText(f.field_label.replaceAll('_', ' ').toUpperCase())
    }, [f.field_label])

    return(
        <div>
            <div><label style={{fontSize: 'small'}}>{labelText}</label></div>
            <div>
                <input type={f.input_type} required={f.required} value={value} onChange={(e) => onChange(e, f)} style={{padding: '5px', outline: 'none', borderRadius: '5px', width: '200px', height: '20px', border: '1px solid black'}} />
            </div>
        </div>
    )
}

export default CustomInput;