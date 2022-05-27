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
        // very inefficient and gross
        txt = txt.replace(new RegExp(k, 'g'), obj[k])
    }
}

const txt_replacements = (list) => {
    for (let [find, replace] of list) {
        // very inefficient
        if (typeof find === 'string') find = new RegExp(find, 'g')
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

    // chapter descriptions
    [/\n(Synopsis of the [A-Za-z]+ Tablet.*)\n([^]+?)(### .*)\n/g, (line, synopsis, contents, title) => {
        return '\n\n' + title.trim() + '\n\n#### ' + synopsis.trim() + ':\n' + contents.trim() + '\n---\n\n'
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
    'surrey': 'survey',
    'Endu': 'Eridu',
})

dash_replacements([
    'Enki-the',
    'therefore-as',
    'Earth-with',
    'Workers-Homo'
])

let quoted = {
    sections: [],
    inside: false,
}
let is_quote_section = generate_quote_section_fn([
    { after: /Synopsis of the ([A-Za-z ]+) Tablet/,
     before: '---',
       type: '- ' },
    { after: 'Nippur quotes Enki as saying:',
     before: 'The long text continues' },
    { after: 'Prophet Isaiah (seventh century B.C.):',
     before: 'In dealing with the past, Enki himself perceived the future' },
])

const paragraph_exception = generate_txt_condition_fn([
    /^Chapter five of Genesis/,
    /^There was a reddish brilliance/,
    /^And there lay upon the table only one stylus/,
    /^And the stylus you see/,
    /^And then the great god Enki/,
    /^At times there was joy or pride/,
    'Was anyone responsible, is there someone accountable?',
    'And I said, Here I am.',
])

const should_join = generate_txt_conditions_fn('prev,next', [
    {prev: /[,;\-]$/},
    {prev: 'let volcanoes again erupt!', next: 'he then commanded.'},
])

const shouldnt_join = generate_txt_conditions_fn('prev,next', [
    {prev: '---'},
])

// ------------------
//   implementation
// ------------------


function generate_quote_section_fn (quote_sections) {
    let fn = 'if (quoted.inside === false) {'
    for (let {after, type} of quote_sections) {
        if (after) {
            if (typeof after === 'string') {
                fn += '\tif (~txt.indexOf('+JSON.stringify(after)+'))\n'
            } else if (after instanceof RegExp) {
                fn += '\tif ('+after.toString()+'.test(txt))\n'
            } else {
                console.error('unknown quote before:', after)
            }
            fn += '\t\treturn quoted.inside = {startl: i'+(type != null ? ', type: '+JSON.stringify(type) : '')+'}\n'
        }
    }

    fn += '} else {\n'

    for (let {before} of quote_sections) {
        if (before) {
            if (typeof before === 'string') {
                fn += '\tif (~txt.indexOf('+JSON.stringify(before)+'))\n'
            } else if (before instanceof RegExp) {
                fn += '\tif ('+before.toString()+'.test(txt))\n'
            } else {
                console.error('unknown quote after:', before)
            }
        
            fn += '\t\treturn insert_line(quoted.inside.endl = i-1, ""), quoted.sections.push(quoted.inside), quoted.inside = false\n'
        }
    }

    fn += '}\n'
    fn += 'return false'
    // return new Function('i,txt', fn)
    return (new Function('quoted, insert_line', 'return (i,txt) => {' + fn + '}'))(quoted, insert_line)
}

function generate_txt_conditions_fn (args, conditions, if_true = 'true', if_false = 'false') {
    let fn = ''
    for (let conds of conditions) {
        let keys = Object.keys(conds)
        if (keys.length) {
            fn += '\tif ('
            let ops = []
            for (let k of keys) {
                let cond = conds[k]
                if (typeof cond === 'string') {
                    ops.push('~'+k+'.indexOf('+JSON.stringify(cond)+')')
                } else if (cond instanceof RegExp) {
                    ops.push(conds[k].toString()+'.test('+k+')')
                } else {
                    console.error('unknown condition '+k+':', cond)
                }
            }
            
            fn += ops.join(' && ') + ') return '+if_true+'\n'
        }
    }

    fn += 'return '+if_false
    return new Function(args, fn)
}

function generate_txt_condition_fn (conditions, if_true = 'true', if_false = 'false') {
    let fn = ''
    for (let rule of conditions) {
        if (typeof rule === 'string') {
            fn += 'if (txt.startsWith('+JSON.stringify(rule)+')) return '+if_true+'\n'
        } else if (rule instanceof RegExp) {
            fn += 'if ('+rule.toString()+'.test(txt)) return '+if_true+'\n'
        }
    }

    fn += 'return '+if_false
    return new Function('txt', fn)
}




function replace_line (prev, next) {
    let joined = prev + ' ' + next

    // if (~joined.indexOf('Synopsis of the Third'))
    //     console.log('hold it:', joined)
    // if (~next.indexOf('Chapter five of Genesis'))
    //     console.log('hold it:', joined)
    // if (~prev.indexOf('Now come,'))
    //     console.log('hold it:', joined)


    if (!quoted.inside && should_join(prev, next) && !shouldnt_join(prev, next)) {
        return joined
    }

    if (/^[A-Z]/.test(next)) {
        if (/("?[!:\?\.]"|[,;:!\?\.])$/.test(prev)) {
            return paragraph_exception(next) ?
                joined : [prev, '', next]
        } else if (!quoted.inside && /[a-z0-9\)"I]$/.test(prev)) {
            return joined
        }
    }

    if (!quoted.inside && /[a-z0-9\)"I]$/.test(prev) && /^[a-z\("I]/.test(next)) {
        return joined
    }
    
    return false
}

function do_quotes () {
    for (let quote of quoted.sections) {
        if (quote.startl > 0 && quote.endl > 0) {
            let type = quote.type || '    '
            if (type === '```') {
                insert_lines(quote.startl, type)
                insert_lines(quote.endl, type)
            } else if (/^([ >\-*]+)/.test(type)) {
                for (let i = quote.startl; i < quote.endl; i++) {
                    if (txt_lines[i] === '---') debugger
                    if (txt_lines[i]) txt_lines[i] = type + txt_lines[i]
                }
            } else {
                console.error('unknown quote type:', quote.type)
            }
        } else {
            console.error(`quote: "${quote.before}" ... "${quote.after}" was not found!`)
        }
    }
}

function insert_lines (i, lines, remove = 0) {
    txt_lines.splice(i, remove, ...lines)
    update_lines(i, lines.length - remove)
}

function insert_line (i, line, remove = 0) {
    txt_lines.splice(i, remove, line)
    update_lines(i, 1 - remove)
}

function remove_line (i) {
    txt_lines.splice(i, 1)
    update_lines(i, -1)
}


function update_lines (i, delta) {
    for (let quote of quoted.sections) {
        if (quote.startl > 0 && i <= quote.startl)
            quote.startl += delta   
        if (quote.endl > 0 && i <= quote.endl)
            quote.endl += delta
    }            
}

// ----------

let i = 0
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

    is_quote_section(i, prev)
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

