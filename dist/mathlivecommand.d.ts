import { Command, type Editor } from 'ckeditor5';
export default class MathliveCommand extends Command {
    value: string | undefined;
    execute(equation: string): void;
    refresh(): void;
}
/**
 * MathlivePanelCommand used to communicate and interact with the panel ui.
 */
export declare class MathlivePanelCommand extends Command {
    value: string | undefined;
    isOpen: boolean;
    isMounted: boolean;
    destroy(): void;
    constructor(editor: Editor);
    execute(mathPanelRoot: HTMLElement): void;
}
