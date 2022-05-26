const fs = require('fs')
const Path = require('path')

const INPUT_TRANSFORMED = false
const OVERWRITE_INPUT = false

const input_file = 'lost-book-of-enki.md'
const input_dir = __dirname

const output_file = 'lost-book-of-enki-transformed.md'
const output_dir = Path.join(__dirname, '..', 'temp')
try { fs.mkdirSync(output_dir) } catch (e) {}

const input_path = Path.join(input_dir, input_file)
const output_path = OVERWRITE_INPUT ? input_path : Path.join(output_dir, output_file)

let txt = fs.readFileSync(INPUT_TRANSFORMED ? output_path : input_path, 'utf-8')

const prefix = (prefix, str) => str.startsWith(prefix) ? str : prefix+str
const is_lower = (chr) => /[a-z]/.test(chr)
const is_upper = (chr) => /[A-Z]/.test(chr)
const is_numeric = (chr) => /[0-9,\.]/.test(chr)

const word_replacements = (obj) => {
    for (let k in obj) {
        // very inefficient
        txt = txt.replace(k, obj[k])
    }
}

const txt_replacements = (list) => {
    for (let [find, replace] of list) {
        // very inefficient
        txt = txt.replace(find, replace)
    }
}

const dash_replacements = (list, replacement = '--') => {
    let obj = {}
    for (let word of list) {
        obj[word] = word.replace(/-/g, replacement)
    }

    return word_replacements(obj)
}

// ------------
//    config
// ------------


txt_replacements([
    // remove dashes
    [//g, '-'],

    // remove page numbers
    [/\n([0-9 ]+)/g, ''],

    // chapter titles
    [/\n([0-9A-Z, ]+)\n/g, (line, t) => {
        if (!t.length) return ''
        console.log('title:', t)
        return '\n\n### ' + t + '\n\n'
    }],

    // too much whitespace
    [/\n\n\n/g, '\n\n'],

    // scanning errors
    [/ [l1] /g, ' I '],
])


word_replacements({
    'Horno': 'Homo',
    'it,,': 'its',
    'lgigi': 'Igigi',

})

dash_replacements([
    'Enki-the',
    'therefore-as',
    'Earth-with',
    'Workers-Homo'
])

const quote_sections = [
    { before: 'Nippur quotes Enki as saying:',
       after: 'The long text continues' },
    { before: 'Prophet Isaiah (seventh century B.C.):',
       after: 'In dealing with the past, Enki himself perceived the future' },
]

const paragraph_exception = (cur, next) => {
    if (next.startsWith('Chapter five of Genesis'))
        return true
    if (next.startsWith('There was a reddish brilliance'))
        return true
    if (next.startsWith('And there lay upon the table only one stylus'))
        return true
    if (next.startsWith('And the stylus you see'))
        return true
    if (next.startsWith('And then the great god Enki'))
        return true
    if (next.startsWith('At times there was joy or pride'))
        return true
    if (next === 'Was anyone responsible, is there someone accountable?')
        return true
    if (next === 'And I said, Here I am.')
        return true

    return false
}

// ------------------
//   implementation
// ------------------

const replace_line = (prev, next) => {
    let joined = prev + ' ' + next

    if (~joined.indexOf('threw myself to the ground'))
        console.log('hold it:', joined)
    if (~next.indexOf('Now come,'))
        console.log('hold it:', joined)
    if (~prev.indexOf('Now come,'))
        console.log('hold it:', joined)

    // if (inside_quote !== false) {
    //     return false
    // }

    if (!inside_quote && /[,\-]$/.test(prev)) {
        return joined
    }

    if (/^[A-Z]/.test(next)) {
        // inside_quote === false && 
        if (/("?[!:\?\.]"|[,;:!\?\.])$/.test(prev)) {
            return paragraph_exception(prev, next) ?
                joined : [prev, '', next]
        } else if (!inside_quote && /[a-z0-9\)"]$/.test(prev)) {
            return joined
        }
    }

    if (!inside_quote && /[a-z0-9\)I]$/.test(prev) && /^[a-z\(I]/.test(next)) {
        return joined
    }
    
    return false
}

const is_quote_section = (i, prev, next) => {
    for (let q of quote_sections) {
        let {before, after, type} = q
        if (inside_quote === false) {
            if (prev.endsWith(before)) {
                q.startl = i
                return inside_quote = type || '    '
            }
        } else {
            if (prev.startsWith(after)) {
                insert_line(i, '')
                q.endl = i
                return inside_quote = false
            }
        }
    }

    return inside_quote
}

const do_quotes = () => {
    for (let quote of quote_sections) {
        if (quote.startl > 0 && quote.endl > 0) {
            let type = quote.type || '    '
            if (type === '```') {
                insert_lines(quote.startl, type)
                insert_lines(quote.endl, type)
            } else if (/^([ >]+)/.test(type)) {
                for (let i = quote.startl; i < quote.endl; i++)
                    txt_lines[i] = type + txt_lines[i]
            } else {
                console.error('unknown quote type:', quote.type)
            }
        } else {
            console.error(`quote: "${quote.before}" ... "${quote.after}" was not found!`)
        }
    }
}

const insert_lines = (i, lines, remove = 0) => {
    txt_lines.splice(i, remove, ...lines)
    update_lines(i, lines.length - remove)
}

const insert_line = (i, line, remove = 0) => {
    txt_lines.splice(i, remove, line)
    update_lines(i, 1 - remove)
}

const remove_line = (i) => {
    txt_lines.splice(i, 1)
    update_lines(i, -1)
}


const update_lines = (i, delta) => {
    for (let quote of quote_sections) {
        if (quote.startl > 0 && i <= quote.startl)
            quote.startl += delta   
        if (quote.endl > 0 && i <= quote.endl)
            quote.endl += delta
    }            
}

// ----------

let i = 0
let inside_quote = false
let txt_lines = txt.split('\n')
while (i < txt_lines.length-1) {
    let prev = txt_lines[i].trim()
    let next = txt_lines[i+1].trim()

    let replacement = replace_line(prev, next)
    // change this to be a starting line idx,
    // continue to transform until ending idx is found
    // then, go back to each line until starting idx and add the prefix or ``` chars
    if (Array.isArray(replacement)) {
        insert_lines(i, replacement, 2)
        i += replacement.length-1
    } else {
        if (replacement === undefined) {
            remove_line()
        } else if (replacement === false) {
            // do nothing
        } else {
            insert_line(i--, replacement, 2)
        }
        i++
    }

    is_quote_section(i-1, prev, next)
}

do_quotes()


// // scanning errors
// txt = txt.replace(/, ,/g, ',')
// txt = txt.replace(/\. [‘']/g, s => ', ' + s[2])
// txt = txt.replace(/[a-z]\. [a-z]/g, (str, idx) => {
//     // console.log('replacing', str, txt.substring(idx-20, idx+20))
//     return str[0] + ' ' + str[3]
// })

// txt = txt.replace(/[a-z] [\-\.][a-z]/g, (str, idx) => {
//     // console.log('replacing', str, txt.substring(idx-20, idx+20))
//     return str[0] + ' ' + str[3]
// })

// // probably unnecessary cleanup
// txt = txt.replace(/## ##/g, '##')
// txt = txt.replace(/### ###/g, '###')
// txt = txt.replace(/\n\n\n/g, '\n\n')
// txt = txt.replace(/\*\*\*###(.*)\*\*\*/g, (_, inner) => prefix('###', inner))

console.log('done', output_path)

txt = txt_lines.join('\n')

fs.writeFileSync(output_path, txt)

