import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

const horizontalScale = (size) => {
  const ratio = (size / guidelineBaseWidth) * 100;
  const responsiveWidth = getResponsiveValue(RESPONSIVE_TYPE.WIDTH, ratio);
  return responsiveWidth;
};

const verticalScale = (size) => {
  const ratio = (size / guidelineBaseHeight) * 100;
  const responsiveHeight = getResponsiveValue(RESPONSIVE_TYPE.HEIGHT, ratio);
  return responsiveHeight;
};

const moderateScale = (size) => {
  const ratio = (size / guidelineBaseWidth) * 100;
  const responsiveFont = getResponsiveValue(RESPONSIVE_TYPE.FONT, ratio);
  return responsiveFont;
};

const RESPONSIVE_TYPE = {
  WIDTH: "WIDTH",
  HEIGHT: "HEIGHT",
  FONT: "FONT",
};

const getResponsiveValue = (type = "WIDTH", ratio) => {
  let screenValue = 0;

  if (type === RESPONSIVE_TYPE.WIDTH) {
    screenValue = width;
  } else if (type === RESPONSIVE_TYPE.HEIGHT) {
    screenValue = height;
  } else if (type === RESPONSIVE_TYPE.FONT) {
    screenValue = width;
  }

  if (!ratio || typeof ratio !== "number") {
    return ratio;
  }

  return PixelRatio.roundToNearestPixel((screenValue * ratio) / 100);
};

export { horizontalScale, verticalScale, moderateScale, getResponsiveValue };
