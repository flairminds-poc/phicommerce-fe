import React, { useEffect, useState } from "react";

const CustomDropdown = ({f, onChange, value = ''}) => {
    const [labelText, setLabelText] = useState("")

    useEffect(() => {
        setLabelText(f.field_label.replaceAll('_', ' ').toUpperCase())
    }, [f.field_label])

    return(
        <div>
            <div>
                {f.showFieldName &&
                    <label style={{fontSize: 'small'}} for={f.field_label}>{labelText}</label>}
            </div>
            <div>
                {f.showDescription &&
                    <p style={{fontSize: 'small'}}>{f.description}<span style={{color: 'red'}}>{f.required && !f.showFieldName ? '*' : ''}</span></p>}
            </div>
            <div>
                <select id={f.field_label} name={f.field_label} onChange={(e) => onChange(e, f)} style={{padding: '5px', outline: 'none', borderRadius: '5px', width: '200px', border: '1px solid black'}}>
                    <option value='' disabled selected>-- Select --</option>
                    {f.options.map(fo => {
                        return(
                            <option value={fo} selected={value === fo}>{fo}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default CustomDropdown;