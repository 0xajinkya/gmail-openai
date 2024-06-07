import { X } from "@mui/icons-material"
import Lottie from "lottie-react"

export const ShowLottie = ({animationData, width, height}: {animationData: unknown, width: number, height: number}) => {
    return (
        <Lottie 
            animationData={animationData}
            loop={true}
            width={width}
            height={height}
        />
    )
}