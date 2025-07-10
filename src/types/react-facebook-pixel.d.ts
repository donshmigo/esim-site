declare module 'react-facebook-pixel' {
  interface Options {
    autoConfig?: boolean;
    debug?: boolean;
  }

  interface ReactFacebookPixel {
    init: (pixelId: string, advancedMatching?: object, options?: Options) => void;
    pageView: () => void;
    track: (event: string, data?: object) => void;
    trackCustom: (event: string, data?: object) => void;
    trackSingle: (pixelId: string, event: string, data?: object) => void;
    trackSingleCustom: (pixelId: string, event: string, data?: object) => void;
  }

  const ReactPixel: ReactFacebookPixel;
  export default ReactPixel;
} 