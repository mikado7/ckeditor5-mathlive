import { Plugin } from 'ckeditor5';
import { Widget } from 'ckeditor5';

import MathliveUI from './mathliveui.js';
import MathliveEditing from './mathliveediting.js';

export default class Mathlive extends Plugin {
	public static get requires() {
		return [ MathliveEditing, MathliveUI, Widget ] as const;
	}

	public static get pluginName() {
		return 'Mathlive' as const;
	}
}
