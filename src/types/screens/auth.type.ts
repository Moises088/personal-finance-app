export type AuthContextData = {
    login: (email: string, password: string) => void;
    loginWithoutAccount: () => void;
    isLogged: boolean;
}