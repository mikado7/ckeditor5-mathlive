/**
 * Based on mathlive,see more: https://cortexjs.io/mathlive/
 */

import type { MathfieldElement } from 'mathlive';
import './index.mathlive.css';
import { close } from './icons.base64';

declare function CommandEventOn( event: 'reopen', callback: ( _: unknown, equation: string ) => void ): void;

declare function CommandEventFire( event: 'insert', equation: string ): void;
declare function CommandEventFire( event: 'close' ): void;

interface PanelCommand {
	value: string | undefined;
	off: ( event: 'reopen' ) => void;
	on: typeof CommandEventOn;
	fire: typeof CommandEventFire;
}

const pluginScopeName = '_ckeditor5Mathlive';

export default class PanelView {
	public equation = '';
	public unmount: () => void = () => {};

	public mount( hookContainer: HTMLElement | null ): void {
		// Get ckeditor5Mathlive panelCommand.
		const panelCommand = ( hookContainer as ( ( HTMLElement | null ) & { _ckeditor5Mathlive: { panelCommand: PanelCommand } } ) )
			?.[ pluginScopeName ].panelCommand;

		this.equation = panelCommand.value || '';

		const container = this.render();

		// Register draggable panel.
		const handle = container.querySelector( '.ck-mathlive-panel-handle' ) as HTMLDivElement;
		registerDragElement( container, handle );

		// Add interaction to the math-field element.
		const mathField = container.querySelector( '.ck-mathlive-panel-input math-field' ) as MathfieldElement;

		// mathField.macros = {
		// 	...mathField.macros,
		// 	nicefrac: {
		// 		captureSelection: false,
		// 	},
		// }
		mathField?.addEventListener( 'input', e => {
			this.equation = ( e.target as { value?: string } )?.value || '';
		} );
		mathField.setValue( this.equation );
		setTimeout( () => {
			panelCommand.on( 'reopen', ( _, equation = '' ) => {
				this.equation = equation;
				mathField.setValue( equation );
				mathField.focus();
			} );
			mathField.focus();
		} );

		// Add interaction to confirm.
		const confirmButton = container.querySelector( '.ck-mathlive-panel-submit-confirm' ) as HTMLButtonElement;
		confirmButton.addEventListener( 'click', () => {
			panelCommand.fire( 'insert', this.equation );
			// mathField.executeCommand(["insert", '\\xLeftrightarrow[\\quad111\\quad]{#0}']);
		} );

		// Add interaction to cancel.
		const cancelButton = container.querySelector( '.ck-mathlive-panel-submit-cancel' ) as HTMLButtonElement;
		const closeButton = container.querySelector( '.ck-mathlive-panel-header-close' ) as HTMLDivElement;
		const onClose = () => {
			panelCommand.fire( 'close' );
		};
		cancelButton.addEventListener( 'click', onClose );
		closeButton.addEventListener( 'click', onClose );

		// Add FormulaView.
		const formulaContainer = container.querySelector( '.ck-mathlive-panel-formula' ) as HTMLDivElement;
		const formulaView = new FormulaView();
		formulaView.mount( formulaContainer, {
			onMathTexClick: ( equation, force ) => {
				if ( force ) {
					// panelCommand.fire( 'insert', equation );
				} else {
					mathField.executeCommand( [ 'insert', equation ] );
					// panelCommand.fire( 'insert', equation );
				}
			}
		} );

		hookContainer?.appendChild( container );

		this.unmount = () => {
			panelCommand.off( 'reopen' );
			hookContainer?.removeChild( container );
		};
	}

	public render(): HTMLElement {
		const container = document.createElement( 'div' );
		container.className = 'ck-mathlive-panel';
		const html = `
			<div class="ck-mathlive-panel-header">
				<div class="ck-mathlive-panel-header-label ck-mathlive-panel-handle">公式</div>
				<div class="ck-mathlive-panel-header-actions">
					<div class="ck-mathlive-panel-header-close">
						<img src="${ close }"/>
					</div>
				</div>
			</div>
			<div class="ck-mathlive-panel-content">
				<div class="ck-mathlive-panel-formula"></div>
				<div class="ck-mathlive-panel-input">
					<math-field></math-field>
				</div>
				<div class="ck-mathlive-panel-submit">
					<button class="ck-mathlive-panel-submit-confirm">插入</button>
					<button class="ck-mathlive-panel-submit-cancel">取消</button>
				</div>
			</div>
		`;
		container.innerHTML = html.trim();
		return container;
	}
}

// function getMacroDefinition(token, macros) {
//     if (!token.startsWith("\\"))
//       return null;
//     const command = token.slice(1);
//     return macros[command];
//   }

export class FormulaView {
	public hookContainer: HTMLElement | null = null;
	public listeners?: { onMathTexClick?: ( equation: string, force?: boolean ) => void } = undefined;
	public unmount: () => void = () => {};
	public activeTabKey = 'fraction';
	public formulaTabs = [ {
		key: 'fraction',
		icon: ''
	}, '' ];
	public formulaMap = {
		fraction: [ '\\frac{#0}{#0}', '\\tfrac{#0}{#0}', '{#0}/{#0}', '{}^{#0}\\!\\!/\\!{}_{#0}',
			'\\pdiff{y}{x}' ]
	};

	public mount( hookContainer: FormulaView['hookContainer'], listeners?: FormulaView['listeners'] ): void {
		this.hookContainer = hookContainer;
		this.listeners = listeners;

		const container = this.render();

		const texElements = container.querySelectorAll( '.ck-mathlive-formula-tex' );

		texElements.forEach( element => {
			element.addEventListener( 'click', e => {
				const equation = ( e.target as HTMLDivElement )?.getAttribute( 'equation' ) || '';
				listeners?.onMathTexClick?.( equation );
			} );
		} );

		hookContainer?.appendChild( container );

		this.unmount = () => {
			hookContainer?.removeChild( container );
		};
	}

	public remount(): void {
		this.unmount();

		this.mount( this.hookContainer );
	}

	public render(): HTMLElement {
		const container = document.createElement( 'div' );
		container.className = 'ck-mathlive-formula';
		const html = `
			<div class="ck-mathlive-formula-tabs">
				<div class="ck-mathlive-formula-tab active">
					111
				</div>
				<div class="ck-mathlive-formula-tab">
					2222
				</div>
			</div>
			<div class="ck-mathlive-formula-content">
				<div class="ck-mathlive-formula-list">
					${ this.formulaMap.fraction.map( equation => `<div class="ck-mathlive-formula-tex" equation="${ equation }">
						<math-field read-only>${ equation }</math-field>
					</div>` ).join( '' ) }
				</div>
			</div>
		`;
		container.innerHTML = html.trim();
		return container;
	}
}

function registerDragElement( container: HTMLElement | null, handle: HTMLElement | null ): void {
	if ( !container || !handle ) {
		return;
	}

	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;

	// Move the DIV from handle:
	handle.onmousedown = dragMouseDown;

	function dragMouseDown( e: MouseEvent ) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag( e: MouseEvent ) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		if ( container ) {
			// set the element's new position:
			container.style.top = ( container.offsetTop - pos2 ) + 'px';
			container.style.left = ( container.offsetLeft - pos1 ) + 'px';
		}
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
