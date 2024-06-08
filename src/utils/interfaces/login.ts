import { MouseEventHandler } from "react";

/**
 * Represents the login component.
 */
export interface ILogin {
    /**
     * Function to save the OpenAPI key.
     * @param {string} key - The OpenAPI key to save.
     */
    saveOpenAPIKey: (key: string) => void;
    
    /**
     * Event handler for handling login.
     */
    handleLogin: MouseEventHandler<HTMLButtonElement> | undefined;
    
    /**
     * Indicates whether the component is in a loading state.
     */
    loading: boolean;
}
