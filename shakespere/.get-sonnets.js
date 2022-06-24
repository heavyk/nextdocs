
// next up, parse the commentary and turn it into markdown

// later, download the 1609 scans here
// https://www.bl.uk/collection-items/first-edition-of-shakespeares-sonnets-1609
// https://www.bl.uk/britishlibrary/~/media/bl/global/dl shakespeare/shakespeare collection items/first-edition-of-shakespeares-c_21_c_44_fb1r.jpg
// https://www.bl.uk/britishlibrary/~/media/bl/global/dl shakespeare/shakespeare collection items/first-edition-of-shakespeares-c_21_c_44_fb1v.jpg
// https://www.bl.uk/britishlibrary/~/media/bl/global/dl shakespeare/shakespeare collection items/first-edition-of-shakespeares-c_21_c_44_fb2r.jpg
// https://www.bl.uk/britishlibrary/~/media/bl/global/dl shakespeare/shakespeare collection items/first-edition-of-shakespeares-c_21_c_44_fb2v.jpg
// r = right side, v = left side (remember to ask for the spaces)

// import transform from '../txt-xform.js'

import { decode } from 'html-entities'
import pthrottle from 'p-throttle'
import { parse } from 'url'
import { join } from 'path'
import { get } from 'https'
import HttpsProxyAgent from 'https-proxy-agent'
import { readFile, writeFile, mkdir } from 'fs/promises'

const throttle_dl = pthrottle({ limit: 2, interval: 2000 })

const url = 'https://shakespeares-sonnets.com/sonnet/'
const proxy = process.env.http_proxy || 'http://192.0.0.4:8080'
const data_dir = join(process.cwd(), 'data')

try { await mkdir(data_dir) } catch (e) { if (e.code !== 'EEXIST') throw e }

for (let i = 1; i <= 156; i++) {
    await get_sonnet(i)
}


async function load (num) {
    let path = join(data_dir, 'sonnet-'+num+'.json')
    let data = await readFile(path, 'utf-8')
    data = JSON.parse(data)
    if (data.n) {
        data.num = data.n
        delete data.n
    }

    return data
}

async function save (sonnet) {
    const num = sonnet.num
    if (!num) return
    const path = join(data_dir, 'sonnet-'+num+'.json')
    const data = JSON.stringify(sonnet, null, '\t')
    console.log('saving sonnet', num)
    await writeFile(path, data)
}

function txt_between(txt, start_txt, end_txt) {
    let ps, pe
    return decode((
        ~(ps = txt.indexOf(start_txt)) &&
        ~(pe = txt.indexOf(end_txt, ps))
    ) ? txt.substring(ps + start_txt.length, pe) : '')
}

function clean_html_lines (html, start_txt, end_txt) {
    return txt_between(html.replace(/[\n\r]/g, ''), start_txt, end_txt)
        .replace(/<(\/?)em>/g, '')
        .replace(/<br \/>/g, '\n')
        .trim().split('\n')
        .map((t, i, arr) => i < arr.length-2 ? t.trim() : '  ' + t.trim())
}

function clean_sonnet (sonnet) {
    let modern = clean_html_lines(sonnet.html, "<p id='sonnettext'>", "</p>")
    let quarto = clean_html_lines(sonnet.html, "<p id='quartotext'>", "</p>")

    if (quarto[0][0] === 'W') {
        // console.log('transform to VV')
        quarto[0] = 'VV' + quarto[0].substring(1)
    }

    sonnet.modern = modern
    sonnet.quarto = quarto
    return sonnet 
}

const dl_sonnet = throttle_dl(async (num) => {
    let options = parse(url+num)
    options.agent = new HttpsProxyAgent(proxy)
    console.log('downloading sonnet', num)
    get(options, res => {
        let html = ''
        res.on('data', d => { html += d })
        res.on('end', async () => { await save({ num, html }) })
    })
})

async function get_sonnet (num) {
    try {
        let sonnet = await load(num)
        if (sonnet) {
            if (sonnet.html) {
                clean_sonnet(sonnet)
                delete sonnet.html
                await save(sonnet)
            }

            if (sonnet.modern && sonnet.quarto) {
                console.log('SONNET', sonnet.num, 'loaded')
                // console.log('---------')
                // console.log(sonnet.modern.join('\n'))
                // console.log(sonnet.quarto.join('\n'))
                return sonnet
            }
        }
    } catch (e) {
        if (e.code !== 'ENOENT') throw e
    }

    await dl_sonnet(num)
}
