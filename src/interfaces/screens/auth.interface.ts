export interface AuthContextData {
    login: (email: string, password: string) => void;
    loginWithoutAccount: () => void;
    loggout: () => void;
    isLogged: boolean;
    load: boolean;
}