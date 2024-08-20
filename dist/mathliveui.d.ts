import '../theme/mathlive.css';
import MathliveEditing from './mathliveediting.js';
import { Plugin } from 'ckeditor5';
import { MathlivePanelCommand } from './mathlivecommand.js';
declare const pluginScopeName = "_ckeditor5Mathlive";
interface pluginScopeType {
    [pluginScopeName]: {
        panelCommand: MathlivePanelCommand;
    };
}
export default class MathliveUI extends Plugin {
    static get requires(): readonly [typeof MathliveEditing];
    static get pluginName(): "MathliveUI";
    mathPanelRoot: (HTMLElement & pluginScopeType) | null;
    mathPanelRootDestroy: (() => void) | undefined;
    init(): void;
    _showUI(): void;
    _hideUI(): void;
    private _createToolbarMathButton;
    private _createMathPanelRoot;
    private _enableUserPopupsInteractions;
    private _listenEditorEvents;
}
export {};
