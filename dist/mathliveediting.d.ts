import { type Editor, Plugin } from 'ckeditor5';
import { Widget } from 'ckeditor5';
export default class MathliveEditing extends Plugin {
    static get requires(): readonly [typeof Widget];
    static get pluginName(): "MathliveEditing";
    constructor(editor: Editor);
    init(): void;
    private _defineSchema;
    private _defineConverters;
}
