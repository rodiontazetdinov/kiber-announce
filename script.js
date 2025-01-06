document.getElementById('announceForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const resultContainer = document.getElementById('resultContainer');
    const generatedText = document.getElementById('generatedText');
    
    // Изменяем текст кнопки
    submitBtn.textContent = 'Генерируем...';
    submitBtn.disabled = true;

    // Получаем данные из формы
    const formData = {
        currentDate: this.currentDate.value,
        nextDate: this.nextDate.value,
        topic: this.topic.value,
        learned: this.learned.value,
        exercises: this.exercises.value,
        mood: this.mood.value
    };

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer H8JUDXVXijuuZ9CnF5xzKkWX8HHv4FK3'
            },
            body: JSON.stringify({
                model: "mistral-tiny",
                messages: [
                    {
                        role: "system",
                        content: "Ты - преподаватель детского IT-кружка, который пишет краткие отчеты о прошедших занятиях. Пиши живым, дружелюбным языком с эмодзи. Обязательно упоминай успехи детей и их достижения. В конце добавляй краткий анонс следующего занятия. Старайся уложиться в 3-4 небольших абзаца."
                    },
                    {
                        role: "user",
                        content: `Напиши пост о прошедшем занятии:
                            Дата занятия: ${new Date(formData.currentDate).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                            Тема занятия: ${formData.topic}
                            Что дети изучили: ${formData.learned}
                            Какие практические задания выполнили: ${formData.exercises}
                            Атмосфера на занятии: ${formData.mood}
                            Дата следующего занятия: ${new Date(formData.nextDate).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                            
                            Напиши 2-3 абзаца о том:
                            1. Как прошло занятие, чему научились дети
                            2. Какие интересные моменты были, что особенно понравилось детям
                            3. Кратко опиши, что планируется на следующем занятии (${new Date(formData.nextDate).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long'
                            })})`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const data = await response.json();
        generatedText.value = data.choices[0].message.content;
        resultContainer.classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        generatedText.value = 'Произошла ошибка при генерации текста. Пожалуйста, попробуйте еще раз.';
        resultContainer.classList.remove('hidden');
    } finally {
        submitBtn.textContent = 'Создать анонс';
        submitBtn.disabled = false;
    }
});

function copyToClipboard() {
    const text = document.getElementById('generatedText').value;
    navigator.clipboard.writeText(text);
    
    // Показываем уведомление о копировании
    const button = document.querySelector('#resultContainer button');
    const originalEmoji = button.textContent;
    button.textContent = '✅';
    setTimeout(() => {
        button.textContent = originalEmoji;
    }, 2000);
} 