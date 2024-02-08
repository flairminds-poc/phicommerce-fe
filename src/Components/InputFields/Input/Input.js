import React from "react";

const CustomInput = ({f, onChange, value = ''}) => {

    return(
        <div>
            {f.showFieldName &&
                <div>
                    <label style={{fontSize: 'small'}} for={f.label_name}>{f.display_name}<span style={{color: 'red'}}>{f.required ? '*' : ''}</span></label>
                </div>}
            <div>
                {f.showDescription &&
                    <div style={{fontSize: 'small'}}>{f.description}</div>}
            </div>
            <div>
                <input type={f.input_type} required={f.required} value={value} onChange={(e) => onChange(e, f)} style={{padding: '5px', outline: 'none', borderRadius: '5px', width: '200px', height: '20px', border: '1px solid black'}} />
            </div>
        </div>
    )
}

export default CustomInput;