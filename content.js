document.addEventListener('mouseup', async () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        const translatedText = await translateText(selectedText);
        alert(`翻译结果：${translatedText}`);
    }
});

async function translateText(text, fromLang = 'en', toLang = 'zh') {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.responseStatus !== 200) {
            throw new Error('API 请求失败');
        }

        // 提取最佳翻译结果
        const bestMatch = data.matches.reduce((best, current) => {
            return current.match > best.match ? current : best;
        }, data.matches[0]);

        return bestMatch.translation || '未找到合适的翻译';
    } catch (error) {
        console.error('翻译出错:', error);
        return '翻译失败，请稍后再试';
    }
}
