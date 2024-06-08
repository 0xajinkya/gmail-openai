import Image from "next/image";

/**
 * ImgIcon component for displaying an image icon.
 * @param name - The name of the icon.
 * @param width - The width of the icon.
 * @param height - The height of the icon.
 * @param path - The path to the image icon.
 */
export const ImgIcon = ({
    name,
    width,
    height,
    path,
}: {
    name: string;
    width: number;
    height: number;
    path: string;
}) => {
    return <Image alt={name} width={width} height={height} src={path} />;
};
