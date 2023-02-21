
// next up, parse the commentary and turn it into markdown

// for downloading the first folio:
// https://iiif.library.ubc.ca/viewer/download.php?handle1=cdm.shakespe.1-0421801.0032&handle2=cdm.shakespe.1-0421801.0033&region=full&rotation=0&d=d
// https://iiif.library.ubc.ca/viewer/download.php?handle1=cdm.shakespe.1-0421801.0034&handle2=cdm.shakespe.1-0421801.0035&region=full&rotation=0&d=d

// import transform from '../txt-xform.js'

import 'hard-rejection/register.js'
import { decode } from 'html-entities'
import pthrottle from 'p-throttle'
import { parse } from 'url'
import { hostname } from 'os'
import { join, basename, extname } from 'path'
import { get } from 'https'
import HttpsProxyAgent from 'https-proxy-agent'
import { readFile, writeFile, mkdir, stat } from 'fs/promises'
import { createWriteStream } from 'fs'

console.log('running on', hostname())
const IS_KENNY = hostname() === 'DESKTOP-M5TUMQB'

const throttle_dl = pthrottle({ limit: 1, interval: 2000 })

const url = 'https://shakespeares-sonnets.com/sonnet/'
const proxy = process.env.http_proxy || 'http://192.0.0.4:8080'
const data_dir = join(process.cwd(), 'data')

try { await mkdir(data_dir) } catch (e) { if (e.code !== 'EEXIST') throw e }

let md = ['# sonnets', '']

for (let i = 1; i <= 156; i++) {
    let sonnet = await get_sonnet(i)
    md.push(
        '### sonnet-'+i,
        '',
        // '...',
        // '',
        '#### sonnet-'+i+' - modern',
        '',
        ...sonnet.modern.map(t => '    ' + t),
        '',
        '#### sonnet-'+i+' - 1609 quarto',
        '',
        ...sonnet.quarto.map(t => '    ' + t),
        '',
    )
}

await writeFile('sonnets.md', md.join('\n'))

console.log('done')



async function load_sonnet (num) {
    let path = join(data_dir, 'sonnet-'+num+'.json')
    let data = await readFile(path, 'utf-8')
    data = JSON.parse(data)
    if (data.n) {
        data.num = data.n
        delete data.n
    }

    return data
}

async function save_sonnet (sonnet) {
    const num = sonnet.num
    if (!num) return
    const path = join(data_dir, 'sonnet-'+num+'.json')
    const data = JSON.stringify(sonnet, null, '\t')
    console.log('saving sonnet', num)
    await writeFile(path, data)
}

function txt_betwixt(txt, start_txt, end_txt) {
    let ps, pe
    return decode((
        ~(ps = txt.indexOf(start_txt)) &&
        ~(pe = txt.indexOf(end_txt, ps))
    ) ? txt.substring(ps + start_txt.length, pe) : '')
}

function clean_html_lines (html, start_txt, end_txt) {
    return txt_betwixt(html.replace(/[\n\r]/g, ''), start_txt, end_txt)
        .replace(/<(\/?)em>/g, '')
        .replace(/<br \/>/g, '\n')
        .trim().split('\n')
        .map((t, i, arr) => i < arr.length-2 ? t.trim() : '  ' + t.trim())
}

function clean_sonnet (sonnet) {
    let modern = clean_html_lines(sonnet.html, "<p id='sonnettext'>", "</p>")
    let quarto = clean_html_lines(sonnet.html, "<p id='quartotext'>", "</p>")

    if (quarto[0][0] === 'W') {
        // I'm actually not 100% sure all starting W's are VV.
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
        res.on('end', async () => { await save_sonnet({ num, html }) })
    })
})

async function get_sonnet (num) {
    try {
        let sonnet = await load_sonnet(num)
        if (sonnet) {
            if (sonnet.html) {
                clean_sonnet(sonnet)
                if (!IS_KENNY) delete sonnet.html
                await save_sonnet(sonnet)
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


// -------------- testing ----------



const img_url = 'https://www.bl.uk/britishlibrary/~/media/bl/global/dl%20shakespeare/shakespeare%20collection%20items/'
const dl_img2 = async (i, img) => {
    // first-edition-of-shakespeares-c_21_c_44_fb1r.jpg
    const outfile = (i+'').padStart(2, '0') + extname(img)
    const outpath = join(data_dir, outfile)
    const stats = await stat(outpath).catch(() =>{}) || {}
    if (stats.size > 1000000) {
        console.log('skipping', img)
        return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
        let options = parse(img_url+'/'+img)
        options.agent = new HttpsProxyAgent(proxy)
        console.log('downloading:', img)
        get(options, async (res) => {
            // console.log('get', res.headers['content-length'], stats.size)

            if (res.headers['content-length'] == stats.size) {
                console.log('already downloaded!', img)
                res.destroy()
                return resolve()
            }
            let file = createWriteStream(outpath)
            res.pipe(file)
            file.once('finish', () => {
                file.close()
                console.log('downloaded:', img)
            })
            // let html = ''
            // res.on('data', d => { html += d })
            // res.on('end', async () => { await save({ num, html }) })
        }).once('error', (err) => {
            console.log('error downloading', err)
            reject(err)
        })
    })
}
const dl_img = throttle_dl(dl_img2)

let json = await readFile('britishlibrary.json', 'utf8')

json = JSON.parse(json)

let imgs = json.sitecore.route.placeholders["container-ph"]['0'].fields.images
for (let i = 0; i < imgs.length; i++) {
    let img = basename(imgs[i].src)
    dl_img(i, img)
}

process.on('exit', (code) => {
    console.log('exiting', code)
})
