export const tabs = {
    tabs: [{
        id: 1,
        name: 'Tab 1'
    }, {
        id: 2,
        name: 'Tab 2'
    }, {
        id: 3,
        name: 'Tab 3'
    }]
}

export const data = {
    fields: [{
        id: 1,
        tab: 1,
        field_label: 'first_name',
        description: '',
        showFieldName: true,
        showField: true,
        showDescription: false,
        input_type: 'text',
        required: true,
        regex_validation: '^[a-zA-Z]+$',    // this is to checked runtime or on submit
        service_validation: {   // service api endpoint to be called from backend on submit
            endpoint: '',
            success_response: '',
            error_response: ''
        }
    }, {
        id: 2,
        tab: 1,
        field_label: 'last_name',
        description: '',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'text',
        required: true,
        regex_validation: '^[a-zA-Z]+$'
    }, {
        id: 5,
        tab: 1,
        field_label: 'languages',
        description: '',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'checkbox',
        required: false,
        options: ['Hindi', 'English', 'Marathi', 'others']
    }, {
        id: 6,
        tab: 1,
        field_label: 'gender',
        description: '',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'radio',
        required: true,
        options: ['male', 'female', 'others']
    }, {
        id: 7,
        tab: 1,
        field_label: 'education',
        description: 'Select your education level',
        showField: true,
        showFieldName: false,
        showDescription: true,
        input_type: 'select',
        required: true,
        options: ['10th pass', '12th pass', 'Graduate', 'Post-graduate']
    }, {
        id: 8,
        tab: 1,
        field_label: 'citizenship',
        description: 'Select your education level',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'radio',
        required: true,
        options: ['Indian', 'Non-Indian']
    }, {
        id: 9,
        tab: 1,
        field_label: 'state',
        description: '',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'select',
        required: false,
        options: ['Gujarat', 'Maharashtra', 'Karnataka'],
        preRequisites: [{
            field_label: 'citizenship',
            value: 'Indian'
        }, {
            field_label: 'gender',
            value: 'male'
        }]
    }, {
        id: 10,
        tab: 3,
        field_label: 'country',
        description: '',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'select',
        required: false,
        options: ['USA', 'UK', 'Others'],
        preRequisites: [{
            field_label: 'citizenship',
            value: 'Non-Indian'
        }]
    }, {
        id: 3,
        tab: 2,
        field_label: 'password',
        input_type: 'password',
        showField: true,
        showFieldName: true,
        showDescription: false,
        required: true
    }, {
        id: 4,
        tab: 2,
        field_label: 'confirm_password',
        input_type: 'password',
        showField: true,
        showFieldName: true,
        showDescription: false,
        required: true
    }]
}