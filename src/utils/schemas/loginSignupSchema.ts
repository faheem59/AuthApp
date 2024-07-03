import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    emailOrPhone: yup.string().required('Email or Phone is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required'),
});

export const SignUpschema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().oneOf(['admin', 'user'], 'Invalid role').required('Role is required'),
});