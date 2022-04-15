
const fs = require('fs')
let txt = fs.readFileSync('./OAHSPE.md', 'utf-8')

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

txt = replacer(txt, 5)
txt = replacer(txt, 10)
txt = replacer(txt, 100)
txt = replacer(txt, 1000)
txt = txt.replace(/\n[0-9]+\//g, str => '\n'+str)
txt = txt.replace(/\n\n\n/g, '\n\n')

txt = txt.replace(/\n(end of (.*))\n([a-zA-Z’ ]+)\n([a-zA-Z’ .,]+)\n/ig, (str, ended, _ended, next_book, desc) => {
    console.log('next book & desc', next_book, desc)
    return '\n'+ended+'\n\n## '+next_book+'\n\n***'+desc+'***\n\n'
})
txt = txt.replace(/\n(end of (.*))\n([a-zA-Z’ ]+)\n/ig, (str, ended, _ended, next_book) => {
    console.log('next book:', next_book)
    return '\n'+ended+'\n\n## '+next_book+'\n'
})
txt = txt.replace(/\nend of (.*)\n/ig, (str, _ended, ) => '\n'+str)
txt = txt.replace(/\n\n\n/g, '\n\n')

console.log('done')

fs.writeFileSync('./OAHSPE-transformed.md', txt)

