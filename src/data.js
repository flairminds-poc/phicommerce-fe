export const tabs = {
    tabs: [{
        id: 1,
        name: 'Tab 1',
        order: 1
    }, {
        id: 2,
        name: 'Tab 3',
        order: 3
    }, {
        id: 3,
        name: 'Tab 2',
        order: 2
    }]
}

export const data = {
    fields: [{
        id: 1,
        tab: 1,
        order: 1,
        field_label: 'first_name',
        description: '[Validation: Only alphabets]',
        showFieldName: true,
        showField: true,
        showDescription: true,
        input_type: 'text',
        required: true,
        regex_validation: '^[a-zA-Z]+$',    // this is to checked runtime or on submit
        service_validation: {   // service api endpoint to be called from backend on submit
            endpoint: '',
            success_response: '',
            error_response: ''
        },
        error_msgs: {
            validation: 'Validation failed for First name.',
            regex_validation: 'First name can only be alphabets',
            required: 'First name is required'
        }
    }, {
        id: 2,
        tab: 1,
        order: 2,
        field_label: 'last_name',
        description: '[Validation: Only alphabets]',
        showField: true,
        showFieldName: true,
        showDescription: true,
        input_type: 'text',
        required: true,
        regex_validation: '^[a-zA-Z]+$'
    }, {
        id: 5,
        tab: 1,
        order: 4,
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
        order: 3,
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
        order: 6,
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
        order: 7,
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
        order: 5,
        field_label: 'language',
        description: 'please specify',
        showField: true,
        showFieldName: false,
        showDescription: true,
        input_type: 'text',
        required: false,
        preRequisites: [{
            field_label: 'languages',
            value: 'others'
        }]
    }, {
        id: 10,
        tab: 3,
        order: 1,
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
        id: 11,
        tab: 3,
        order: 2,
        field_label: 'state',
        description: '',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'select',
        required: true,
        options: ['Gujarat', 'Maharashtra', 'Karnataka'],
        preRequisites: [{
            field_label: 'citizenship',
            value: 'Indian'
        }]
    }, {
        id: 3,
        tab: 2,
        order: 1,
        field_label: 'password',
        input_type: 'password',
        showField: true,
        showFieldName: true,
        showDescription: false,
        required: true
    }, {
        id: 4,
        tab: 2,
        order: 2,
        field_label: 'confirm_password',
        input_type: 'password',
        showField: true,
        showFieldName: true,
        showDescription: false,
        required: true,
        validation: [{
            type: 'equals',
            field_label: 'password'
        }]
    }]
}