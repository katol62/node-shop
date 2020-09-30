interface IEnvironment {
    production: boolean;
    appBaseUrl?: string;
    apiUrl?: string;
}

declare module '*.json' {
    const value: any;
    export default value;
}
