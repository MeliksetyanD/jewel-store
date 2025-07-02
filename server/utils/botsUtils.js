export const productQuestions = [
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
