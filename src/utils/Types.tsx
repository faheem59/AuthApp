export interface UserData {
    id?: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'admin' | 'user'; 
}

export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: 'admin' | 'user';
}

export interface LoginFormInput {
    emailOrPhone: string;
    password: string;
    role: string;
}

export interface UserDataUpdate {
    id?: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: 'admin' | 'user'; 
}

export interface Props {
    formType: 'login' | 'signup';
}
