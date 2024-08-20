import { expect } from 'chai';
import { Mathlive as MathliveDll } from '../src/index.js';
import Mathlive from '../src/mathlive.js';

describe( 'CKEditor5 Mathlive DLL', () => {
	it( 'exports Mathlive', () => {
		expect( MathliveDll ).to.equal( Mathlive );
	} );
} );
