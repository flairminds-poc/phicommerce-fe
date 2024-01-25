import './App.css';
import React, { useState } from 'react';
import { data, tabs } from './data';
import { InputFields } from './Components/InputFields';
import CustomButton from './Components/Elements/Button';

function App() {

	const [sampleData, setSampleData] = useState({});
	const [step, setStep] = useState(1);

	const handleOnChange = (e, f) => {
		if (f.regex_validation) {
			let regexV = new RegExp(f.regex_validation)
			console.log(regexV.test(e.target.value))
		}
		let temp = sampleData;
		if (e.target.value && e.target.value != '') {
			temp = {
				...temp,
				[f.field_label]: e.target.value
			}
		} else {
			if (Object.keys(sampleData).includes(f.field_label)) {
				delete temp[f.field_label]
			}
		}
		setSampleData(temp)
	}

	const handleCheckboxOnChange = (e, f) => {
		let temp = sampleData;
		let checkboxData = temp[f.field_label] || []
		if (e.target.checked) {
			checkboxData.push(e.target.value)
		} else {
			checkboxData.splice(checkboxData.indexOf(e.target.value), 1)
		}
		temp = {
			...temp,
			[f.field_label]: checkboxData
		}
		setSampleData(temp)
	}

	const handleOnClick = (e, t) => {
		e.preventDefault()
		let error = false
		const thisTabFields = data.fields.filter(f => f.tab === t.id)
		const thisTabFieldsArr = Object.keys(sampleData)
		thisTabFields.forEach(ttf => {
			if (ttf.required && !thisTabFieldsArr.includes(ttf.field_label)) {
				error = true
				console.log(`${ttf.field_label} field is required.`)
			}
		})
		if (error) {
			console.log('errors found')
			return
		}
		setStep(t.id + 1)
		console.log(sampleData)
	}

	const prereqSatisfied = (f) => {
		const temp =sampleData
		let flag = true
		if (f.preRequisites) {
			for (let i = 0; i < f.preRequisites.length; i++) {
				let p = f.preRequisites[i]
				if (Object.keys(sampleData).includes(p.field_label) && sampleData[p.field_label] === p.value ) {
					flag = true
				} else {
					flag = false
					break
				}
			}
		}
		return flag
	}

	return (
		<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
			{tabs.tabs.map(t => {
				return (
					<>
						{step === t.id && 
							<div style={{padding: '50px', borderRadius: '5px', border: '1px solid grey', width: '400px', height: '600px'}}>
							{t.name}
							<form>
								{data.fields.filter(temp => temp.tab === t.id).map(f => {
									return (
										<>
											{f.showField && prereqSatisfied(f) &&
												<div style={{margin: '10px 0'}}>
													{f.input_type === 'checkbox' && <InputFields.CheckboxInput f={f} onChange={handleCheckboxOnChange} value={sampleData[f.field_label]} />}
													{f.input_type === 'radio' && <InputFields.RadioInput f={f} onChange={handleOnChange} value={sampleData[f.field_label]} />}
													{f.input_type === 'text' && <InputFields.TextInput f={f} onChange={handleOnChange} value={sampleData[f.field_label]} />}
													{f.input_type === 'password' && <InputFields.PasswordInput f={f} onChange={handleOnChange} value={sampleData[f.field_label]} />}
													{f.input_type === 'select' && <InputFields.Dropdown f={f} onChange={handleOnChange} value={sampleData[f.field_label]} />}
												</div>}
										</>
									)
								})}
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
									<CustomButton text={'Back'} onClick={() => setStep(t.id - 1)} />
									<CustomButton text={'Next'} onClick={(e) => handleOnClick(e, t)} />
								</div>
							</form>
						</div>}
					</>
				)
			})}
		</div>
	);
}

export default App;
