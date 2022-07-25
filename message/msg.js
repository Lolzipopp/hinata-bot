/**
  * Created by Riy
  * Base Ori : rtwone / Irfan
*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { darkjokes } = require("../fitur/darkjokes")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");

const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// DB Game
let tictactoe = [];
let tebakgambar = []
let kuiscuy = []
let tebaktebakan = []
let tekateki = []
let tebakkimia = []

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'))
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store, welcome) => {
	try {
		let { ownerNumber, botName, gamewaktu, limitCount } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber == sender ? true : ["6285791458996@s.whatsapp.net", "628990999699@s.whatsapp.net"].includes(sender) ? true : false
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
                const isAntiLink = isGroup ? antilink.includes(sender) : false

		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user
		const pp_bot = fs.readFileSync(setting.pathimg)

		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
        async function sendPlay(from, query) {
           var url = await yts(query)
           url = url.videos[0].url
           hxz.youtube(url).then(async(data) => {
             var button = [{ buttonId: `!ytmp3 ${url}`, buttonText: { displayText: `🎵 Audio (${data.size_mp3})` }, type: 1 }, { buttonId: `!ytmp4 ${url}`, buttonText: { displayText: `🎥 Video (${data.size})` }, type: 1 }]
             conn.sendMessage(from, { caption: `*Title :* ${data.title}\n*Quality :* ${data.quality}\n*Url :* https://youtu.be/${data.id}`, location: { jpegThumbnail: await getBuffer(data.thumb) }, buttons: button, footer: 'Pilih Salah Satu Button Dibawah⬇️', mentions: [sender] })
           }).catch((e) => {
             conn.sendMessage(from, { text: mess.error.api }, { quoted: msg })
               ownerNumber.map( i => conn.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: pp_bot }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		const buttonsDefault = [
		    { urlButton: { displayText: `𝘐𝘕𝘚𝘛𝘈𝘎𝘙𝘈𝘔`, url : `https://www.instagram.com/tokoriku_` } },
			{ urlButton: { displayText: `𝘖𝘞𝘕𝘌𝘙`, url : `wa.me/6287873985625` } },
			{ quickReplyButton: { displayText: `🧑 GroupRiku`, id: `${prefix}groupriku` } },
			{ quickReplyButton: { displayText: `💰 Donasi`, id: `${prefix}donate` } }
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		conn.sendReadReceipt(from, sender, [msg.key.id])
		conn.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		
		// Premium
		_prem.expiredCheck(conn, premium)

		// Tictactoe
		if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Game
		cekWaktuGame(conn, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var kode = randomNomor(1000000000, 9000000000)
		    var htgm = randomNomor(500, 550)
			addBalance(sender, htgm, balance)
		    var texttg = `*Selamat ${pushname} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\nKode Game : ${kode}\n\nIngin bermain lagi? Pencet Tombol Dibawah`
			var tebakgmbr = [
			{ quickReplyButton: { displayText: `Main Lagi`, id: `${prefix}tebakgambar` } },
		]
			 conn.sendMessage(from, { text: texttg, templateButtons: tebakgmbr, footer: 'TEBAK - GAMBAR', mentions: [sender]} )  
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}
		
		cekWaktuGame(conn, kuiscuy)
		if (isPlayGame(from, kuiscuy) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, kuiscuy)) {
		    var htgm = randomNomor(500, 550)
			addBalance(sender, htgm, balance)
			var kode = randomNomor(1000000000, 9000000000)
		    var texttg = `*Selamat ${pushname} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, kuiscuy)}\nHadiah : ${htgm} balance\nKode Game : ${kode}\n\nIngin bermain lagi? Pencet Tombol Dibawah`
			var kus = [
			{ quickReplyButton: { displayText: `Main Lagi`, id: `${prefix}tebakkata` } },
		]
			 conn.sendMessage(from, { text: texttg, templateButtons: kus, footer: 'TEBAK KATA', mentions: [sender]} )  
		    kuiscuy.splice(getGamePosi(from, kuiscuy), 1)
		  }
		}
		
		cekWaktuGame(conn, tekateki)
		if (isPlayGame(from, tekateki) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tekateki)) {
		    var kode = randomNomor(1000000000, 9000000000)
		    var htgm = randomNomor(500, 550)
			addBalance(sender, htgm, balance)
		    var texttg = `*Selamat ${pushname} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tekateki)}\nHadiah : ${htgm} balance\nKode Game : ${kode}\n\nIngin bermain lagi? Pencet Tombol Dibawah`
			var kus = [
			{ quickReplyButton: { displayText: `Main Lagi`, id: `${prefix}tekateki` } },
		]
			 conn.sendMessage(from, { text: texttg, templateButtons: kus, footer: 'KUIS V2', mentions: [sender]} )  
		    tekateki.splice(getGamePosi(from, tekateki), 1)
		  }
		}
		
		cekWaktuGame(conn, tebakkimia)
		if (isPlayGame(from, tebakkimia) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkimia)) {
		    var htgm = randomNomor(500, 550)
			addBalance(sender, htgm, balance)
		    var texttg = `*Selamat ${pushname} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkimia)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? Pencet Tombol Dibawah`
			var kus = [
			{ quickReplyButton: { displayText: `Main Lagi`, id: `${prefix}tebakkimia` } },
		]
			 conn.sendMessage(from, { text: texttg, templateButtons: kus, footer: 'TEBAK KIMIA', mentions: [sender]} )  
		    tebakkimia.splice(getGamePosi(from, tebakkimia), 1)
		  }
		}
		
		cekWaktuGame(conn, tebaktebakan)
		if (isPlayGame(from, tebaktebakan) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebaktebakan)) {
		    var htgm = randomNomor(500, 550)
			addBalance(sender, htgm, balance)
		    var texttg = `*Selamat ${pushname} Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebaktebakan)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? Pencet Tombol Dibawah`
			var kus = [
			{ quickReplyButton: { displayText: `Main Lagi`, id: `${prefix}kuis` } },
		]
			 conn.sendMessage(from, { text: texttg, templateButtons: kus, footer: 'KUIS By JOJO-BOT', mentions: [sender]} )  
		    tebaktebakan.splice(getGamePosi(from, tebaktebakan), 1)
		  }
		}

if (chats.startsWith(`bot`)){
 conn.sendMessage(from, { audio: fs.readFileSync('audio/jokeuwi.mp3'), mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith(`Bot`)){
 conn.sendMessage(from, { audio: fs.readFileSync('audio/jokeuwi.mp3'), mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}

if (chats.startsWith("@6287873985625")){
   conn.sendMessage(from, { audio: {url : `https://d.top4top.io/m_22231oj7h1.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("eh")){
   conn.sendMessage(from, { audio: {url : `https://b.top4top.io/m_2223iin241.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("Eh")){
   conn.sendMessage(from, { audio: {url : `https://b.top4top.io/m_2223iin241.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("Riku")){
   conn.sendMessage(from, { audio: {url : `https://d.top4top.io/m_22231oj7h1.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
if (chats.startsWith("woy")){
   conn.sendMessage(from, { audio: {url : `https://d.top4top.io/m_22231oj7h1.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
}
		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		if (isAntiLink) 
if (chats.includes('https://chat.whatsapp.com')) {
               if (!msg.key.fromMe) {
               reply('Antilink\nKamu akan di kick')
                number = sender
               await conn.groupParticipantsUpdate(from, [number], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
               }
	  }		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			// Main Menu
			case prefix+'menu':
			case prefix+'help':
			conn.sendMessage(from, { react: { text: `👋`, key: msg.key }})
			conn.sendMessage(from, { audio: {url : `https://d.top4top.io/m_22231oj7h1.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
			    var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
			    conn.sendMessage(from, { caption: teks, image: pp_bot, templateButtons: buttonsDefault, footer: `${setting.ownerName}`, mentions: [sender] })
				break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
		            break
		case prefix+'report':
  case prefix+'lapor':
    case prefix+'chatown':
    if (args.length < 2) return reply(`Silahkan Masukan Laporan nya, Contoh : ${command} Ada Bug Di fitur <fitur>`)
                reply(`Laporan Telah DibKirimkan Oleh ke Owner, Laporan main² atau palsu akan di banned!`)
conn.sendMessage(`6287873985625@s.whatsapp.net`, {text: `*[ PANGGILAN USER ]*\n\n*Dari :* @${sender}\n*Pesan :* ${q}`, mentions: [sender]})
break
			case prefix+'donate':
			case prefix+'donasi':
			    reply(`──「 MENU DONATE 」──\n\nHi ${pushname} 👋🏻\n\`\`\`DANA : ${setting.donasiDana}\`\`\`\n\`\`\`GOPAY : ${setting.donasiGopay}\`\`\`\nTerimakasih untuk kamu yang sudah donasi untuk perkembangan bot ini _^\n──「 THX FOR YOU ! 」──`)
			    break
case prefix+'delete':
  case prefix+'d':
    case prefix+'del':
  conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
  break	
  case prefix+'midman':
  case prefix+'midmanriku':
case prefix+'mm':
  case prefix+'mmriku':
  var teks = `_Mau MM sama riku?_
  
  CHAT RIKU👇👇
  wa.me/6287873985625
  
*Trusted 100%*
[ 💸 ] PRICE MM!! [ 💸 ]

( PSX / CS KE GAME LAIN ) /
 ( PSX / CS KE GAME PSX / CS ) /
 ( GAME SELAIN PSX / CS TETAPI FEE   
    DITENTUKAN ADMIN!! ) 

[ MONEY 💲 ]
0-50K         = 5K
50-100K    = 10K
100-150K  = 15K
150-200K  = 20K

[ PSX 🐱 ]
1B - 10B       = 1B 
10B - 30B     = 2B
30B - 50B     = 4B
50B - 70B     = 6B
70B - 90B     = 8B
90B - 110B   = 10B
110B - 130B = 12B
130B - 150B = 14B
150B+           = 15B

[ CS 💱]
1 - 100         = 10
100 - 300     = 20
300 - 500     = 40
500 - 700     = 60
700 - 900     = 80
900 - 1100   = 100
1100 - 1300 = 120
1300 - 1500 = 140
1500+          = 150
`
			    conn.sendMessage(from, { caption: teks, location: { jpegThumbnail: fs.readFileSync(setting.pathimg) }, templateButtons: button5, footer: 'RIKU-MD', mentions: [sender] })
			    break
			case prefix+'owner':
			case prefix+'riku':
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], 'Riku Store', msg)
			    }
			    conn.sendMessage(from, { audio: {url : `https://b.top4top.io/m_2223iin241.mp3`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
			    var owncuy = [
			{ quickReplyButton: { displayText: `♨️ Instagram`, id: `${prefix}igowner` } },
			{ quickReplyButton: { displayText: `🌐 TikTok`, id: `${prefix}ttowner` } },
		]
		conn.sendMessage(from, {text: `Ingin bertanya tanya tentang apa?`, templateButtons: owncuy, footer: `My Name : Riku Store`, mentions: [sender]} )
			    break
			case prefix+'igowner':
 reply(`INSTAGRAM OWNER : @tokoriku_\nLINK : https://instagram.com/tokoriku_`)
 break
 case prefix+'ttowner':
 reply(`TIKTOK OWNER : @Toko Riku\nLINK : https://vt.tiktok.com/ZSd1dp3jb`)
 break

case prefix+'sewa':
case prefix+'daftarpremium':
  case prefix+'daftarprem':
  var teks = `_Yakin kamu mau daftar ke premium?_

*Keuntungan :*
- Limit Unlimited
- Akses Fitur Premium
- Bot Join Grup WhatsApp Mu
- Tidak Ada Kata ~Limit Menurun~
- Transfer Limit Game

*LIST DAFTAR PREMIUM*
- 20B / 5k - Perbulan
- 35B / 8k - Dua Bulan
- 50B / 13k - PERMANENT `
			    conn.sendMessage(from, { caption: teks, location: { jpegThumbnail: fs.readFileSync(setting.pathimg) }, templateButtons: button5, footer: 'RIKU-MD', mentions: [sender] })
			    break
			case prefix+'groupriku':
  reply("Group All Game\nhttps://chat.whatsapp.com/Dy8hlfp2C3D3sGYXM67LUI\n\n\Group PSX\nhttps://chat.whatsapp.com/KeMULYfNy4L0DJ9IOgvqqp\n\n\Group CS\nhttps://chat.whatsapp.com/EcQpifklI5TJvUAKfuMdWL\n\n\Group WFS\nhttps://chat.whatsapp.com/CYeWz7KjIQnHv3aIqvSNas\n\n\Group BF\nhttps://chat.whatsapp.com/KxIsDw6WL3eKg2y5aI6N2E\n\n\Group MS2\nhttps://chat.whatsapp.com/E4i4CL2oyUq3oTwLzmwFj7\n\n\Group STK\nhttps://chat.whatsapp.com/DF7cdLPlduuK902CkpWb5M\n\n\Bot Clash\nhttps://chat.whatsapp.com/CDEaUgQ0y3Q1LFXkUS6AXL\n\n\Group King Legacy\nhttps://chat.whatsapp.com/IIwCQe3gMlf0lEkWbHDfqT\n\n\Group Sword Sim\nhttps://chat.whatsapp.com/EL2tLJ15iQhBEnmhsbaNUm")
  break
			case prefix+'cekprem':
            case prefix+'cekpremium':
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                if (isOwner) return reply(`Lu owner bego!`)
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix+'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    txt += `*ID :* @${i.id.split("@")[0]}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                  }
                }
                mentions(txt, men, true)
                break
	   
			case prefix+'kick':
			if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (mentioned.length !== 0) {
      number = mentioned[0]
      conn.groupParticipantsUpdate(from, [number], "remove")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      conn.groupParticipantsUpdate(from, [number], "remove")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Tag atau balas pesan member yang ingin dikeluarkan dari grup`)
    }
    break

case prefix+'add':
if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (args[1]) {
      number = mentioned[0]
      var cek = await conn.onWhatsApp(number)
      if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
      conn.groupParticipantsUpdate(from, [number], "add")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      var cek = await conn.onWhatsApp(number)
      if (cek.length == 0) return reply(`Member yang kamu balas pesannya sudah tidak terdaftar di WhatsApp`)
      conn.groupParticipantsUpdate(from, [number], "add")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan kedalam grup`)
    }
    break
    case prefix+'promote':
  case prefix+'admin':
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (mentioned.length !== 0) {
      number = mentioned[0]
      conn.groupParticipantsUpdate(from, [number], "promote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      conn.groupParticipantsUpdate(from, [number], "promote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Tag atau balas pesan member yang ingin dijadikan admin grup`)
    }
    break
case prefix+'demote':
  case prefix+'unadmin':
    if (!isGroup) return reply(mess.OnlyGrup)
    if (!isGroupAdmins) return reply(mess.GrupAdmin)
    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
    var number;
    if (mentioned.length !== 0) {
      number = mentioned[0]
      conn.groupParticipantsUpdate(from, [number], "demote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else if (isQuotedMsg) {
      number = quotedMsg.sender
      conn.groupParticipantsUpdate(from, [number], "demote")
      .then( res => reply(jsonformat(res)))
      .catch( err => reply(jsonformat(err)))
    } else {
      reply(`Tag atau balas pesan admin yang ingin diturunkan menjadi member`)
    }
    break
			
case prefix+'cersex':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
  var data = await fetchJson(`https://docs-jojo.herokuapp.com/api/cersex`)
  var caption = `*[ CERSEX ]*\n\n*Judul* : ${data.result.judul}\n*Cerita* : ${data.result.cersex}\n${readmore} *JOJOBOT*`
  conn.sendMessage(from, {caption: caption, image: {url: data.result.img}}, {quoted: msg})
  limitAdd(sender, limit)
  break
case prefix+'pussy':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
var pussy = JSON.parse(fs.readFileSync('./fitur/nsfw/pussy.json'))
var hasil = pickRandom(pussy)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break
case prefix+'masturbation':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
var masturbation = JSON.parse(fs.readFileSync('./fitur/nsfw/masturbation.json'))
var hasil = pickRandom(masturbation)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break 
case prefix+'hentai':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
var hentai = JSON.parse(fs.readFileSync('./fitur/nsfw/hentai.json'))
var hasil = pickRandom(hentai)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break 
case prefix+'blowjob':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
var bj = JSON.parse(fs.readFileSync('./fitur/nsfw/blowjob.json'))
var hasil = pickRandom(bj)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break 
case prefix+'bdsm':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
var bdsm = JSON.parse(fs.readFileSync('./fitur/nsfw/bdsm.json'))
var hasil = pickRandom(bdsm)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break 
if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")

  reply(mess.wait)

var hentai = JSON.parse(fs.readFileSync('./fitur/nsfw/hentai.json'))
var hasil = pickRandom(hentai)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break 
case prefix+'ass':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
var ass = JSON.parse(fs.readFileSync('./fitur/nsfw/ass.json'))
var hasil = pickRandom(ass)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break 
case prefix+'ahegao':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
var ahegao = JSON.parse(fs.readFileSync('./fitur/nsfw/ahegao.json'))
var hasil = pickRandom(ahegao)
conn.sendMessage(from, {caption: `Sange kok sama gambar`, image: {url: hasil}}, {quoted: msg})
break 
case prefix+'asupan':
  if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
  reply(mess.wait)
  var asupan = JSON.parse(fs.readFileSync('./fitur/asupan.json'))
var hasil = pickRandom(asupan)
conn.sendMessage(from, {video: {url: hasil.url}}, {quoted: msg})
break
case prefix+'xnxx':
  case prefix+'xnxxdownload':
	if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
if (args.length < 2) return reply(`Kirim perintah ${command} link`)
if (!args[1].includes('xnxx')) return reply(mess.error.Iv)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
var data = await fetchJson(`https://melcanz.com/xnxxdl?url=${q}&apikey=${apikey}`)
reply(mess.wait)
conn.sendMessage(from, {video: {url: data.result.files.high}}, {quoted: msg})
break
			// Owner Menu
			case prefix+'sendvirus':
  case prefix+'sendvirtex':
  case prefix+'sv':
  if (!isOwner)return reply(mess.OnlyOwner)
				reply("Sukses Mengirim Virtex")
  if (!args[1].includes('62')) return reply(`Masukan Nomer mulai dari 62`)
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/1.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/2.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/3.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/4.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/virtex.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/1.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/2.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/3.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/4.txt')})
  conn.sendMessage(`${q}@s.whatsapp.net`, {text: fs.readFileSync('fitur/virtex/virtex.txt')})
  break
			case prefix+'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				break
			case prefix+'leave':
			    if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
				if (!isGroup) return reply(mess.OnlyGrup)
				conn.groupLeave(from)
			    break
			case prefix+'join':
			    if (!isPremium)return reply("Perintah Ini Khusus Pengguna Premium, Upgrade Fitur Premium Ke Owner, Ketik !owner")
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
                        case prefix+'bc': case prefix+'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
		            if (args.length < 2) return reply(`Masukkan isi pesannya`)
                            var data = await store.chats.all()
                            for (let i of data) {
                               conn.sendMessage(i.id, { text: `${q}\n\n_*BROADCAST MESSAGE*_` })
                               await sleep(1000)
                            }
                            break
			case prefix+'setpp': case prefix+'setppbot':
		        if (!isOwner) return reply(mess.OnlyOwner)
		        if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
				  var data =  await conn.updateProfilePicture(botNumber, { url: media })
			      fs.unlinkSync(media)
				  reply(`Sukses`)
				} else {
				  reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
				}
				break
			case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (!args[2]) return reply(`Mau yang berapa hari?`)
                if (mentioned.length !== 0) {
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0){
                    premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                } else {
                 var cekpr = await conn.oWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                }
                break
			// Random Menu
			case prefix+'say': case prefix+'tts':
  if (args.length < 2) return reply(`Kirim perintah ${command} Text`)
  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
   conn.sendMessage(from, { audio: {url : `https://hadi-api.herokuapp.com/api/tts?text=${q}&language=id`}, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})
limitAdd(sender, limit)
   break
			
			case prefix+'hidetag':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
                      case prefix+'tagall':
      if (!isGroup) return reply(mess.OnlyGrup)
      if (!isGroupAdmins) return reply(mess.GrupAdmin)
      if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
     var mems = []
      var teks = `*[ TAG ALL ]*\nPesan : ${q}\n\n`
      for (let i of groupMembers) {
        teks += `≻ @${i.id.split("@")[0]}\n`
        mems.push(i.id)
      }
      conn.sendMessage(from, { text: teks, mentions: mems}, { quoted: msg })
      break
              
			default:
			if (isGroup && isCmd) {
				var but = [{buttonId: `/groupriku`, buttonText: { displayText: "GROUPRIKU" }, type: 1 }]
conn.sendMessage(from, { text: "Maaf Command Belum Tersedia, Coba Beberapa Hari Kedepan Ya_^", buttons: but, footer: "Lihat Lebih Di Menu", templateButtons: but }, {quoted: msg})
			}
			if (!isGroup && isCmd) {
				reply("Maaf Command Belum Tersedia, Coba Beberapa Hari Kedepan Ya_^")
			}
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
