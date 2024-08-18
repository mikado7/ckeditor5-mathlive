
( e => {
const { [ 'zh' ]: { dictionary, getPluralForm } } = {"zh":{"dictionary":{"Insert math":"插入公式","Insert":"插入","Cancel":"取消"},getPluralForm(n){return 0;}}};
e[ 'zh' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh' ].dictionary = Object.assign( e[ 'zh' ].dictionary, dictionary );
e[ 'zh' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
