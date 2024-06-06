import Image from "next/image";

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
