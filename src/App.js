import './App.css';
import React, { useEffect, useState } from 'react';
import { InputFields } from './Components/InputFields';
import CustomButton from './Components/Elements/Button';
import axios from 'axios';

function App() {

	const [sampleData, setSampleData] = useState({});
	const [form, setForm] = useState({});
	const [formTabs, setFormTabs] = useState([]);
	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		async function getFormData() {
			try {
				let response = await axios.get("http://localhost:8080/formConfigurationService/getConfiguration")
				setForm(response.data)
				setFormTabs(response.data.tabs.sort((a, b) => a.order - b.order))
				// setTabFields(form.fields.sort((a, b) => a.order - b.order))
			} catch (error) {
				console.log(error.message)
			}
		}
		getFormData()
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

	const handleCheckboxOnChange = (e, f) => {
		setErrors([])
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

	const handleOnClick = (e, t, index) => {
		e.preventDefault()
		if (errors.length > 0) return
		let err = errors
		const thisTabFields = t.fields
		const thisTabFieldsArr = Object.keys(sampleData)
		thisTabFields.forEach(ttf => {
			// check other validations
			if (sampleData[ttf.field_label] && ttf.validation && ttf.validation.length > 0) {
				let nextLogical = 'and';
				let errStr = [];
				let conditionSatisfied = false;
				for (let j = 0; j < ttf.validation.length; j++) {
					let thisCondition = true;
					let v = ttf.validation[j]
					if (v.logic) {
						nextLogical = v.logic
					} else {
						nextLogical = 'and'
					}
					const val = !isNaN(v.value) ? parseFloat(v.value) : v.value
					let toCheckWithVal = val;
					if (v.field_label) {
						toCheckWithVal = sampleData[v.field_label]
					}
					const checkThisVal = !isNaN(sampleData[ttf.field_label]) ? parseFloat(sampleData[ttf.field_label]) : sampleData[ttf.field_label]
					if (v.key === 'value_check') {
						if (v.type === 'equal') {
							if (!(checkThisVal === toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'greater') {
							if (!(checkThisVal > toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'lesser') {
							if (!(checkThisVal < toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'greater_equal') {
							if (!(checkThisVal >= toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'lesser_equal') {
							if (!(checkThisVal <= toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						}
					} else if (v.key === 'regex_check') {
						// check regex validation
						let regexV = new RegExp(v.value)
						if(!regexV.test(sampleData[ttf.field_label])) {
							err.push(v.error_message)
							thisCondition = false
						}
					}
					if (nextLogical === 'or') {
						conditionSatisfied = conditionSatisfied || thisCondition
					} else if (nextLogical === 'and') {
						if (j === 0) {
							conditionSatisfied = thisCondition
						} else {
							conditionSatisfied = conditionSatisfied && thisCondition
						}
					}
					if (errStr.length > 0) {
						let temp = errStr.join(` ${nextLogical.toLocaleUpperCase()} `)
						errStr = []
						errStr.push(temp)
					}
				}
				if (!conditionSatisfied) err.push(errStr[0])
			}
			if (ttf.required && prereqSatisfied(ttf) && !thisTabFieldsArr.includes(ttf.field_label)) {
				err.push(`'${ttf.display_name}' field is required.`)
			}
		})
		setErrors([...err])
		if (err.length > 0) {
			return
		}
		if (index + 1 === formTabs.length) {
			alert('Data saved successfully.')
			window.location.reload()
		} else {
			setStep(index + 2)
		}
	}

	const prereqSatisfied = (f) => {
		let flag = true
		let conditionSatisfied = false
		if (f.preRequisites) {
			let nextLogical = 'and';
			for (let i = 0; i < f.preRequisites.length; i++) {
				let p = f.preRequisites[i]
				let thisCondition = true
				if (p.logic) {
					nextLogical = p.logic
				} else {
					nextLogical = 'and'
				}
				if (Object.keys(sampleData).includes(p.field_label) && (sampleData[p.field_label] === p.value || (typeof sampleData[p.field_label] == 'object' && sampleData[p.field_label].includes(p.value)))) {
					thisCondition = true
				} else {
					thisCondition = false
				}
				if (nextLogical === 'or') {
					conditionSatisfied = conditionSatisfied || thisCondition
				} else if (nextLogical === 'and') {
					if (i === 0) {
						conditionSatisfied = thisCondition
					} else {
						conditionSatisfied = conditionSatisfied && thisCondition
					}
				}
			}
		} else {
			conditionSatisfied = true
		}
		return flag && conditionSatisfied
	}

	return (
		<div>
			<div style={{textAlign: 'center', backgroundColor: '#EBEDF4', padding: '1%'}}>
				<div style={{fontSize: 'large', fontWeight: 'bold'}}>{form.bank_name?.toLocaleUpperCase()} - {form.form_name?.toLocaleUpperCase()}</div>
				<div style={{fontStyle: 'italic'}}>{form.form_description}</div>
			</div>
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '75vh'}}>
				{formTabs && formTabs.map((t, i) => {
					return (
						<>
							{step === i+1 && 
								<div style={{padding: '40px', borderRadius: '5px', border: '1px solid grey', margin: '25px 0', width: '600px'}}>
								<div style={{backgroundColor: 'greenyellow', padding: '1% 2%', borderRadius: '5px'}}>{i+1}. {t.tab_name}</div>
								<div style={{padding: '0 15px'}}>
									<div style={{fontStyle: 'italic', fontSize: 'small', padding: '5px 0'}}>Mandatory fields are marked with asterisk(*).</div>
									<form>
										{t.fields.map(f => {
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
										<div style={{marginTop: '25px'}}>
											{i > 0 &&
											<CustomButton text={'Back'} onClick={() => {setErrors([]); setStep(i)}} />}
											<div style={{float: 'right'}}>
											<CustomButton text={i+1 === formTabs.length ? 'Submit' : 'Next'} onClick={(e) => handleOnClick(e, t, i)} />
											</div>
										</div>
									</form>
								</div>
							</div>}
						</>
					)
				})}
			</div>
		</div>
	);
}

export default App;
