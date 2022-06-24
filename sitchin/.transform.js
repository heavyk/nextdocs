
import transform from '../txt-xform.js'



transform('lost-book-of-enki.md', {
    INPUT_TRANSFORMED: false,
    OVERWRITE_INPUT: true,

    quote_sections: [
        { after: /Synopsis of the ([A-Za-z ]+) Tablet/,
         before: '---',
           type: '- ' },
        { after: 'Nippur quotes Enki as saying:',
         before: 'The long text continues' },
        { after: 'Prophet Isaiah (seventh century B.C.):',
         before: 'In dealing with the past, Enki himself perceived the future' },
    ],

    txt_replacements: [
        // remove dashes
        [//g, '-'],
    
        // convert CR -> LF
        [/\r/g, '\n'],
        [/\r\n/g, '\n'],
    
        // remove page numbers
        [/\n([0-9]+)[ ]*\n/g, '\n'],
    
        // chapter titles
        [/\n([0-9A-Z, ]+)\n/g, (line, t) => {
            if (!t.length) return ''
            console.log('title:', t)
            return '\n\n' + prefix('### ', t) + '\n\n'
        }],
    
        // subsection titles
        // [/Now this is the account of/g, (line) => {
        //     return prefix('\n#### ', line)
        // }],
    
        // chapter descriptions
        [/\n(Synopsis of the [A-Za-z]+ Tablet.*)\n([^]+?)(### .*)\n/g, (line, synopsis, contents, title) => {
            return '\n\n' + title.trim() + '\n\n' + prefix('#### ', synopsis.trim()) + ':\n' + contents.trim() + '\n---\n\n'
        }],
    
        // too much whitespace
        [/\n\n\n/g, '\n\n'],
    
        // scanning errors
        [/ [l1] /g, ' I '],
        [/, ,/g, ','],
        [/[\.,] [‘'`]/g, s => ', '],
        [/[a-z]\. [a-z]/g, (str, idx) => {
            // console.log('replacing', str, txt.substring(idx-20, idx+20))
            return str[0] + ' ' + str[3]
        }],
    
        // contractions from one line to another
        [/[a-z\.\-,;:] [\-\.][a-zA-Z]/g, (str, idx) => {
            console.log('replacing', str, txt.substring(idx-20, idx+20))
            return str[0] + ' ' + str[3]
        }],
        [/[a-z\.\-,;:][\-\.] [a-z]/g, (str, idx) => {
            console.log('replacing', str, txt.substring(idx-20, idx+20))
            return str[0] + ' ' + str[3]
        }],
    
        // incorrect until I have the glossary of all proper names accounted for
        // [/[a-z],\n[A-Z]/g, (str, idx) => {
        //     console.log('replacing', str, txt.substring(idx-20, idx+20))
        //     if (~str.indexOf('said, If she')) debugger
        //     return str.replace(',', '.')
        // }],
    
    ],
    
    word_replacements: {
        'Horno': 'Homo',
        'it,,': 'its',
        'lgigi': 'Igigi',
        'surrey': 'survey',
        'Endu': 'Eridu',
        'Inannn': 'Inanna',
        'Ninrnah': 'Ninmah',
        'Lahrnu': 'Lahmu',
        'Niburta': 'Ninurta',
        'llabrat': 'Ilabrat',
        'Iamb': 'lamb',
        'corning': 'coming',
        'Thev': 'They',
        'teas': 'was',
        // prolly wanna make a "match case" text replacement option
        'thev': 'they',
    
        // ancient words
        'agog': 'eager',
    },
    
    dash_replacements: [
        'Enki-the',
        'therefore-as',
        'Earth-with',
        'Workers-Homo'
    ],

    paragraph_exceptions: [
        /^Chapter five of Genesis/,
        /^There was a reddish brilliance/,
        /^And there lay upon the table only one stylus/,
        /^And the stylus you see/,
        /^And then the great god Enki/,
        /^At times there was joy or pride/,
        'Was anyone responsible, is there someone accountable?',
        'And I said, Here I am.',
    ],
    
    should_join: [
        {prev: /[,;\-]$/},
        {prev: 'let volcanoes again erupt!', next: 'he then commanded.'},
        {prev: 'Sati before me come!', next: 'Adapa said.'},
        {prev: 'and age we are!', next: 'to her he said.'},
        {prev: 'as your spouse?', next: 'they her asked.'},
    ],
    
    shouldnt_join: [
        {next: /^Now this is the account/},
        {prev: '---'},
    ],
})


