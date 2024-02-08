import React from "react";

const ChecksInput = ({f, onChange, value = []}) => {

    return(
        <div>
            <div><label style={{fontSize: 'small'}}>{f.display_name}<span style={{color: 'red'}}>{f.required ? '*' : ''}</span></label></div>
            <div>
                {f.options.map(fo => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100px'}}>
                            <div><label style={{fontSize: 'small'}}>{fo}</label></div>
                            <div>
                                <input type={f.input_type} checked={value.includes(fo)} onChange={(e) => onChange(e, f)} value={fo} name={f.field_label} style={{padding: '5px', outline: 'none', borderRadius: '5px', height: '20px', border: '1px solid black'}} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChecksInput;