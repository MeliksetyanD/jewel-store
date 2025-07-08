import TelegramApi from 'node-telegram-bot-api'
import dotenv from 'dotenv';
import { blogQuestions, blogValidators, productValidators, questions, sendPage } from './utils/botsUtils.js';
import { v4 as uuidv4 } from 'uuid'
import { deleteImages } from './utils/utilsfunctions.js'
import prodmodel from './models/productmodel.js'
import blogmodel from './models/blogmodel.js'
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
const BLOG_IMAGE_STEP_INDEX = blogQuestions.length - 1;



const keyboard = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "➕ Add Product", callback_data: 'form-data' }],
                        [{ text: "📝 Add Blog", callback_data: 'addBlog' }],
                        [{ text: "📦 Get All Products", callback_data: 'getAllProducts' }],
                        [{ text: "📚 Get All Blogs", callback_data: 'getAllBlogs' }],
                        [{ text: "✏️ Update Product", callback_data: 'updateProduct' }],
                        [{ text: "✏️ Update Blog", callback_data: 'updateBlog' }]
                    ]
                })
            }


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
            
            return bot.sendMessage(chatID, "Welcome! Please choose an action:", keyboard);
        }

        
        if (text === '/form-data') {
            userStates.set(chatID, { step: 0, answers: [] });
            return bot.sendMessage(chatID, questions[0]);
        }

        if (text === '/addBlog') {
            userStates.set(chatID, { step: 0, answers: [], type: 'blog' });
            return bot.sendMessage(chatID, blogQuestions[0]);
        }

        if (state && state.step === BLOG_IMAGE_STEP_INDEX && state.type === 'blog') {
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
                            await bot.sendMessage(chatID, `📸 ${state.imagePaths.length} photo(s) uploaded. Please send ${3 - state.imagePaths.length} more.`);
                        } else {
                            state.answers.push(state.imagePaths);


                            const blog = await blogmodel.create({
                                uid: uuidv4(),
                                title: state.answers[0],
                                subTitle: state.answers[1],
                                descriptionShort: state.answers[2],
                                descriptionFull: state.answers[3],
                                images: JSON.stringify(state.answers[4]),
                            })

                            const blogUrl = `✅ Successfully added!  \n\nhttp://192.168.0.104:5173/blog/${blog.uid}`; 
                             
                            await bot.sendMessage(chatID, `${blogUrl}`);
                            
                            userStates.delete(chatID);
                        }
                    });
                }).on('error', err => {
                    fs.unlink(savePath, () => { });
                    console.error('Download error:', err);
                    bot.sendMessage(chatID, '❌ Error uploading photo.');
                });

                return;
            } else {
                return bot.sendMessage(chatID, '📸 Please send a photo.');
            }
        }

        if (state && state.step < blogQuestions.length && state.type === 'blog') {

            const step = state.step;
            const result = blogValidators[step](text);

            if (result !== true) {
                return bot.sendMessage(chatID, `❌ ${result}\n\n${blogQuestions[step]}`);
            }

            state.answers.push(text);
            state.step++;

            if (state.step === BLOG_IMAGE_STEP_INDEX) {
                userStates.set(chatID, state);
                return bot.sendMessage(chatID, '📸 Please send 1–3 photos (either all at once or one by one).');
            }

            else if (state.step < blogQuestions.length) {
                userStates.set(chatID, state);
                return bot.sendMessage(chatID, blogQuestions[state.step]);
            }
            else {
                await bot.sendMessage(chatID, '✅ Successfully added!');
                console.log(state.answers)
                userStates.delete(chatID);
                return;
            }
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
                            await bot.sendMessage(chatID, `📸 ${state.imagePaths.length} photo(s) uploaded. Please send ${3 - state.imagePaths.length} more.`);
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

                            const productUrl = `✅ Successfully added!  \n\nhttp://192.168.0.104:5173/product/${product.uid}`; 
                            await bot.sendMessage(chatID, `${productUrl}`);
                            
                            userStates.delete(chatID);
                        }
                    });
                }).on('error', err => {
                    fs.unlink(savePath, () => { });
                    console.error('Download error:', err);
                    bot.sendMessage(chatID, '❌ Error uploading photo.');
                });

                return;
            } else {
                return bot.sendMessage(chatID, '📸 Please send a photo.');
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
                return bot.sendMessage(chatID, '📸 Please send 1–3 photos (either all at once or one by one).');
            }

            else if (state.step < questions.length) {
                userStates.set(chatID, state);
                return bot.sendMessage(chatID, questions[state.step]);
            }
            else {
                await bot.sendMessage(chatID, '✅ Successfully added!');
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

        if (data === 'backToMenu') {
            return bot.editMessageText("Welcome! Please choose an action:", {
                chat_id: chatID,
                message_id: messageID,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "➕ Add Product", callback_data: 'form-data' }],
                        [{ text: "📝 Add Blog", callback_data: 'addBlog' }],
                        [{ text: "📦 Get All Products", callback_data: 'getAllProducts' }],
                        [{ text: "📚 Get All Blogs", callback_data: 'getAllBlogs' }],
                        [{ text: "✏️ Update Product", callback_data: 'updateProduct' }],
                        [{ text: "✏️ Update Blog", callback_data: 'updateBlog' }]
                    ]
                }
            });
        }

        if (data === 'form-data') {
            userStates.set(chatID, { step: 0, answers: [] });
            await bot.sendMessage(chatID, questions[0]);
            await bot.answerCallbackQuery(callbackQuery.id);
            return
        }

        if (data === 'addBlog') {
            userStates.set(chatID, { step: 0, answers: [], type: 'blog' });
            await bot.sendMessage(chatID, blogQuestions[0]);
            await bot.answerCallbackQuery(callbackQuery.id);
            return
        }

        if (data === 'getAllProducts') {
            userStates.set(chatID, { type: 'pagination', page: 1 });
            return sendPage(bot, chatID, 1, messageID, prodmodel);
        }

        if (data === 'getAllBlogs') {
            userStates.set(chatID, { type: 'pagination', page: 1 });
            return sendPage(bot, chatID, 1,messageID, blogmodel);
        }

        if (data.startsWith('prevPage_') || data.startsWith('nextPage_')) {
            const page = parseInt(data.split('_')[1]);
            const typeOfModel = data.split('_')[2]

            const model = typeOfModel === 'product' ? prodmodel : blogmodel

            console.log(model)
            userStates.set(chatID, { type: 'pagination', page });
            await bot.answerCallbackQuery(callbackQuery.id);
            return sendPage(bot, chatID, page, messageID, model);
        }

        if (data.startsWith('delete_')) {
            const uidToDelete = data.split('_')[1];
            const Del = data.split('_')[2]
            console.log(Del)
            const model = Del === 'product' ? prodmodel : blogmodel

            try {
                const delobj = await model.findAll({ where: { uid: uidToDelete } })

                await Promise.all(JSON.parse(delobj[0].images).map(async (name) => {
                    try {
                        await deleteImages(name)
                    } catch (error) {
                        console.log('no such')
                    }
                }))

                await delobj[0].destroy()

                await bot.answerCallbackQuery(callbackQuery.id, { text: `✅ ${model === prodmodel ? 'product' : 'blog'} deleted` });
                const state = userStates.get(chatID);
                const currentPage = (state && state.page) || 1;
                userStates.set(chatID, { type: 'pagination', page: currentPage });
                return sendPage(bot, chatID, currentPage, messageID, model);

            } catch (error) {
                console.error('Delete error:', error);
                return bot.answerCallbackQuery(callbackQuery.id, { text: `❌ Failed to delete ${model === prodmodel ? 'product' : 'blog'}`, show_alert: true });
            }
        }
    })
}


start()
