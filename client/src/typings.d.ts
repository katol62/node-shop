interface IVerification {
    email: string;
    password: string;
}

interface IEnvironment {
    production: boolean;
    appBaseUrl?: string;
    apiUrl?: string;
    verification?: IVerification;
}

declare module '*.json' {
    const value: any;
    export default value;
}
