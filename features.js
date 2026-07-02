// ===== PARTICLES BACKGROUND =====
(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }
    createParticles();

    function drawParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(162,155,254,' + p.alpha + ')';
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(108,92,231,' + (0.15 - dist / 800) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
})();


// ===== 3D CARD TILT EFFECT =====
document.querySelectorAll('.guide-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
    });
});

// ===== SPLASH SCREEN =====
(function() {
    const splash = document.createElement('div');
    splash.id = 'splash';
    splash.innerHTML = '<div class="splash-content"><div class="splash-icon">🤖</div><h1>דשבורד מדריכי AI</h1><div class="splash-loader"></div><p>טוען 100 מדריכים...</p></div>';
    splash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#0c0c1d,#1a1a3e);z-index:9999;display:flex;align-items:center;justify-content:center;transition:opacity 0.8s ease;';
    splash.querySelector('.splash-content').style.cssText = 'text-align:center;color:white;font-family:Heebo,sans-serif;';
    splash.querySelector('.splash-icon').style.cssText = 'font-size:4rem;animation:bounce 1s ease infinite;';
    splash.querySelector('h1').style.cssText = 'font-size:2.5rem;background:linear-gradient(135deg,#a29bfe,#fd79a8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:1rem 0;';
    splash.querySelector('.splash-loader').style.cssText = 'width:200px;height:4px;background:rgba(108,92,231,0.2);border-radius:2px;margin:1.5rem auto;overflow:hidden;position:relative;';
    splash.querySelector('p').style.cssText = 'color:#888;font-size:0.9rem;';
    
    const bar = document.createElement('div');
    bar.style.cssText = 'position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,#6c5ce7,#fd79a8);border-radius:2px;animation:loading 1.5s ease forwards;';
    splash.querySelector('.splash-loader').appendChild(bar);
    document.body.prepend(splash);

    setTimeout(() => { splash.style.opacity = '0'; }, 1800);
    setTimeout(() => { splash.remove(); }, 2600);
})();

// Add splash keyframes
const splashStyle = document.createElement('style');
splashStyle.textContent = '@keyframes loading{to{left:0}}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}';
document.head.appendChild(splashStyle);


// ===== NEURAL NETWORK VISUALIZER =====
(function() {
    const section = document.createElement('section');
    section.className = 'guide-section';
    section.id = 'nn-visualizer';
    section.innerHTML = '<h2 class="section-title">🧠 Neural Network Visualizer - צפייה חיה ברשת נוירונים</h2>' +
        '<div style="background:rgba(20,20,50,0.9);border-radius:20px;padding:2rem;border:1px solid rgba(108,92,231,0.3);">' +
        '<canvas id="nnCanvas" width="900" height="350" style="width:100%;max-width:900px;display:block;margin:0 auto;border-radius:10px;"></canvas>' +
        '<div style="text-align:center;margin-top:1rem;">' +
        '<button class="quiz-btn" id="nnTrain" style="margin:0.3rem;">▶ אמן את הרשת</button>' +
        '<button class="quiz-btn" id="nnReset" style="margin:0.3rem;background:#e17055;">🔄 אפס</button>' +
        '<span id="nnEpoch" style="color:#a29bfe;margin:0 1rem;">Epoch: 0 | Loss: 1.000</span>' +
        '</div></div>';
    
    const dashboard = document.querySelector('.dashboard');
    const firstSection = dashboard.querySelector('.guide-section');
    dashboard.insertBefore(section, firstSection);

    const canvas = document.getElementById('nnCanvas');
    const ctx2 = canvas.getContext('2d');
    const layers = [4, 6, 6, 3];
    let weights = [];
    let activations = [];
    let epoch = 0;
    let loss = 1.0;
    let training = false;

    function initWeights() {
        weights = [];
        for (let l = 0; l < layers.length - 1; l++) {
            const w = [];
            for (let i = 0; i < layers[l]; i++) {
                const row = [];
                for (let j = 0; j < layers[l + 1]; j++) {
                    row.push((Math.random() - 0.5) * 2);
                }
                w.push(row);
            }
            weights.push(w);
        }
        activations = layers.map(n => Array(n).fill(0.5));
        epoch = 0;
        loss = 1.0;
    }
    initWeights();

    function getNodePos(layer, node) {
        const x = 80 + layer * (canvas.width - 160) / (layers.length - 1);
        const totalH = layers[layer] * 45;
        const y = (canvas.height - totalH) / 2 + node * 45 + 22;
        return { x, y };
    }

    function drawNN() {
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        // Draw connections
        for (let l = 0; l < layers.length - 1; l++) {
            for (let i = 0; i < layers[l]; i++) {
                for (let j = 0; j < layers[l + 1]; j++) {
                    const from = getNodePos(l, i);
                    const to = getNodePos(l + 1, j);
                    const w = weights[l][i][j];
                    const alpha = Math.min(Math.abs(w) * 0.5, 0.8);
                    ctx2.beginPath();
                    ctx2.moveTo(from.x, from.y);
                    ctx2.lineTo(to.x, to.y);
                    ctx2.strokeStyle = w > 0 ? 'rgba(0,184,148,' + alpha + ')' : 'rgba(225,112,85,' + alpha + ')';
                    ctx2.lineWidth = Math.abs(w) * 1.5;
                    ctx2.stroke();
                }
            }
        }
        // Draw nodes
        for (let l = 0; l < layers.length; l++) {
            for (let n = 0; n < layers[l]; n++) {
                const pos = getNodePos(l, n);
                const act = activations[l][n];
                const glow = act * 20;
                ctx2.beginPath();
                ctx2.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
                ctx2.fillStyle = 'rgba(108,92,231,' + (0.3 + act * 0.7) + ')';
                ctx2.shadowColor = '#a29bfe';
                ctx2.shadowBlur = glow;
                ctx2.fill();
                ctx2.shadowBlur = 0;
                ctx2.strokeStyle = '#a29bfe';
                ctx2.lineWidth = 2;
                ctx2.stroke();
                ctx2.fillStyle = 'white';
                ctx2.font = '9px sans-serif';
                ctx2.textAlign = 'center';
                ctx2.fillText(act.toFixed(1), pos.x, pos.y + 3);
            }
        }
        // Labels
        ctx2.fillStyle = '#888';
        ctx2.font = '12px Heebo, sans-serif';
        ctx2.textAlign = 'center';
        const labels = ['קלט', 'שכבה נסתרת 1', 'שכבה נסתרת 2', 'פלט'];
        for (let l = 0; l < layers.length; l++) {
            const pos = getNodePos(l, 0);
            ctx2.fillText(labels[l], pos.x, canvas.height - 10);
        }
    }

    function trainStep() {
        // Simulate forward pass
        activations[0] = Array(layers[0]).fill(0).map(() => Math.random());
        for (let l = 1; l < layers.length; l++) {
            for (let j = 0; j < layers[l]; j++) {
                let sum = 0;
                for (let i = 0; i < layers[l - 1]; i++) {
                    sum += activations[l - 1][i] * weights[l - 1][i][j];
                }
                activations[l][j] = 1 / (1 + Math.exp(-sum)); // sigmoid
            }
        }
        // Simulate weight update
        for (let l = 0; l < weights.length; l++) {
            for (let i = 0; i < weights[l].length; i++) {
                for (let j = 0; j < weights[l][i].length; j++) {
                    weights[l][i][j] += (Math.random() - 0.5) * 0.05 * loss;
                }
            }
        }
        epoch++;
        loss = Math.max(0.01, loss * 0.97 + Math.random() * 0.01);
        document.getElementById('nnEpoch').textContent = 'Epoch: ' + epoch + ' | Loss: ' + loss.toFixed(3);
        drawNN();
    }

    let trainInterval;
    document.getElementById('nnTrain').addEventListener('click', () => {
        if (!training) {
            training = true;
            trainInterval = setInterval(trainStep, 100);
            document.getElementById('nnTrain').textContent = '⏸ עצור';
        } else {
            training = false;
            clearInterval(trainInterval);
            document.getElementById('nnTrain').textContent = '▶ אמן את הרשת';
        }
    });

    document.getElementById('nnReset').addEventListener('click', () => {
        training = false;
        clearInterval(trainInterval);
        document.getElementById('nnTrain').textContent = '▶ אמן את הרשת';
        initWeights();
        drawNN();
        document.getElementById('nnEpoch').textContent = 'Epoch: 0 | Loss: 1.000';
    });

    drawNN();
})();


// ===== MODEL LEADERBOARD =====
(function() {
    const section = document.createElement('section');
    section.className = 'guide-section';
    section.id = 'leaderboard';
    section.innerHTML = '<h2 class="section-title">🏆 טבלת Leaderboard - מודלי AI מובילים (יוני 2026)</h2>' +
        '<div style="background:rgba(20,20,50,0.9);border-radius:20px;padding:1.5rem;border:1px solid rgba(108,92,231,0.3);overflow-x:auto;">' +
        '<div style="margin-bottom:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;">' +
        '<button class="nav-btn active" data-sort="rank">דירוג</button>' +
        '<button class="nav-btn" data-sort="price">מחיר</button>' +
        '<button class="nav-btn" data-sort="context">Context</button>' +
        '</div>' +
        '<table class="comparison-table" id="leaderboardTable"><thead><tr>' +
        '<th>#</th><th>מודל</th><th>חברה</th><th>🏴 מדינה</th><th>מחיר (M tokens)</th><th>Context</th><th>סוג</th><th>הערות</th>' +
        '</tr></thead><tbody id="leaderboardBody"></tbody></table></div>';

    const dashboard = document.querySelector('.dashboard');
    const newsSection = document.getElementById('news');
    if (newsSection) dashboard.insertBefore(section, newsSection);

    const models = [
        { rank: 1, name: "GPT-5.6 Sol", company: "OpenAI", country: "🇺🇸", price: "$5/$30", context: "200K", type: "Frontier", notes: "מוגבל - 20 שותפים" },
        { rank: 2, name: "Claude Mythos 5", company: "Anthropic", country: "🇺🇸", price: "N/A", context: "1M", type: "Frontier", notes: "Project Glasswing בלבד" },
        { rank: 3, name: "Claude Fable 5", company: "Anthropic", country: "🇺🇸", price: "$10/$50", context: "1M", type: "Frontier", notes: "80% SWE-Bench Pro" },
        { rank: 4, name: "Grok 4.5", company: "xAI", country: "🇺🇸", price: "N/A", context: "256K", type: "Frontier", notes: "1.5T params, בטא פרטית" },
        { rank: 5, name: "Claude Opus 4.8", company: "Anthropic", country: "🇺🇸", price: "$5/$25", context: "1M", type: "Flagship", notes: "שובר שיאים בקוד" },
        { rank: 6, name: "GPT-5.5", company: "OpenAI", country: "🇺🇸", price: "$5/$30", context: "128K", type: "Flagship", notes: "הדגל הקודם" },
        { rank: 7, name: "Gemini 3.5 Pro", company: "Google", country: "🇺🇸", price: "$3.50/$10.50", context: "2M", type: "Flagship", notes: "חלון ההקשר הגדול ביותר" },
        { rank: 8, name: "DeepSeek V4 Pro", company: "DeepSeek", country: "🇨🇳", price: "$0.50/$2", context: "128K", type: "Frontier", notes: "+85% מהיר עם DSpark" },
        { rank: 9, name: "GPT-5.6 Terra", company: "OpenAI", country: "🇺🇸", price: "$2.50/$15", context: "200K", type: "Balanced", notes: "GPT-5.5 בחצי מחיר" },
        { rank: 10, name: "Nemotron 3 Ultra", company: "NVIDIA", country: "🇺🇸", price: "חינם", context: "128K", type: "Open", notes: "550B, קוד פתוח מלא" },
        { rank: 11, name: "Qwen 3.7 Max", company: "Alibaba", country: "🇨🇳", price: "$1/$3", context: "128K", type: "Flagship", notes: "מוביל סיני" },
        { rank: 12, name: "GLM-5.2", company: "Zhipu AI", country: "🇨🇳", price: "$0.80/$2.40", context: "128K", type: "Frontier", notes: "חדש ביוני 2026" },
        { rank: 13, name: "GPT-5.6 Luna", company: "OpenAI", country: "🇺🇸", price: "$1/$6", context: "200K", type: "Fast", notes: "מהיר וזול" },
        { rank: 14, name: "Llama 4 Scout", company: "Meta", country: "🇺🇸", price: "חינם", context: "256K", type: "Open", notes: "קוד פתוח" },
        { rank: 15, name: "Kimi K2.7 Code", company: "Moonshot", country: "🇨🇳", price: "$0.60/$1.80", context: "128K", type: "Code", notes: "מודל קוד סיני" },
    ];

    function renderTable(data) {
        document.getElementById('leaderboardBody').innerHTML = data.map((m, i) => 
            '<tr style="' + (i < 3 ? 'background:rgba(108,92,231,0.05);' : '') + '">' +
            '<td style="font-weight:700;color:' + (i < 3 ? '#fdcb6e' : '#888') + ';">' + m.rank + '</td>' +
            '<td style="font-weight:600;color:white;">' + m.name + '</td>' +
            '<td>' + m.company + '</td>' +
            '<td style="font-size:1.2rem;">' + m.country + '</td>' +
            '<td style="color:#00b894;">' + m.price + '</td>' +
            '<td>' + m.context + '</td>' +
            '<td><span style="padding:2px 8px;border-radius:10px;font-size:0.75rem;background:rgba(108,92,231,0.2);color:#a29bfe;">' + m.type + '</span></td>' +
            '<td style="font-size:0.8rem;color:#888;">' + m.notes + '</td></tr>'
        ).join('');
    }
    renderTable(models);

    // Sort buttons
    section.querySelectorAll('[data-sort]').forEach(btn => {
        btn.addEventListener('click', () => {
            section.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sort = btn.dataset.sort;
            let sorted = [...models];
            if (sort === 'price') sorted.sort((a, b) => a.price.localeCompare(b.price));
            if (sort === 'context') sorted.sort((a, b) => parseInt(b.context) - parseInt(a.context));
            renderTable(sorted);
        });
    });
})();


// ===== MODEL ARENA =====
(function() {
    const section = document.createElement('section');
    section.className = 'guide-section';
    section.id = 'arena';
    section.innerHTML = '<h2 class="section-title">⚔️ AI Model Arena - השוואת מודלים</h2>' +
        '<div style="background:rgba(20,20,50,0.9);border-radius:20px;padding:2rem;border:1px solid rgba(253,121,168,0.3);">' +
        '<p style="color:#b0b0c0;margin-bottom:1rem;text-align:center;">בחרו שאלה וראו כיצד כל מודל היה עונה (סימולציה)</p>' +
        '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1.5rem;">' +
        '<button class="arena-q quiz-btn" data-q="0">מה זה Transformer?</button>' +
        '<button class="arena-q quiz-btn" data-q="1">כתוב Hello World ב-Python</button>' +
        '<button class="arena-q quiz-btn" data-q="2">הסבר מה זה RAG בפשטות</button>' +
        '</div>' +
        '<div id="arenaResults" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;"></div></div>';
    
    const leaderboard = document.getElementById('leaderboard');
    if (leaderboard) leaderboard.parentNode.insertBefore(section, leaderboard.nextSibling);

    const responses = [
        // Q0: What is Transformer
        [
            { model: "GPT-5.6 Sol", icon: "🟢", text: "Transformer הוא ארכיטקטורת רשת נוירונים שהוצגה ב-2017 במאמר 'Attention Is All You Need'. היא מבוססת על מנגנון Self-Attention שמאפשר לכל חלק בקלט 'לשים לב' לכל חלק אחר, ללא תלות במרחק ברצף." },
            { model: "Claude Opus 4.8", icon: "🟣", text: "Transformer הוא מבנה מתמטי שמהפך את עולם ה-AI. במקום לקרוא טקסט מילה-מילה (כמו RNN), הוא רואה את כל המשפט בבת אחת ולומד אילו מילים חשובות לאילו - זה ה-Attention. כל מודלי השפה הגדולים מבוססים עליו." },
            { model: "Gemini 3.5", icon: "🔵", text: "ארכיטקטורת Transformer היא הבסיס של כמעט כל מודלי AI מודרניים. היא עובדת עם מנגנון attention שמחשב קשרים בין כל הטוקנים במקביל, מה שמאפשר אימון יעיל על GPU ותפיסת תלויות ארוכות טווח בטקסט." }
        ],
        // Q1: Hello World Python
        [
            { model: "GPT-5.6 Sol", icon: "🟢", text: "print(\"Hello, World!\")\n\nזהו - שורה אחת. Python היא שפה פשוטה ואלגנטית. הפונקציה print() מדפיסה טקסט למסך." },
            { model: "Claude Opus 4.8", icon: "🟣", text: "# Hello World in Python\nprint(\"Hello, World!\")\n\nPython לא דורשת הגדרת מחלקות או פונקציה ראשית כמו Java. פשוט כותבים את הקוד והוא רץ מלמעלה למטה." },
            { model: "Gemini 3.5", icon: "🔵", text: "print(\"Hello, World!\")\n\nב-Python 3, print היא פונקציה (עם סוגריים). זה כל מה שצריך כדי להתחיל - אין צורך בcompilation או הגדרות נוספות." }
        ],
        // Q2: RAG explained
        [
            { model: "GPT-5.6 Sol", icon: "🟢", text: "RAG (Retrieval Augmented Generation) = לתת ל-AI לחפש מידע רלוונטי לפני שהוא עונה.\n\nבמקום לסמוך רק על מה שהמודל 'זוכר' מהאימון, RAG מחפש במסמכים שלכם ומביא קטעים רלוונטיים כהקשר לתשובה." },
            { model: "Claude Opus 4.8", icon: "🟣", text: "תחשבו על RAG כמו תלמיד שמותר לו לפתוח את הספר במבחן.\n\nבמקום לענות מהזיכרון (שיכול לטעות), המודל קודם מחפש מידע רלוונטי במסמכים, ואז כותב תשובה מבוססת על מה שמצא. זה מפחית הזיות ומאפשר תשובות מעודכנות." },
            { model: "Gemini 3.5", icon: "🔵", text: "RAG משלב שני שלבים: 1) חיפוש - מוצא קטעי מסמכים רלוונטיים לשאלה. 2) יצירה - שולח את הקטעים + השאלה ל-LLM שמרכיב תשובה.\n\nזה כמו גוגל + ChatGPT ביחד: חיפוש ממוקד ואז עיבוד חכם של התוצאות." }
        ]
    ];

    section.querySelectorAll('.arena-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const qIdx = parseInt(btn.dataset.q);
            const results = document.getElementById('arenaResults');
            results.innerHTML = responses[qIdx].map(r => 
                '<div style="background:rgba(30,30,70,0.8);border-radius:15px;padding:1.2rem;border:1px solid rgba(108,92,231,0.2);">' +
                '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.8rem;">' +
                '<span style="font-size:1.5rem;">' + r.icon + '</span>' +
                '<strong style="color:white;">' + r.model + '</strong></div>' +
                '<p style="color:#b0b0c0;font-size:0.9rem;line-height:1.6;white-space:pre-wrap;">' + r.text + '</p></div>'
            ).join('');
            // Animate cards
            results.querySelectorAll('div > div').forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 200);
            });
        });
    });
})();

// ===== BACK TO TOP =====
(function() {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.textContent = '⬆';
    btn.style.cssText = 'position:fixed;bottom:5rem;left:2rem;width:40px;height:40px;border-radius:50%;background:rgba(108,92,231,0.8);color:white;border:none;font-size:1.2rem;cursor:pointer;opacity:0;transition:opacity 0.3s;z-index:100;';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        btn.style.opacity = window.scrollY > 500 ? '1' : '0';
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ===== FAVORITES =====
(function() {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    document.querySelectorAll('.guide-card').forEach((card, i) => {
        const favBtn = document.createElement('button');
        favBtn.className = 'fav-btn' + (favs.includes(i) ? ' active' : '');
        favBtn.textContent = favs.includes(i) ? '⭐' : '☆';
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = favs.indexOf(i);
            if (idx > -1) { favs.splice(idx, 1); favBtn.textContent = '☆'; favBtn.classList.remove('active'); }
            else { favs.push(i); favBtn.textContent = '⭐'; favBtn.classList.add('active'); }
            localStorage.setItem('favorites', JSON.stringify(favs));
        });
        card.style.position = 'relative';
        card.appendChild(favBtn);
    });
})();

// ===== PARALLAX SCROLL =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const header = document.querySelector('.main-header');
    if (header) header.style.backgroundPositionY = scrolled * 0.3 + 'px';
});

// ===== DAILY TIP =====
(function() {
    const tips = [
        "💡 טיפ: השתמשו ב-Chain of Thought (\"חשוב צעד אחר צעד\") לתשובות מדויקות יותר",
        "💡 טיפ: Temperature=0 נותן תשובות עקביות, Temperature=1 נותן יצירתיות",
        "💡 טיפ: RAG מפחית הזיות - תמיד תנו למודל מקורות מידע",
        "💡 טיפ: Few-shot (דוגמאות) עובד טוב יותר מהסבר ארוך",
        "💡 טיפ: מודלים קטנים (Llama, Phi) מספיקים ל-80% מהמשימות ועולים פחות",
        "💡 טיפ: Structured Output (JSON) מונע שגיאות parsing בפרודקשן",
        "💡 טיפ: System Prompt מגדיר את ה\"אישיות\" - השתמשו בו להתמחות",
        "💡 טיפ: Batch requests לAPI חוסך 50% עלות ב-OpenAI",
        "💡 טיפ: בדקו Perplexity לחיפוש - שילוב מושלם של חיפוש + AI",
        "💡 טיפ: MCP הוא הסטנדרט החדש לחיבור agents לכלים - למדו אותו"
    ];
    const tipIdx = new Date().getDate() % tips.length;
    const tipBar = document.createElement('div');
    tipBar.style.cssText = 'max-width:1400px;margin:0 auto 1rem;padding:0.8rem 2rem;background:rgba(253,203,110,0.1);border:1px solid rgba(253,203,110,0.3);border-radius:10px;text-align:center;color:#fdcb6e;font-size:0.9rem;';
    tipBar.textContent = tips[tipIdx];
    const progressContainer = document.querySelector('.progress-bar-container');
    if (progressContainer) progressContainer.parentNode.insertBefore(tipBar, progressContainer);
})();
