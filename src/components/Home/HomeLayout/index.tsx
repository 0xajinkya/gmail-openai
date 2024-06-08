import { GlobalContext, HomeProvider } from "@/context";
import { ReactNode, useContext } from "react";

/**
 * Layout component for the home page.
 * It provides the home context provider to its children components.
 * @param children - The child components to be rendered within the home layout.
 */
export const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <HomeProvider>
            {children}
        </HomeProvider>
    );
};
