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


txt = txt.replace(//g, '--')

// remove page numbers
txt = txt.replace(/\n([0-9 ]+)/g, (line) => {
    return ''
})
txt = txt.replace(/\n\n\n/g, '\n\n')


// chapter titles
txt = txt.replace(/\n([0-9A-Z, ]+)\n/g, (line, t) => {
    if (!t.length) return ''
    console.log('title:', t)
    return '\n\n### ' + t + '\n\n'
})

txt = txt.replace(/\n\n\n/g, '\n\n')
txt = txt.replace(/lgigi/g, 'Igigi')
txt = txt.replace(/ [l1] /g, ' I ')

let inside_quote = false
const quote_sections = [
    ['Nippur quotes Enki as saying:', 'The long text continues'],
    ['Prophet Isaiah (seventh century B.C.):', 'Isaiah 30:8']
]

const paragraph_exception = (l0, l1) => {
    if (l1.startsWith('Chapter five of Genesis'))
        return true
    if (l1 === 'Was anyone responsible, is there someone accountable?')
        return true

    return false
}

const replace_line = (prev, next) => {
    let joined = prev + ' ' + next

    if (~joined.indexOf('Now come,'))
        console.log('hold it:', joined)
    if (~next.indexOf('Now come,'))
        console.log('hold it:', joined)
    // if (~prev.indexOf('Nippur quotes Enki as saying:'))
    //     console.log('hold it:', joined)

    if (/[,\-]$/.test(prev) && !inside_quote) {
        return joined
    }

    if (/^[A-Z]/.test(next)) {
        // inside_quote === false && 
        if (/("?[!:\?\.]"|[,;:!\?\.])$/.test(prev)) {
            return paragraph_exception(prev, next) ?
                joined : [prev, '', next]
        } else if (/[a-z0-9\)"]$/.test(prev)) {
            return joined
        }
    }

    if (/[a-z0-9\)]$/.test(prev) && /^[a-z\(]/.test(next)) {
        return joined
    }
    
    return false
}

const is_quote_section = (prev, next) => {
    for (const q of quote_sections) {
        let [start, end, type] = q
        if (inside_quote === false) {
            if (prev.endsWith(start)) {
                return inside_quote = type || '    '
            }
        } else {
            if (prev.startsWith(end)) {
                return inside_quote = false
            }
        }
    }

    return inside_quote
}

let lines = txt.split('\n')
let i = 0
while (i < lines.length-1) {
    let prev = lines[i].trim()
    let start = lines[i+1].trim()

    let line = replace_line(prev, start)
    let q = is_quote_section(prev, start)
    // change this to be a starting line idx,
    // continue to transform until ending idx is found
    // then, go back to each line until starting idx and add the prefix or ``` chars
    if (Array.isArray(line)) {
        if (q !== false) {
            for (let i = 0; i < line.length; i++)
                line[i] = q + line[i]
        }

        lines.splice(i, 2, ...line)
        i += line.length-1
    } else {
        if (line === undefined) {
            lines.splice(i, 1)
        } else if (line === false) {
            // do nothing
        } else {
            if (q !== false)
                line = q + line
            lines.splice(i--, 2, line)
        }
        i++
    }
}



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

txt = lines.join('\n')

fs.writeFileSync(output_path, txt)

