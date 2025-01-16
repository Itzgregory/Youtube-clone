declare module 'next/font/google' {
    export interface FontLoaderConfiguration {
      subsets?: string[];
      weight?: string | number | Array<string | number>;
      style?: string | string[];
      display?: string;
    }
  
    export function Inter(config: FontLoaderConfiguration): {
      className: string;
      style: { fontFamily: string };
    };
  }