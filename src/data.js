export const form = {
    form_type: 'Credit Card Form',
    form_desc: '',
    bank_name: 'HDFC',
    tabs: [{
        id: 1,
        name: 'Personal Details',
        order: 1,
        fields: [{
            id: 1,
            order: 1,
            field_label: 'first_name',
            display_name: 'First name',
            description: '[Validation: Only alphabets]',
            showFieldName: true,
            showField: true,
            showDescription: true,
            input_type: 'text',
            value_type: 'string',
            required: true,
            validation: [{
                key: 'regex_check',
                type: 'equal',
                value: '^[a-zA-Z]+$',
                error_message: 'First name can only have characters.'
            }]
        }, {
            id: 2,
            order: 2,
            field_label: 'last_name',
            display_name: 'Last name',
            description: '[Validation: Only alphabets]',
            showField: true,
            showFieldName: true,
            showDescription: true,
            input_type: 'text',
            value_type: 'string',
            required: true,
            validation: [{
                key: 'regex_check',
                type: 'equal',
                value: '^[a-zA-Z]+$',
                error_message: 'Last name can only have characters.'
            }]
        }, {
            id: 3,
            order: 2,
            field_label: 'age',
            display_name: 'Age',
            description: '[18 - 70 years]',
            showField: true,
            showFieldName: true,
            showDescription: true,
            input_type: 'text',
            value_type: 'number',
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
            order: 4,
            field_label: 'languages',
            display_name: 'Languages',
            description: '',
            showField: true,
            showFieldName: true,
            showDescription: false,
            input_type: 'checkbox',
            value_type: 'string',
            required: false,
            options: ['Hindi', 'English', 'Marathi', 'others'],
            validation: []
        }, {
            id: 6,
            order: 3,
            field_label: 'gender',
            display_name: 'Gender',
            description: '',
            showField: true,
            showFieldName: true,
            showDescription: false,
            input_type: 'radio',
            value_type: 'string',
            required: true,
            options: ['male', 'female', 'others'],
            validation: []
        }, {
            id: 7,
            order: 6,
            field_label: 'education',
            display_name: 'Education',
            description: 'Select your education level',
            showField: true,
            showFieldName: false,
            showDescription: true,
            input_type: 'select',
            value_type: 'string',
            required: true,
            options: ['10th pass', '12th pass', 'Graduate', 'Post-graduate'],
            validation: []
        }, {
            id: 8,
            order: 7,
            field_label: 'Board',
            display_name: 'Board',
            description: 'Select your education level',
            showField: true,
            showFieldName: true,
            showDescription: false,
            input_type: 'select',
            value_type: 'string',
            required: true,
            options: ['CBSE', 'ICSE', 'Maharashtra'],
            validation: [],
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
            order: 7,
            field_label: 'Specialization',
            display_name: 'Specialization',
            description: '',
            showField: true,
            showFieldName: true,
            showDescription: false,
            input_type: 'select',
            value_type: 'string',
            required: true,
            options: ['IT', 'Mechanical', 'Electronics'],
            validation: [],
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
            order: 9,
            field_label: 'Marital Status',
            display_name: 'Marital Status',
            description: '',
            showField: false,
            showFieldName: true,
            showDescription: false,
            input_type: 'radio',
            value_type: 'string',
            required: false,
            options: ['Married', 'Unmarried'],
            validation: [],
            preRequisites: [{
                field_label: 'education',
                value: '10th pass'
            }]
        }, {
            id: 10,
            order: 5,
            field_label: 'citizenship',
            display_name: 'Citizenship',
            description: 'Select your education level',
            showField: true,
            showFieldName: true,
            showDescription: false,
            input_type: 'radio',
            value_type: 'string',
            required: true,
            options: ['Indian', 'Non-Indian'],
            validation: []
        }, {
            id: 9,
            order: 5,
            field_label: 'language',
            display_name: 'Language',
            description: 'please specify',
            showField: true,
            showFieldName: false,
            showDescription: true,
            input_type: 'text',
            value_type: 'string',
            validation: [],
            required: true,
            preRequisites: [{
                field_label: 'languages',
                value: 'others'
            }]
        }]
    }, {
        id: 2,
        name: 'Create Password',
        order: 2,
        fields: [{
            id: 3,
            order: 1,
            field_label: 'password',
            display_name: 'Password',
            input_type: 'password',
            value_type: 'string',
	        validation: [],
            showField: true,
            showFieldName: true,
            showDescription: false,
            required: true
        }, {
            id: 4,
            order: 2,
            field_label: 'confirm_password',
            display_name: 'Confirm Password',
            input_type: 'password',
            value_type: 'string',
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
    }, {
        id: 3,
        name: 'Tab 3',
        order: 3,
        fields: [{
            id: 10,
            order: 1,
            field_label: 'country',
            display_name: 'Country',
            description: '',
            showField: true,
            showFieldName: true,
            showDescription: false,
            input_type: 'select',
            value_type: 'string',
            required: false,
            options: ['USA', 'UK', 'Others'],
            validation: [],
            preRequisites: [{
                field_label: 'citizenship',
                value: 'Non-Indian'
            }]
        }, {
            id: 11,
            order: 2,
            field_label: 'state',
            display_name: 'State',
            description: '',
            showField: true,
            showFieldName: true,
            showDescription: false,
            input_type: 'select',
            value_type: 'string',
            required: true,
            validation: [],
            options: ['Gujarat', 'Maharashtra', 'Karnataka'],
            preRequisites: [{
                field_label: 'citizenship',
                value: 'Indian'
            }]
        }]
    }]
}