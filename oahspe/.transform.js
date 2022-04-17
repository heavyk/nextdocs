const fs = require('fs')
const Path = require('path')

const OVERWRITE_INPUT = true

const input_file = 'OAHSPE.md'
const input_dir = __dirname

const output_file = 'OAHSPE-transformed.md'
const output_dir = __dirname

const input_path = Path.join(input_dir, input_file)
const output_path = OVERWRITE_INPUT ? input_path : Path.join(output_dir, output_file)

let txt = fs.readFileSync(input_path, 'utf-8')

const prefix = (prefix, str) => str.startsWith(prefix) ? str : prefix+str

function replacer (txt, i = 1) {
    let len = (i+'').length - 1
    let regexp = new RegExp("([![^] \\na-zA-Z0-9,\\-\\.!?;:\\)\\]–’])([1-9][0-9]{"+len+"})([ \\nA-Za-z\\(\\[\\)\\]\\.,;:—])", 'g')
    console.log('transforming footnotes '+i+'-'+(Math.pow(10, len+1)-1))
    len = 0
    txt = txt.replace(regexp, (str, before, match, after, _idx) => {
        let n = match * 1
        if (n == i && !(str[0] == '.' && str.substr(-1, 1) == '.')) {
            i++
            len++
            return before + '[^' + n + ']' + after
        }

        return str
    })

    console.log('found '+len)
    return txt
}

// transform footnotes
txt = replacer(txt, 5)
txt = replacer(txt, 10)
txt = replacer(txt, 100)
txt = replacer(txt, 1000)

// put a \n between each verse
txt = txt.replace(/\n[0-9]+\//g, str => '\n'+str)

// get rid of extra newlines
txt = txt.replace(/\n\n\n/g, '\n\n')

// "END OF ..." book endings followed with the title of the next book, then with a italics intro text (intro text can't have '#' in it.)
txt = txt.replace(/\n(end of (.*))[\n]+([#a-zA-Z0-9’‑., :;\-\^\[\]\(\)]+)[\n]+([a-zA-Z0-9’‑., :;\-\^\[\]\(\)]+)\n/ig, (str, ended, _ended, next_book, desc) => {
    console.log('next book & desc', next_book, desc)
    return '\n' + ended +
        '\n\n' + prefix('## ', next_book) +
        '\n\n***' + desc + '***\n\n'
})

// "END OF ..." book endings followed with the title of the next book, without intro text
txt = txt.replace(/\n(end of (.*))[\n]+([#a-zA-Z0-9’‑., :;\-\^\[\]\(\)]+)\n/ig, (str, ended, _ended, next_book) => {
    console.log('next book:', next_book)
    return '\n' + ended +
        '\n\n' + prefix('## ', next_book) +
        '\n'
})

// all other "END OF ..." text needs a newline (not sure if necessary)
txt = txt.replace(/\nend of (.*)\n/ig, (str, _ended, ) => '\n'+str)

// transform "CHAPTER ..." with a following italics intro
txt = txt.replace(/\n([# ]+chapter (.*))[\n]+([#a-zA-Z0-9’‑., :;\-\^\[\]\(\)]+)\n/ig, (str, chapter, _chapter, desc) => {
    console.log('chapter & desc', chapter, desc)
    return '\n' + prefix('### ', chapter) +
        '\n\n***'+desc+'***\n\n'
})

// probably unnecessary cleanup
txt = txt.replace(/## ##/g, '##')
txt = txt.replace(/### ###/g, '###')
txt = txt.replace(/\n\n\n/g, '\n\n')
txt = txt.replace(/\*\*\*###(.*)\*\*\*/g, (_, inner) => prefix('###', inner))

console.log('done')

fs.writeFileSync(output_path, txt)

