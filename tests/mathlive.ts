import { expect } from 'chai';
import { Essentials } from 'ckeditor5';
import { Paragraph } from 'ckeditor5';
import { Heading } from 'ckeditor5';
import { ClassicEditor } from 'ckeditor5';
import Mathlive from '../src/mathlive.js';

describe( 'Mathlive', () => {
	it( 'should be named', () => {
		expect( Mathlive.pluginName ).to.equal( 'Mathlive' );
	} );

	describe( 'init()', () => {
		let domElement: HTMLElement, editor: ClassicEditor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Mathlive
				],
				toolbar: [
					'mathliveButton'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load Mathlive', () => {
			const myPlugin = editor.plugins.get( 'Mathlive' );

			expect( myPlugin ).to.be.an.instanceof( Mathlive );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'mathliveButton' ) ).to.equal( true );
		} );

		it( 'should add a text into the editor after clicking the icon', () => {
			const icon = editor.ui.componentFactory.create( 'mathliveButton' );

			expect( editor.getData() ).to.equal( '' );

			icon.fire( 'execute' );

			expect( editor.getData() ).to.equal( '<p>Hello CKEditor 5!</p>' );
		} );
	} );
} );
