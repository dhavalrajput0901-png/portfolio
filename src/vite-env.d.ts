/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: any, vars: any);
    chars: any[];
    words: any[];
    lines: any[];
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars: any): ScrollSmoother;
    static refresh(vars?: any): void;
    scrollTop(value?: number): number;
    paused(value?: boolean): boolean;
    scrollTo(target: any, smooth?: boolean, position?: string): void;
  }
}

