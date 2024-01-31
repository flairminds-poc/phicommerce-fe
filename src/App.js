import './App.css';
import React, { useEffect, useState } from 'react';
import { form } from './data';
import { InputFields } from './Components/InputFields';
import CustomButton from './Components/Elements/Button';

function App() {

	const [sampleData, setSampleData] = useState({});
	const [formTabs, setFormTabs] = useState([]);
	const [tabFields, setTabFields] = useState([]);
	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		setFormTabs(form.tabs.sort((a, b) => a.order - b.order))
		setTabFields(form.fields.sort((a, b) => a.order - b.order))
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

	const handleOnClick = (e, t) => {
		e.preventDefault()
		if (errors.length > 0) return
		let err = errors
		const thisTabFields = tabFields.filter(f => f.tab === t.id)
		const thisTabFieldsArr = Object.keys(sampleData)
		thisTabFields.forEach(ttf => {
			
			// check other validations
			if (sampleData[ttf.field_label] && ttf.validation) {
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
					if (v.key === 'value_check') {
						if (v.type === 'equal') {
							if (!(sampleData[ttf.field_label] === toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'greater') {
							if (!(sampleData[ttf.field_label] > toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'lesser') {
							if (!(sampleData[ttf.field_label] < toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'greater_equal') {
							if (!(sampleData[ttf.field_label] >= toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						} else if (v.type === 'lesser_equal') {
							if (!(sampleData[ttf.field_label] <= toCheckWithVal)) {
								errStr.push(v.error_message)
								thisCondition = false
							}
						}
					} else if (v.key === 'regex_check') {
						// check regex validation
						let regexV = new RegExp(v.value)
						if(!regexV.test(sampleData[ttf.field_label])) {
							err.push(v.error_message)
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
					if (j > 0) {
						let temp = errStr.join(` ${nextLogical.toLocaleUpperCase()} `)
						errStr = []
						errStr.push(temp)
					}
				}
				if (!conditionSatisfied) err.push(errStr[0])
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
				console.log("conditionSatisfied", f.field_label, p, nextLogical, thisCondition, conditionSatisfied)
			}
		} else {
			conditionSatisfied = true
		}
		return flag && conditionSatisfied
	}

	return (
		<div>
			<div style={{textAlign: 'center', padding: '5px', fontWeight: 'bold'}}>
				<div>{form.form_type}</div>
				<div>{form.bank_name}</div>
			</div>
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '75vh'}}>
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
		</div>
	);
}

export default App;
