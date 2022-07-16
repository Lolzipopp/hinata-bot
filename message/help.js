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
	return `*── 「 ${setting.botName} 」 ──*
	
  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

 Library : *Baileys-MD*.
 Prefix : ( ${prefix} )
 Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
 Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

 Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
 Limit Harian : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
 Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
 Balance : $${toCommas(getBalance(sender, balance))}

 *MAIN MENU*
 > ${prefix}menu
 > ${prefix}owner
 > ${prefix}donasi
 > ${prefix}speed
 > ${prefix}runtime
 > ${prefix}cekprem
 > ${prefix}listprem
 > ${prefix}jo
 > ${prefix}simi
 > ${prefix}groupriku
 > ${prefix}delete

 *CONVERTER/TOOLS*
 > ${prefix}sticker
 > ${prefix}toimg
 > ${prefix}tovid

 *DOWNLOADER*
 > ${prefix}play
 > ${prefix}tiktok
 > ${prefix}ytmp4
 > ${prefix}ytmp3
 > ${prefix}getvideo
 > ${prefix}getmusic
 > ${prefix}instagram
 > ${prefix}facebook
  
 *PREMIUM USER*
 > ${prefix}daftarprem
 > ${prefix}masuk 
 > ${prefix}leave
 > ${prefix}cersex
 > ${prefix}asupan
 > ${prefix}xnxx
 > ${prefix}hentai
 > ${prefix}ahegao
 > ${prefix}masturbation
 > ${prefix}blowjob
 > ${prefix}pussy
 > ${prefix}ass
 > ${prefix}bdsm
 
 *RANDOM MENU*
 > ${prefix}quote
 > ${prefix}cecan
 > ${prefix}cogan
 > ${prefix}loli
 > ${prefix}naruto
 > ${prefix}husbu
 > ${prefix}waifu
 > ${prefix}yaoi
 > ${prefix}faktaunik
 > ${prefix}pantun
 > ${prefix}katagalau
 > ${prefix}gombal
 > ${prefix}quotes
 > ${prefix}meme
 > ${prefix}darkjokes
  
 *SEARCH MENU*
 > ${prefix}lirik
 > ${prefix}grupwa
 > ${prefix}ytsearch
  
 *GAME MENU*
 > ${prefix}tictactoe
 > ${prefix}delttc
 > ${prefix}slot
 > ${prefix}suit
 > ${prefix}tebakgambar
 > ${prefix}tebakkimia
 > ${prefix}tebakkata
 > ${prefix}tekateki
 > ${prefix}kuis
 > ${prefix}apakah
 > ${prefix}kapankah
 > ${prefix}rate
 > ${prefix}gantengcek
 > ${prefix}cantikcek
 > ${prefix}sangecek
 > ${prefix}gaycek
 > ${prefix}lesbicek
 > ${prefix}gimana
 > ${prefix}bisakah
 > ${prefix}cekme
 > ${prefix}dadu
 > ${prefix}truth
 > ${prefix}dare
 > ${prefix}react
  
 *PAYMENT & BANK*
 > ${prefix}buylimit
 > ${prefix}buyglimit
 > ${prefix}transfer
 > ${prefix}limit
 > ${prefix}balance
  
 *GROUP MENU*
 > ${prefix}linkgrup
 > ${prefix}setppgrup
 > ${prefix}setnamegc
 > ${prefix}setdesc
 > ${prefix}group
 > ${prefix}revoke
 > ${prefix}promote
 > ${prefix}demote
 > ${prefix}kick 
 > ${prefix}add
 > ${prefix}hidetag
 > ${prefix}tagall
  
 *OWNER MENU*
 > evalcode
 x evalcode-2
 $ executor
 > ${prefix}sendvirtex
 > ${prefix}join
 > ${prefix}broadcast
 > ${prefix}setppbot
 > ${prefix}exif
 > ${prefix}leave
 > ${prefix}addprem
 > ${prefix}delprem
`
}
