
( e => {
const { [ 'zh-cn' ]: { dictionary, getPluralForm } } = {"zh-cn":{"dictionary":{"Insert math":"插入公式","Insert":"插入","Cancel":"取消"},getPluralForm(n){return 0;}}};
e[ 'zh-cn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh-cn' ].dictionary = Object.assign( e[ 'zh-cn' ].dictionary, dictionary );
e[ 'zh-cn' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
