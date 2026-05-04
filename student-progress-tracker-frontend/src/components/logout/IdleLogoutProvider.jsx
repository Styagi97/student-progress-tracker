import { useIdleLogout } from "./useIdleLogout";

export default function IdleLogoutProvider({children}){
    useIdleLogout();
    return children;
}