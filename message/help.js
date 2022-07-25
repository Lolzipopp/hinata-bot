const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}
exports.allmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount) => {
	return `
✦══✿══╡RIKUBOTZ╞══✿══✦
${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}
✦Library : *Baileys-MD*.
✦Prefix : ( ${prefix} )
✦Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
✦Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

✦Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
✦Limit Harian : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
✦Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
✦Balance : $${toCommas(getBalance(sender, balance))}
  
 Ada Bug? Ketik ${prefix}report Bug
 ${readmore}
 ––––––『 *SIMPLE BOT RIKU* 』––––––
┌───( 🌏 ) Main Menu
│▹ ${prefix}menu
│▹ ${prefix}owner
│▹ ${prefix}donasi
│▹ ${prefix}speed
│▹ ${prefix}runtime
│▹ ${prefix}cekprem
│▹ ${prefix}listprem
│▹ ${prefix}delete
│────( ⏰ ) Riku Menu
│▹ ${prefix}groupriku
│▹ ${prefix}ttowner
│▹ ${prefix}igowner
│▹ ${prefix}midmanriku
│───( ⚠️ ) Premium User
│▹ ${prefix}daftarprem
│▹ ${prefix}kick <@tag>
│▹ ${prefix}add <@tag>  
│▹ ${prefix}join <Link>  
│▹ ${prefix}leave 
│▹ ${prefix}cersex
│▹ ${prefix}asupan
│▹ ${prefix}xnxx
│▹ ${prefix}hentai
│▹ ${prefix}ahegao
│▹ ${prefix}masturbation
│▹ ${prefix}bloewjob
│▹ ${prefix}pussy
│▹ ${prefix}ass
│▹ ${prefix}bdsm
│───( 👥 ) Group Menu*l
│▹ ${prefix}hidetag <Text>
│▹ ${prefix}tagall <Text>
│▹ ${prefix}promote
│▹ ${prefix}demote
│───( 🧑🏻‍💻 ) Owner Menu
│> evalcode
│x evalcode-2
│$ executor
│▹ ${prefix}sendvirtex
│▹ ${prefix}setppbot
│▹ ${prefix}exif
│▹ ${prefix}leave
│▹ ${prefix}addprem
│▹ ${prefix}delprem
│▹ ${prefix}broadcast
│▹ ${prefix}join
└───────「 RIKUBOTZ 」
𝗝𝗔𝗡𝗚𝗔𝗡 𝗦𝗣𝗔𝗠 𝗕𝗢𝗧!!
  `
}
