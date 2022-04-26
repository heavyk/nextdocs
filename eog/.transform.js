
const fs = require('fs')
const Path = require('path')

const INPUT_TRANSFORMED = false
const OVERWRITE_INPUT = false

const input_file = 'epic-of-gilgamesh.md'
const input_dir = __dirname

const output_file = '.epic-of-gilgamesh-transformed.md'
const output_dir = Path.join(__dirname, '..', 'temp')
try { fs.mkdirSync(output_dir) } catch (e) {}

const input_path = Path.join(input_dir, input_file)
const output_path = OVERWRITE_INPUT ? input_path : Path.join(output_dir, output_file)

let txt = fs.readFileSync(INPUT_TRANSFORMED ? output_path : input_path, 'utf-8')

txt = txt.replace(//g, '-')

// remove page numbers
txt = txt.replace(/\nThe Epic Of Gilgamesh\n[0-9]+\n/g, '\n')

// chapter titles
txt = txt.replace(/\n([0-9A-Z, ]+)\n([A-Z, ]+)\n/g, (line, t1, t2) => {
    return '\n\n### ' + t1 + ' - ' + t2 + '\n\n'
})

let len = 0
do {
    len = txt.length
    txt = txt.replace(/.*[a-zA-Z ;:,^\.!?'][\- ]\n[a-zA-Z‘"'].*\n/g, (line) => {
        return line.replace('\n', '')
    })

    if (len === txt.length) {
        txt = txt.replace(/[a-z,;:]\n[a-z]/g, s => s.replace('\n', ' '))
    }
} while (len !== txt.length)


txt = txt.replace(/\n\n\n/g, '\n\n')

// scanning errors
txt = txt.replace(/, ,/g, ',')
txt = txt.replace(/\. [‘']/g, s => ', ' + s[2])
txt = txt.replace(/[a-z]\. [a-z]/g, (str, idx) => {
    // console.log('replacing', str, txt.substring(idx-20, idx+20))
    return str[0] + ' ' + str[3]
})

txt = txt.replace(/[a-z] [\-\.][a-z]/g, (str, idx) => {
    // console.log('replacing', str, txt.substring(idx-20, idx+20))
    return str[0] + ' ' + str[3]
})


console.log('done')

fs.writeFileSync(output_path, txt)
