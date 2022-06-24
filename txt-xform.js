import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { extname, basename, join } from 'path'
import { tmpdir } from 'os'
import { cwd } from 'process'

let i = 0
let txt_lines
let txt
let quoted = {
    sections: [],
    inside: false,
}

export default function transform (input_file, options = {}) {
    let ext = extname(input_file)
    let input_dir = options.input_dir || cwd()
    let output_file = options.output_file ||
        basename(input_file, ext) + '-transformed' + ext
    let output_dir = options.output_dir || tmpdir()

    const INPUT_TRANSFORMED = options.INPUT_TRANSFORMED || false
    const OVERWRITE_INPUT = options.OVERWRITE_INPUT || true
    const TRANSFORM_QUOTES = options.TRANSFORM_QUOTES || true
    
    const input_path = join(input_dir, input_file)
    const output_path = OVERWRITE_INPUT ? input_path : join(output_dir, output_file)

    const is_quote_section = generate_quote_section_fn(options.quote_sections)
    const paragraph_exception = generate_txt_condition_fn(options.paragraph_exceptions)
    const should_join = generate_txt_conditions_fn('prev,next', options.should_join)
    const shouldnt_join = generate_txt_conditions_fn('prev,next', options.shouldnt_join)

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
    
        if ((!quoted.inside || (TRANSFORM_QUOTES && /^([ >]+)/.test(quoted.inside)))
          && /^[A-Z]/.test(next)) {
            if (/("?[!:\?\.]"|[,;:!\?\.])$/.test(prev)) {
                return paragraph_exception(next) ?
                    joined : [prev, '', next]
            } else if (!quoted.inside && /[a-z0-9\)"I]$/.test(prev) && !shouldnt_join(prev, next)) {
                return joined
            }
        }
    
        if (!quoted.inside && /[a-z0-9\)"I]$/.test(prev) && /^[a-z\("I]/.test(next)) {
            return joined
        }
        
        return false
    }

    try { mkdirSync(output_dir) } catch (e) {}
    txt = readFileSync(INPUT_TRANSFORMED ? output_path : input_path, 'utf-8')

    // this is super gross and inefficient
    txt = word_replacements(txt, options.word_replacements)
    txt = txt_replacements(txt, options.txt_replacements)
    txt = dash_replacements(txt, options.dash_replacements, options.dash_replacement)

    
    i = 0
    txt_lines = txt.split('\n')
    while (i < txt_lines.length-1) {
        let prev = txt_lines[i].trim()
        let next = txt_lines[i+1].trim()

        is_quote_section(i, prev)

        let replacement = replace_line(prev, next)
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
    }

    do_quotes()

    txt = txt_lines.join('\n')

    // this shouldn't be necessary
    txt = txt.replace(/\n\n\n/g, '\n\n')

    console.log('done', output_path)

    writeFileSync(output_path, txt)
}

export { transform }
export const prefix = (prefix, str) => str.startsWith(prefix) ? str : prefix+str
export const is_lower = (chr) => /[a-z]/.test(chr)
export const is_upper = (chr) => /[A-Z]/.test(chr)
export const is_numeric = (chr) => /[0-9,\.]/.test(chr)

export function word_replacements (txt, obj) {
    for (let k in obj) {
        // very inefficient and gross
        txt = txt.replace(new RegExp(k, 'g'), obj[k])
    }

    return txt
}

export function txt_replacements (txt, list) {
    for (let [find, replace] of list) {
        // very inefficient
        if (typeof find === 'string') find = new RegExp(find, 'g')
        txt = txt.replace(find, replace)
    }

    return txt
}

export function dash_replacements (txt, list, replacement = '--') {
    let obj = {}
    for (let word of list) {
        obj[word] = word.replace(/-/g, replacement)
    }

    return word_replacements(txt, obj)
}


function generate_quote_section_fn (quote_sections) {
    let fn = 'if (quoted.inside === false) {\n'
    for (let {after, type} of quote_sections) {
        if (after) {
            if (typeof after === 'string') {
                fn += '\tif (~txt.indexOf('+JSON.stringify(after)+'))\n'
            } else if (after instanceof RegExp) {
                fn += '\tif ('+after.toString()+'.test(txt))\n'
            } else {
                console.error('unknown quote before:', after)
            }
            fn += '\t\treturn quoted.inside = {startl: i+2'+(type != null ? ', type: '+JSON.stringify(type) : '')+'}\n'
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
        
            fn += '\t\treturn insert_line(quoted.inside.endl = i, ""), quoted.sections.push(quoted.inside), quoted.inside = false\n'
        }
    }

    fn += '}\n'
    fn += 'return false'
    return (new Function('quoted, insert_line', 'return (i,txt) => {\n' + fn + '\n}'))(quoted, insert_line)
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



function do_quotes () {
    for (let quote of quoted.sections) {
        if (quote.startl > 0 && quote.endl > 0) {
            let type = quote.type || '    '
            if (type === '```') {
                insert_lines(quote.startl, type)
                insert_lines(quote.endl, type)
            } else if (/^([ >\-*]+)/.test(type)) {
                for (let i = quote.startl; i < quote.endl; i++) {
                    if (txt_lines[i]) txt_lines[i] = prefix(type, txt_lines[i])
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


