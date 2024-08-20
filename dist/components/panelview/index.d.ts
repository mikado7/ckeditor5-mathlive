/**
 * Based on mathlive,see more: https://cortexjs.io/mathlive/
 */
import type { MathfieldElement as MathfieldElementType } from 'mathlive';
import '../../../theme/panelview.css';
interface PanelCommand {
    editor: {
        t: (text: string) => string;
    };
    value: string | undefined;
    off: (event: 'mounted' | 'refocus' | 'reopen') => void;
    on(event: 'mounted', callback: () => void): void;
    on(event: 'refocus' | 'reopen', callback: (_: unknown, equation: string) => void): void;
    fire(event: 'close'): void;
    fire(event: 'insert', equation: string): void;
}
export default class PanelView {
    constructor();
    equation: string;
    destroy: () => void;
    mount(hookContainer: HTMLElement): void;
    render(translate: PanelCommand['editor']['t']): HTMLElement;
    setMathfieldElementConfig(): void;
}
export declare class FormulaView {
    constructor(props?: FormulaView['props']);
    destroy: () => void;
    hookContainer: HTMLElement | null;
    props?: {
        onMathTexClick?: (equation: string, interceptor?: {
            before?: (mathField: MathfieldElementType) => Promise<void>;
            after?: (mathField: MathfieldElementType) => Promise<void>;
            customInsert?: (mathField: MathfieldElementType) => void;
        }) => void;
        onFormulaTabClick?: (key: string) => void;
    };
    activeTabKey: string;
    formulaTabs: {
        key: string;
        latexIcons: string[];
    }[];
    formulaMap: {
        [key: string]: Array<Array<string>>;
    };
    insertInterceptors: Array<{
        equations: Array<string>;
        before?: (mathField: MathfieldElementType) => Promise<void>;
        after?: (mathField: MathfieldElementType) => Promise<void>;
        customInsert?: (mathField: MathfieldElementType) => void;
    }>;
    mount(hookContainer: FormulaView['hookContainer']): void;
    remount(): void;
    render(): HTMLElement;
    latexIconMarkupMap: {
        [key: string]: string;
    } | undefined;
    getLatexIconMarkupMap(): FormulaView['latexIconMarkupMap'];
    latexIconConvertInterceptorMap: {
        [key: string]: {
            before?: (latex: string) => string;
            after?: (markup: string) => string;
        };
    };
    getConvertToIconMarkupLatex(): Array<{
        latex: string;
        iconLatex: string;
    }>;
}
export {};
