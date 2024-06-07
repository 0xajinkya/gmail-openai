import { GlobalContext, HomeProvider } from "@/context"
import { ReactNode, useContext } from "react"

export const HomeLayout = ({children}: {children: ReactNode}) => {

    // const {
    //     logOut
    // } = useContext(GlobalContext);

    return (
        <HomeProvider>
            {children}
        </HomeProvider>
    )
}