import prodmodel from '../models/productmodel.js'
import blogmodel from '../models/blogmodel.js'


const PAGE_SIZE = 5;




export const questions = [
  '📝 Enter the **product name**:',
  '💲 Enter the **price**:',
  '📃 Enter the **description**:',
  '🔢 Enter the **count** (quantity in stock):',
  '📏 Enter the **sizes** (e.g., S, M, L or "15x10x5cm"):',
  '🎨 Enter the **colors** (comma-separated, e.g., gold, silver):',
  '⚖️ Enter the **weight** (in grams):',
  '🔩 Enter the **material** (e.g., gold, silver, steel):',
  '🖼️ Should it appear in the **main slider**? (yes/no):',
  '📂 Enter the **category name**:',
  '📸 Please **upload up to 3 images** of the product:'
]

export const blogQuestions = [
  '📝 Enter the **blog title**:',
  '🗂️ Enter the **subtitle**:',
  '✏️ Enter the **short description**:',
  '📃 Enter the **full description**:',
  '📸 Please **upload up to 3 images** for the blog:'
];


export const productValidators = [
  // name — минимум 2 символа
  name => name.trim().length >= 2 || 'Name must be at least 2 characters.',
  // price — положительное целое число
  price => /^\d+$/.test(price) && Number(price) > 0 || 'Price must be a positive integer.',
  // description — минимум 5 символов (можно поменять)
  desc => desc.trim().length >= 5 || 'Description must be at least 5 characters.',
  // count — неотрицательное целое число
  count => /^\d+$/.test(count) || 'Count must be a non-negative integer.',
  // sizes — не пустая строка (можно более сложный валидатор)
  sizes => sizes.trim().length > 0 || 'Sizes cannot be empty.',
  // colorus — не пустая строка
  colorus => colorus.trim().length > 0 || 'Colors cannot be empty.',
  // weight — число (может быть с десятичной точкой), больше 0
  weight => /^(\d+(\.\d+)?|\.\d+)$/.test(weight) && parseFloat(weight) > 0 || 'Weight must be a positive number.',
  // material — не пустая строка
  material => material.trim().length > 0 || 'Material cannot be empty.',
  // forSlide — yes/no (будем проверять именно такие ответы)
  forSlide => ['yes', 'no'].includes(forSlide.toLowerCase()) || 'Please enter "yes" or "no".',
  // categoryname — не пустая строка
  categoryname => categoryname.trim().length > 0 || 'Category name cannot be empty.',
  // images — для upload (тут проще валидировать отдельно в middleware загрузки, либо проверить количество файлов)
  images => Array.isArray(images) && images.length > 0 && images.length <= 3 || 'Upload 1 to 3 images.'
]



export const blogValidators = [
  // Title — минимум 3 символа
  title => title.trim().length >= 3 || 'Title must be at least 3 characters.',

  // Subtitle — минимум 3 символа
  subtitle => subtitle.trim().length >= 3 || 'Subtitle must be at least 3 characters.',

  // Short description — минимум 10 символов
  shortDesc => shortDesc.trim().length >= 3 || 'Short description must be at least 10 characters.',

  // Full description — минимум 20 символов
  fullDesc => fullDesc.trim().length >= 3 || 'Full description must be at least 20 characters.',

  // Images — массив с 1–3 файлами
  images => Array.isArray(images) && images.length > 0 && images.length <= 3 || 'Upload 1 to 3 images.'
];



export async function sendPage(bot, chatID, page, message_id, model) {
  try {
    // console.log(model)
    const total = await model.count();
    const totalPages = Math.ceil(total / PAGE_SIZE);

    if (page < 1 || page > totalPages) {
      return bot.sendMessage(chatID, '📭 The list is empty.');
    }


    const datas = await model.findAll({
      offset: (page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
      order: [['createdAt', 'DESC']],
    });

    let msg = `📦 <b>Page ${page} / ${totalPages}</b>\n\n`;

    const inlineKeyboard = [];

    datas.forEach((p, index) => {
      const dataUrl = `http://192.168.0.104:5173/${model === prodmodel ? 'product' : 'blog'}/${p.uid}`;
      msg += `<b>${index + 1}․</b> <a href="${dataUrl}">${model === prodmodel ? p.name : p.title}</a>\n\n\n`;

      inlineKeyboard.push([
        { text: `🗑️ Delete #${index + 1}`, callback_data: `delete_${p.uid}_${model === prodmodel ? 'product' : 'blog'}` }
      ]);
    });

    const prewtype = model === prodmodel ? 'product' : 'blog'

    console.log(prewtype)

    const navButtons = [];
    if (page > 1) navButtons.push({ text: '⬅️ Previous', callback_data: `prevPage_${page - 1}_${prewtype}` });
    if (page < totalPages) navButtons.push({ text: '➡️ Next', callback_data: `nextPage_${page + 1}_${prewtype}` });
    if (navButtons.length) inlineKeyboard.push(navButtons);

    inlineKeyboard.push([
      { text: '🔙 Back', callback_data: 'backToMenu' }
    ]);

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


  } catch (error) {
    console.error('error:', error);
  }
}



export async function sendUpdatePage(bot, chatID, page, message_id, model) {
  try {
    // console.log(model)
    const total = await model.count();
    const totalPages = Math.ceil(total / PAGE_SIZE);

    if (page < 1 || page > totalPages) {
      return bot.sendMessage(chatID, '📭 The list is empty.');
    }


    const datas = await model.findAll({
      offset: (page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
      order: [['createdAt', 'DESC']],
    });

    let msg = `📦 <b>Page ${page} / ${totalPages}</b>\n\n`;

    const inlineKeyboard = [];

    datas.forEach((p, index) => {
      const dataUrl = `http://192.168.0.104:5173/${model === prodmodel ? 'product' : 'blog'}/${p.uid}`;
      msg += `<b>${index + 1}․</b> <a href="${dataUrl}">${model === prodmodel ? p.name : p.title}</a>\n\n\n`;

      inlineKeyboard.push([
        { text: `✏️ Update #${index + 1}`, callback_data: `update_${p.uid}_${model === prodmodel ? 'product' : 'blog'}` }
      ]);
    });

    const prewtype = model === prodmodel ? 'product' : 'blog'

    console.log(prewtype)

    const navButtons = [];
    if (page > 1) navButtons.push({ text: '⬅️ Previous', callback_data: `prevPage_${page - 1}_${prewtype}` });
    if (page < totalPages) navButtons.push({ text: '➡️ Next', callback_data: `nextPage_${page + 1}_${prewtype}` });
    if (navButtons.length) inlineKeyboard.push(navButtons);

    inlineKeyboard.push([
      { text: '🔙 Back', callback_data: 'backToMenu' }
    ]);

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


  } catch (error) {
    console.error('error:', error);
  }
}