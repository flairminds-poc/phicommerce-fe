import React from "react";

const CustomDropdown = ({f, onChange, value = ''}) => {

    return(
        <div>
            <div>
                {f.showFieldName &&
                    <label style={{fontSize: 'small'}} for={f.label_name}>{f.display_name}<span style={{color: 'red'}}>{f.required ? '*' : ''}</span></label>}
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