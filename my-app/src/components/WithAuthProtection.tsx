import {ComponentType, PropsWithChildren} from "react";
import {useNavigate} from "react-router";
import {getAuth} from "firebase/auth";

export function withAuthProtection<T>(Component: ComponentType<T>) {
    return function Protected(props: PropsWithChildren<T>) {
        const navigate = useNavigate();
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            navigate("/login");
            return null;
        }
        return <Component {...props} />;
    }
}