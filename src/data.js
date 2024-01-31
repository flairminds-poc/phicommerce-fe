export const form = {
    form_type: 'Credit Card Form',
    bank_name: 'HDFC',
    tabs: [{
        id: 1,
        name: 'Personal Details',
        order: 1
    }, {
        id: 2,
        name: 'Create Password',
        order: 2
    }, {
        id: 3,
        name: 'Tab 3',
        order: 3
    }],
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
        validation: [{
            key: 'regex_check',
            type: 'equal',
            value: '^[a-zA-Z]+$',
            error_message: 'First name can only have characters.'
        }]
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
        validation: [{
            key: 'regex_check',
            type: 'equal',
            value: '^[a-zA-Z]+$',
            error_message: 'Last name can only have characters.'
        }]
    }, {
        id: 3,
        tab: 1,
        order: 2,
        field_label: 'age',
        description: '[18 - 70 years]',
        showField: true,
        showFieldName: true,
        showDescription: true,
        input_type: 'text',
        required: true,
        validation: [{
            key: 'regex_check',
            type: 'equal',
            value: '^[0-9]+$',
            error_message: 'Age can only be an integer.'
        }, {
            logic: 'and',
            key: 'value_check',
            type: 'greater',
            value: '18',
            error_message: 'Age has to be greater than 18.'
        }, {
            logic: 'and',
            type: 'lesser',
            value: '70',
            error_message: 'Age has to be lesser than 70.'
        }]
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
        field_label: 'Board',
        description: 'Select your education level',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'select',
        required: true,
        options: ['CBSE', 'ICSE', 'Maharashtra'],
        preRequisites: [{
            field_label: 'education',
            value: '10th pass'
        }, {
            field_label: 'education',
            value: '12th pass',
            logic: 'or'
        }, {
            field_label: 'citizenship',
            value: 'Indian',
            logic: 'and'
        }]
    }, {
        id: 8,
        tab: 1,
        order: 7,
        field_label: 'Specialization',
        description: '',
        showField: true,
        showFieldName: true,
        showDescription: false,
        input_type: 'select',
        required: true,
        options: ['IT', 'Mechanical', 'Electronics'],
        preRequisites: [{
            field_label: 'education',
            value: 'Graduate'
        }, {
            field_label: 'education',
            value: 'Post-graduate',
            logic: 'or'
        }, {
            field_label: 'citizenship',
            value: 'Indian',
            logic: 'and'
        }]
    }, {
        id: 9,
        tab: 1,
        order: 9,
        field_label: 'Marital Status',
        description: '',
        showField: false,
        showFieldName: true,
        showDescription: false,
        input_type: 'radio',
        required: false,
        options: ['Married', 'Unmarried'],
        preRequisites: [{
            field_label: 'education',
            value: '10th pass'
        }]
    }, {
        id: 10,
        tab: 1,
        order: 5,
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
        required: true,
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
            key: 'value_check',
            type: 'equal',
            field_label: 'password',
            error_message: 'Password does not match.'
        }]
    }]
}