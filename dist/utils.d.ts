import type { Editor } from 'ckeditor5';
import type { Element as CKElement, DocumentSelection } from 'ckeditor5';
export declare function inesertEquationModal(editor: Editor, equation: string): void;
export declare function getSelectedMathModelWidget(selection: DocumentSelection): null | CKElement;
