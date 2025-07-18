import ReactPixel from "react-facebook-pixel";

const FB_PIXEL_ID = "YOUR_PIXEL_ID"; // Replace with your actual pixel ID

export const initFacebookPixel = () => {
  ReactPixel.init(FB_PIXEL_ID);
  ReactPixel.pageView();
};

export const fbPageView = () => {
  ReactPixel.pageView();
};

export const fbTrack = (eventName, options = {}) => {
  ReactPixel.track(eventName, options);
};
