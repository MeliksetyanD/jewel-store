import TelegramApi from 'node-telegram-bot-api'
import dotenv from 'dotenv';
import { productValidators, questions } from './utils/botsUtils.js';
import { v4 as uuidv4 } from 'uuid'
import { deleteImages } from './utils/utilsfunctions.js'
import prodmodel from './models/productmodel.js'
import path from 'path'
import fs from 'fs'
import https from 'https'


dotenv.config()

// process.removeAllListeners('warning');


const token = process.env.TELEGRAM_TOKEN
const ADMIN_ID = process.env.ADMIN_TG_ID
const bot = new TelegramApi(token, { polling: true })


const userStates = new Map()
const IMAGE_STEP_INDEX = questions.length - 1;
const PAGE_SIZE = 5;








const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Start the bot!' },
    ])

    bot.on('message', async msg => {
        const text = msg.text
        const chatID = msg.chat.id


        const state = userStates.get(chatID)

        if (chatID.toString() !== ADMIN_ID) {
            return bot.sendMessage(chatID, "⚠️ Access denied.");
        }

        if (text === '/start') {
            const keyboard = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "➕ Add Product", callback_data: 'form-data' }],
                        [{ text: "📝 Add Blog", callback_data: 'addBlog' }],
                        [{ text: "📦 Get All Products", callback_data: 'getAllProducts' }],
                        [{ text: "✏️ Update Product", callback_data: 'updateProduct' }],
                        [{ text: "🗑️ Delete Product", callback_data: 'deleteProduct' }]

                    ]
                })
            }
            return bot.sendMessage(chatID, "Welcome! Please choose an action:", keyboard);
        }

        

        if (text === '/form-data') {
            userStates.set(chatID, { step: 0, answers: [] });
            return bot.sendMessage(chatID, questions[0]);
        }

        if (state && state.step === IMAGE_STEP_INDEX) {
            if (msg.photo) {
                const photoSizes = msg.photo;
                const largestPhoto = photoSizes[photoSizes.length - 1];
                const fileId = largestPhoto.file_id;

                const fileInfo = await bot.getFile(fileId);
                const filePath = fileInfo.file_path;
                const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${filePath}`;
                const fileName = `${Date.now()}_${path.basename(filePath)}`;
                const savePath = path.join('uploads', fileName);

                if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

                const file = fs.createWriteStream(savePath);
                https.get(fileUrl, response => {
                    response.pipe(file);
                    file.on('finish', async () => {
                        file.close();

                        if (!state.imagePaths) state.imagePaths = [];

                        state.imagePaths.push(path.basename(savePath));

                        if (state.imagePaths.length < 3) {
                            userStates.set(chatID, state);
                            await bot.sendMessage(chatID, `📸 Загружено ${state.imagePaths.length} фото. Отправьте ещё ${3 - state.imagePaths.length}.`);
                        } else {
                            state.answers.push(state.imagePaths);

                            if (state.answers[8] === 'yes') {
                                state.answers[8] = true
                            } else {
                                state.answers[8] = false
                            }

                            const product = await prodmodel.create({
                                uid: uuidv4(),
                                name: state.answers[0],
                                price: parseInt(state.answers[1]),
                                description: state.answers[2],
                                count: parseInt(state.answers[3]),
                                sizes: state.answers[4],
                                colorus: state.answers[5],
                                weight: parseFloat(state.answers[6]),
                                material: state.answers[7],
                                forSlide: state.answers[8],
                                categoryname: state.answers[9],
                                images: JSON.stringify(state.answers[10]),
                            })


                            const productUrl = `http://192.168.0.104:5173/product/${product.uid}`; 
                             
                            await bot.sendMessage(chatID, `${productUrl}`);
                            
                            userStates.delete(chatID);
                        }
                    });
                }).on('error', err => {
                    fs.unlink(savePath, () => { });
                    console.error('Download error:', err);
                    bot.sendMessage(chatID, '❌ Ошибка при загрузке фото.');
                });

                return;
            } else {
                return bot.sendMessage(chatID, '📸 Пожалуйста, отправьте фото.');
            }
        }


        if (state && state.step < questions.length) {

            const step = state.step;

            const result = productValidators[step](text);

            if (result !== true) {
                return bot.sendMessage(chatID, `❌ ${result}\n\n${questions[step]}`);
            }

            state.answers.push(text);
            state.step++;

            if (state.step === IMAGE_STEP_INDEX) {
                userStates.set(chatID, state);
                return bot.sendMessage(chatID, '📸 Ուղարկեք 1-3 նկար (բոլոր նկարը միաժամանակ կամ հերթով)');
            }

            else if (state.step < questions.length) {
                userStates.set(chatID, state);
                return bot.sendMessage(chatID, questions[state.step]);
            }
            else {
                await bot.sendMessage(chatID, '✅ added');
                console.log(state.answers)
                userStates.delete(chatID);
                return;
            }
        }


        return bot.sendMessage(chatID, `I didn’t understand that. Please try again!`)
    })



    bot.on('callback_query', async (callbackQuery) => {
        bot.answerCallbackQuery(callbackQuery.id);
        const chatID = callbackQuery.message.chat.id;
        const messageID = callbackQuery.message.message_id;
        const data = callbackQuery.data;

        if (chatID.toString() !== ADMIN_ID) {
            return bot.sendMessage(chatID, "⚠️ Access denied.");
        }

        if (data === 'form-data') {
            userStates.set(chatID, { step: 0, answers: [] });
            await bot.sendMessage(chatID, questions[0]);
            await bot.answerCallbackQuery(callbackQuery.id);
            return
        }








        if (data === 'getAllProducts') {
            userStates.set(chatID, { type: 'pagination', page: 1 });
            return sendProductPage(chatID, 1);
        }

        if (data.startsWith('prevPage_') || data.startsWith('nextPage_')) {
            const page = parseInt(data.split('_')[1]);
            userStates.set(chatID, { type: 'pagination', page });
            await bot.answerCallbackQuery(callbackQuery.id);
            return sendProductPage(chatID, page, messageID);
        }

        if (data.startsWith('delete_')) {
            const uidToDelete = data.split('_')[1];

            try {
                // Отправляем DELETE запрос на твой API роут
                const product = await prodmodel.findAll({ where: { uid: uidToDelete } })

                await Promise.all(JSON.parse(product[0].images).map(async (name) => {
                    try {
                        await deleteImages(name)
                    } catch (error) {
                        console.log('no such')
                    }
                }))

                await product[0].destroy()

                await bot.answerCallbackQuery(callbackQuery.id, { text: '✅ Product deleted' });

                // Обновляем страницу с продуктами (возвращаемся на ту же страницу)
                const state = userStates.get(chatID);
                const currentPage = (state && state.page) || 1;
                userStates.set(chatID, { type: 'pagination', page: currentPage });
                return sendProductPage(chatID, currentPage, messageID);

            } catch (error) {
                console.error('Delete error:', error);
                return bot.answerCallbackQuery(callbackQuery.id, { text: '❌ Failed to delete product', show_alert: true });
            }
        }



        // if (data === 'start' ) {


        // }


    })
}


start()


async function sendProductPage(chatID, page, message_id) {
    const total = await prodmodel.count();
    const totalPages = Math.ceil(total / PAGE_SIZE);

    if (page < 1 || page > totalPages) {
        return bot.sendMessage(chatID, '❌ Նշված էջը գոյություն չունի։');
    }

    const products = await prodmodel.findAll({
        offset: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        order: [['createdAt', 'DESC']],
    });

    let msg = `📦 <b>Ապրանքներ — Էջ ${page} / ${totalPages}</b>\n\n`;

    const inlineKeyboard = [];

    products.forEach((p, index) => {
        const productUrl = `http://192.168.0.104:5173/product/${p.uid}`;
        msg += `<b>${index + 1}․</b> <a href="${productUrl}">${p.name}</a>\n💰 Գին՝ <b>${p.price} ֏</b>\n\n`;

        inlineKeyboard.push([
            { text: `🗑️ Delete #${index + 1}`, callback_data: `delete_${p.uid}` }
        ]);
    });

    // Навигационные кнопки
    const navButtons = [];
    if (page > 1) navButtons.push({ text: '⬅️ Նախորդ', callback_data: `prevPage_${page - 1}` });
    if (page < totalPages) navButtons.push({ text: '➡️ Հաջորդ', callback_data: `nextPage_${page + 1}` });
    if (navButtons.length) inlineKeyboard.push(navButtons);

    const options = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    };

    if (message_id) {
        return bot.editMessageText(msg, {
            chat_id: chatID,
            message_id,
            parse_mode: 'HTML',
            reply_markup: options.reply_markup
        });
    } else {
        return bot.sendMessage(chatID, msg, options);
    }
}