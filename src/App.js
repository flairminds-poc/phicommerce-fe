import './App.css';
import React, { useEffect, useState } from 'react';
import { data, tabs } from './data';
import { InputFields } from './Components/InputFields';
import CustomButton from './Components/Elements/Button';

function App() {

	const [sampleData, setSampleData] = useState({});
	const [formTabs, setFormTabs] = useState([]);
	const [tabFields, setTabFields] = useState([]);
	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		setFormTabs(tabs.tabs.sort((a, b) => a.order - b.order))
		setTabFields(data.fields.sort((a, b) => a.order - b.order))
	}, [])

	const handleOnChange = (e, f) => {
		setErrors([])
		if (f.regex_validation) {
			let regexV = new RegExp(f.regex_validation)
			if(!regexV.test(e.target.value)) {
				// err.push(`Validation failed for ${f.field_label}.`)
			}
		}
		let temp = sampleData;
		if (e.target.value && e.target.value !== '') {
			temp = {
				...temp,
				[f.field_label]: e.target.value
			}
		} else {
			if (Object.keys(sampleData).includes(f.field_label)) {
				delete temp[f.field_label]
			}
		}
		// setErrors(err)
		setSampleData(temp)
	}

	useEffect(() => {
		console.log(sampleData);
	}, [sampleData])

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
		if (errors.length > 0) return
		let err = errors
		const thisTabFields = tabFields.filter(f => f.tab === t.id)
		const thisTabFieldsArr = Object.keys(sampleData)
		thisTabFields.forEach(ttf => {
			// check regex validation
			if (sampleData[ttf.field_label] && ttf.regex_validation) {
				let regexV = new RegExp(ttf.regex_validation)
				if(!regexV.test(sampleData[ttf.field_label])) {
					err.push(`Validation failed for ${ttf.field_label}.`)
				}
			}
			// check other validations
			if (sampleData[ttf.field_label] && ttf.validation) {
				for (let j = 0; j < ttf.validation.length; j++) {
					let v = ttf.validation[j]
					if (v.type === 'equals') {
						if (v.field_label) {
							if (sampleData[ttf.field_label] !== sampleData[v.field_label]) {
								err.push(`${ttf.field_label} is not equal to ${v.field_label}`)
							}
						}
					}
				}
			}
			if (ttf.required && prereqSatisfied(ttf) && !thisTabFieldsArr.includes(ttf.field_label)) {
				err.push(`${ttf.field_label} field is required.`)
			}
		})
		setErrors([...err])
		if (err.length > 0) {
			return
		}
		setStep(t.id + 1)
	}

	const prereqSatisfied = (f) => {
		let flag = true
		if (f.preRequisites) {
			for (let i = 0; i < f.preRequisites.length; i++) {
				let p = f.preRequisites[i]
				if (Object.keys(sampleData).includes(p.field_label) && (sampleData[p.field_label] === p.value || sampleData[p.field_label].includes(p.value))) {
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
		<div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh'}}>
			{formTabs && formTabs.map(t => {
				return (
					<>
						{step === t.id && 
							<div style={{padding: '40px 70px', borderRadius: '5px', border: '1px solid grey', margin: '25px 0', width: '500px', minHeight: '600px'}}>
							{t.name}
							<div style={{fontStyle: 'italic', fontSize: 'small', padding: '10px 0 0 0'}}>Fields marked with asterisk(*) are compulsory.</div>
							<form>
								{tabFields.filter(temp => temp.tab === t.id).map(f => {
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
								{errors && errors.length > 0 &&
									<div style={{color: 'red'}}>
										<ul>
											{errors.map(e => {
												return (
													<li>{e}</li>
												)
											})}
										</ul>
									</div>}
								<div style={{display: 'flex', justifyContent: 'space-between', marginTop: '25px'}}>
									<CustomButton text={'Back'} onClick={() => {setErrors([]); setStep(t.id - 1)}} />
									<CustomButton text={t.id === formTabs.length ? 'Submit' : 'Next'} onClick={(e) => handleOnClick(e, t)} />
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
