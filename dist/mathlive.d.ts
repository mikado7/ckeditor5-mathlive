import { Plugin } from 'ckeditor5';
import { Widget } from 'ckeditor5';
import MathliveUI from './mathliveui.js';
import MathliveEditing from './mathliveediting.js';
export default class Mathlive extends Plugin {
    static get requires(): readonly [typeof MathliveEditing, typeof MathliveUI, typeof Widget];
    static get pluginName(): "Mathlive";
}
