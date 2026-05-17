// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование всех запросов
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

// Подключение к MongoDB (база данных dobrorf)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dobrorf';

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ Подключено к MongoDB');
    console.log(`📚 База данных: dobrorf`);
    console.log(`📦 Коллекция идей: ideas`);
    console.log(`🗳️ Коллекция голосов: votes`);
})
.catch(err => {
    console.error('❌ Ошибка подключения к MongoDB:', err);
    process.exit(1);
});

// Схема для коллекции ideas
const ideaSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Название обязательно'],
        trim: true,
        minlength: [3, 'Название должно содержать минимум 3 символа'],
        maxlength: [100, 'Название не должно превышать 100 символов']
    },
    description: { 
        type: String, 
        required: [true, 'Описание обязательно'],
        trim: true,
        minlength: [10, 'Описание должно содержать минимум 10 символов'],
        maxlength: [2000, 'Описание не должно превышать 2000 символов']
    },
    contacts: { 
        type: String, 
        required: [true, 'Контакты обязательны'],
        trim: true
    },
    vote: { 
        type: Number, 
        default: 0,
        min: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    collection: 'ideas' // Явно указываем название коллекции
});

// Создание модели для коллекции ideas
const Idea = mongoose.model('Idea', ideaSchema);

const formSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  isAgreed: {
    type: Boolean,
    required: true,
    default: false
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

// Голоса храним отдельно, чтобы надежно запретить повторный голос
// одного и того же номера телефона за одну и ту же идею.
const voteSchema = new mongoose.Schema({
    ideaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea',
        required: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'votes'
});

voteSchema.index({ ideaId: 1, phone: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);

const normalizePhone = (phoneNumber = '') => {
    let digits = String(phoneNumber).replace(/\D/g, '');

    if (digits.length === 10) {
        digits = `7${digits}`;
    }

    if (digits.length === 11 && digits.startsWith('8')) {
        digits = `7${digits.slice(1)}`;
    }

    return digits;
};

const isValidRussianPhone = (phone) => /^7\d{10}$/.test(phone);

// ============= API ЭНДПОИНТЫ =============

// GET /api/health - проверка здоровья сервера
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        dbName: 'dobrorf',
        collection: 'ideas',
        votesCollection: 'votes',
        timestamp: new Date() 
    });
});

// GET /api/ideas - получить все идеи из коллекции ideas
app.get('/api/ideas', async (req, res) => {
    console.log('🔍 Запрос на получение всех идей из коллекции ideas');
    
    try {
        const ideas = await Idea.find()
            .sort({ createdAt: -1 })
            .limit(100);
        
        console.log(`✅ Отправлено ${ideas.length} идей из коллекции ideas`);
        res.json(ideas);
    } catch (error) {
        console.error('❌ Ошибка получения идей:', error);
        res.status(500).json({ error: 'Ошибка получения идей из базы данных dobrorf' });
    }
});

// GET /api/ideas/:id - получить одну идею по ID
app.get('/api/ideas/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        
        if (!idea) {
            return res.status(404).json({ error: 'Идея не найдена в коллекции ideas' });
        }
        
        res.json(idea);
    } catch (error) {
        console.error('Ошибка получения идеи:', error);
        res.status(500).json({ error: 'Ошибка получения идеи' });
    }
});

// POST /api/ideas - создать новую идею в коллекции ideas
app.post('/api/ideas', async (req, res) => {
    console.log('📝 Получен POST запрос на создание идеи');
    console.log('📦 База данных: dobrorf');
    console.log('📚 Коллекция: ideas');
    console.log('📋 Данные:', req.body);
    
    try {
        const { title, description, contacts, vote } = req.body;
        
        // Валидация
        if (!title || !description || !contacts) {
            return res.status(400).json({ 
                error: 'Все поля обязательны для заполнения' 
            });
        }
        
        // Создание новой идеи
        const newIdea = new Idea({
            title: title.trim(),
            description: description.trim(),
            contacts: contacts.trim(),
            vote: vote || 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        // Сохранение в коллекции ideas базы данных dobrorf
        const savedIdea = await newIdea.save();
        
        console.log(`✅ Идея сохранена в БД dobrorf, коллекция ideas`);
        console.log(`📝 ID идеи: ${savedIdea._id}`);
        console.log(`📌 Название: ${savedIdea.title}`);
        
        res.status(201).json(savedIdea);
        
    } catch (error) {
        console.error('❌ Ошибка сохранения идеи:', error);
        
        // Обработка ошибок валидации
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        
        res.status(500).json({ error: 'Ошибка сохранения идеи в базе данных dobrorf' });
    }
});

// POST /api/submit-form - отправка формы обратной связи
app.post('/api/submit-form', async (req, res) => {
    console.log('📝 Получен POST запрос на отправку обратной связи');
    console.log('📋 Данные:', req.body);

    try {
        const { name, phone, message, isAgreed } = req.body;

        if (!name || !phone || !message || typeof isAgreed !== 'boolean') {
            return res.status(400).json({ success: false, error: 'Все поля обязательны для заполнения' });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({ success: false, error: 'Имя должно содержать минимум 2 символа' });
        }

        if (message.trim().length < 10) {
            return res.status(400).json({ success: false, error: 'Сообщение должно содержать минимум 10 символов' });
        }

        const submission = new FormSubmission({
            name: name.trim(),
            phone: phone.trim(),
            message: message.trim(),
            isAgreed,
            submittedAt: new Date()
        });

        const savedSubmission = await submission.save();

        console.log(`✅ Форма обратной связи сохранена: ${savedSubmission._id}`);
        res.status(201).json({ success: true, data: savedSubmission });
    } catch (error) {
        console.error('❌ Ошибка сохранения формы обратной связи:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, error: errors.join(', ') });
        }
        res.status(500).json({ success: false, error: 'Ошибка сохранения формы обратной связи' });
    }
});

// PUT /api/ideas/:id - обновить идею
app.put('/api/ideas/:id', async (req, res) => {
    try {
        const { title, description, contacts, vote } = req.body;
        
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            { 
                title, 
                description, 
                contacts, 
                vote,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        );
        
        if (!updatedIdea) {
            return res.status(404).json({ error: 'Идея не найдена' });
        }
        
        console.log(`✏️ Идея обновлена в коллекции ideas: ${updatedIdea._id}`);
        res.json(updatedIdea);
    } catch (error) {
        console.error('Ошибка обновления идеи:', error);
        res.status(500).json({ error: 'Ошибка обновления идеи' });
    }
});

// DELETE /api/ideas/:id - удалить идею
app.delete('/api/ideas/:id', async (req, res) => {
    try {
        const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
        
        if (!deletedIdea) {
            return res.status(404).json({ error: 'Идея не найдена' });
        }
        
        console.log(`🗑️ Идея удалена из коллекции ideas: ${deletedIdea._id}`);
        res.json({ message: 'Идея успешно удалена', id: req.params.id });
    } catch (error) {
        console.error('Ошибка удаления идеи:', error);
        res.status(500).json({ error: 'Ошибка удаления идеи' });
    }
});

// PATCH /api/ideas/:id/vote - добавить голос по номеру телефона
app.patch('/api/ideas/:id/vote', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const phone = normalizePhone(phoneNumber);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Некорректный ID идеи' });
        }

        if (!phoneNumber || !isValidRussianPhone(phone)) {
            return res.status(400).json({
                error: 'Введите корректный номер телефона, например +7 900 123-45-67'
            });
        }

        const idea = await Idea.findById(req.params.id);
        
        if (!idea) {
            return res.status(404).json({ error: 'Идея не найдена' });
        }

        try {
            await Vote.create({
                ideaId: idea._id,
                phone
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    error: 'Этот номер телефона уже голосовал за эту идею',
                    alreadyVoted: true,
                    vote: idea.vote
                });
            }
            throw error;
        }
        
        const updatedIdea = await Idea.findByIdAndUpdate(
            idea._id,
            {
                $inc: { vote: 1 },
                updatedAt: new Date()
            },
            { new: true }
        );
        
        console.log(`👍 Голос добавлен за идею: ${updatedIdea._id}`);
        console.log(`☎️ Телефон голосовавшего: ${phone}`);
        console.log(`📊 Текущее количество голосов: ${updatedIdea.vote}`);
        
        res.json({
            vote: updatedIdea.vote,
            message: 'Голос успешно засчитан'
        });
    } catch (error) {
        console.error('Ошибка голосования:', error);
        res.status(500).json({ error: 'Ошибка голосования' });
    }
});

// GET /api/ideas/search?q= - поиск идей
app.get('/api/ideas/search', async (req, res) => {
    try {
        const searchQuery = req.query.q;
        
        if (!searchQuery) {
            return res.json([]);
        }
        
        const ideas = await Idea.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        }).limit(20);
        
        console.log(`🔍 Найдено ${ideas.length} идей по запросу "${searchQuery}"`);
        res.json(ideas);
    } catch (error) {
        console.error('Ошибка поиска:', error);
        res.status(500).json({ error: 'Ошибка поиска' });
    }
});

// GET /api/stats - статистика по базе данных
app.get('/api/stats', async (req, res) => {
    try {
        const totalIdeas = await Idea.countDocuments();
        const uniqueVotes = await Vote.countDocuments();
        const totalVotes = await Idea.aggregate([
            { $group: { _id: null, total: { $sum: "$vote" } } }
        ]);
        
        res.json({
            database: 'dobrorf',
            collection: 'ideas',
            totalIdeas: totalIdeas,
            totalVotes: totalVotes[0]?.total || 0,
            uniqueVotes,
            lastUpdated: new Date()
        });
    } catch (error) {
        console.error('Ошибка получения статистики:', error);
        res.status(500).json({ error: 'Ошибка получения статистики' });
    }
});

// Обработка 404
app.use((req, res) => {
    console.log(`❌ 404: ${req.method} ${req.url}`);
    res.status(404).json({ error: `Маршрут ${req.url} не найден` });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`\n🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📊 База данных: dobrorf`);
    console.log(`📚 Коллекция идей: ideas`);
    console.log(`🗳️ Коллекция голосов: votes`);
    console.log(`\n📝 Доступные эндпоинты:`);
    console.log(`   GET    http://localhost:${PORT}/api/health`);
    console.log(`   GET    http://localhost:${PORT}/api/ideas`);
    console.log(`   GET    http://localhost:${PORT}/api/ideas/:id`);
    console.log(`   POST   http://localhost:${PORT}/api/ideas`);
    console.log(`   PUT    http://localhost:${PORT}/api/ideas/:id`);
    console.log(`   DELETE http://localhost:${PORT}/api/ideas/:id`);
    console.log(`   PATCH  http://localhost:${PORT}/api/ideas/:id/vote`);
    console.log(`   GET    http://localhost:${PORT}/api/ideas/search?q=текст`);
    console.log(`   GET    http://localhost:${PORT}/api/stats`);
    console.log(`\n✅ Готов к работе!\n`);
});