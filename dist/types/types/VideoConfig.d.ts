export type VideoConfig = {
    scalingMode?: "fill" | "letterbox" | "crop" | "original";
    containerID?: string;
    width?: number | string;
    height?: number | string;
    aspectRatio?: string;
};
