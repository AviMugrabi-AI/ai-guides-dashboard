// ===== MEGA FEATURES - Taking it to the MAX =====

// ===== CURSOR TRAIL EFFECT =====
(function() {
    const trail = [];
    const trailLength = 12;
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = 'position:fixed;width:' + (12 - i) + 'px;height:' + (12 - i) + 'px;border-radius:50%;pointer-events:none;z-index:9998;background:rgba(162,155,254,' + (0.6 - i * 0.05) + ');transition:transform 0.1s ease;';
        document.body.appendChild(dot);
        trail.push({ el: dot, x: 0, y: 0 });
    }
    document.addEventListener('mousemove', (e) => {
        trail[0].x = e.clientX;
        trail[0].y = e.clientY;
    });
    function animateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].x += (trail[i-1].x - trail[i].x) * 0.4;
            trail[i].y += (trail[i-1].y - trail[i].y) * 0.4;
        }
        trail.forEach(t => { t.el.style.transform = 'translate(' + t.x + 'px,' + t.y + 'px)'; });
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
})();

// ===== CONFETTI ON GUIDE COMPLETE =====
function launchConfetti() {
    const colors = ['#6c5ce7','#fd79a8','#00b894','#fdcb6e','#a29bfe','#e17055'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = 'position:fixed;width:8px;height:8px;background:' + colors[Math.floor(Math.random()*colors.length)] + ';top:50%;left:50%;z-index:9999;pointer-events:none;border-radius:' + (Math.random()>0.5?'50%':'0') + ';';
        document.body.appendChild(confetti);
        const angle = Math.random() * Math.PI * 2;
        const velocity = 300 + Math.random() * 400;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        let x = window.innerWidth/2, y = window.innerHeight/2, opacity = 1;
        function fall() {
            x += vx * 0.016; y += vy * 0.016 + 200 * 0.016; opacity -= 0.02;
            confetti.style.transform = 'translate(' + (x - window.innerWidth/2) + 'px,' + (y - window.innerHeight/2) + 'px) rotate(' + (x*2) + 'deg)';
            confetti.style.opacity = opacity;
            if (opacity > 0) requestAnimationFrame(fall);
            else confetti.remove();
        }
        setTimeout(fall, i * 20);
    }
}

// ===== GAMIFICATION SYSTEM =====
(function() {
    let xp = parseInt(localStorage.getItem('ai_xp') || '0');
    let level = Math.floor(xp / 100) + 1;
    const badges = JSON.parse(localStorage.getItem('ai_badges') || '[]');
    const levels = ['🌱 Beginner','⭐ Apprentice','🔥 Practitioner','💎 Expert','🏆 Master','👑 AI Legend'];

    // Create XP bar
    const xpBar = document.createElement('div');
    xpBar.id = 'xpBar';
    xpBar.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:4px;z-index:9000;background:rgba(108,92,231,0.2);';
    xpBar.innerHTML = '<div id="xpFill" style="height:100%;background:linear-gradient(90deg,#6c5ce7,#fd79a8);transition:width 0.5s;width:' + (xp%100) + '%;"></div>';
    document.body.appendChild(xpBar);

    // XP display
    const xpDisplay = document.createElement('div');
    xpDisplay.id = 'xpDisplay';
    xpDisplay.style.cssText = 'position:fixed;top:8px;right:70px;z-index:9000;color:#a29bfe;font-size:0.75rem;font-family:Heebo,sans-serif;background:rgba(20,20,50,0.9);padding:4px 12px;border-radius:15px;border:1px solid rgba(108,92,231,0.3);';
    xpDisplay.textContent = levels[Math.min(level-1,5)] + ' | XP: ' + xp + ' | Level ' + level;
    document.body.appendChild(xpDisplay);

    function addXP(amount) {
        xp += amount;
        level = Math.floor(xp / 100) + 1;
        localStorage.setItem('ai_xp', xp);
        document.getElementById('xpFill').style.width = (xp % 100) + '%';
        xpDisplay.textContent = levels[Math.min(level-1,5)] + ' | XP: ' + xp + ' | Level ' + level;
        // Level up animation
        if (xp % 100 < amount) {
            launchConfetti();
            showNotification('🎉 Level Up! הגעת לרמה ' + level + ' - ' + levels[Math.min(level-1,5)]);
        }
    }

    // Award XP for reading guides
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.dataset.xpAwarded) {
                btn.dataset.xpAwarded = 'true';
                addXP(10);
                showNotification('+10 XP! 📖');
            }
        });
    });

    // Award XP for quiz
    window.addQuizXP = function() { addXP(25); };
    window.addXP = addXP;
})();

// ===== NOTIFICATION SYSTEM =====
function showNotification(msg) {
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);background:rgba(108,92,231,0.95);color:white;padding:0.8rem 2rem;border-radius:30px;z-index:9999;font-family:Heebo,sans-serif;font-size:0.95rem;animation:notifIn 0.3s ease;box-shadow:0 10px 30px rgba(108,92,231,0.4);';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => { notif.style.opacity = '0'; notif.style.transition = 'opacity 0.5s'; }, 2000);
    setTimeout(() => notif.remove(), 2500);
}
const notifStyle = document.createElement('style');
notifStyle.textContent = '@keyframes notifIn{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
document.head.appendChild(notifStyle);

// ===== SLOT MACHINE - RANDOM TERM LEARNER =====
(function() {
    const slotSection = document.createElement('div');
    slotSection.style.cssText = 'max-width:1400px;margin:1rem auto;padding:0 2rem;';
    slotSection.innerHTML = '<div style="background:linear-gradient(135deg,rgba(253,121,168,0.1),rgba(108,92,231,0.1));border:1px solid rgba(253,121,168,0.3);border-radius:20px;padding:1.5rem;text-align:center;">' +
        '<h3 style="color:#fd79a8;margin-bottom:1rem;font-size:1.2rem;">🎰 מונח אקראי - לחץ וגלה!</h3>' +
        '<div id="slotDisplay" style="font-size:1.5rem;color:white;min-height:60px;display:flex;align-items:center;justify-content:center;margin-bottom:0.5rem;transition:all 0.3s;">' +
        '<span style="color:#888;">לחץ על הכפתור...</span></div>' +
        '<div id="slotDef" style="color:#b0b0c0;font-size:1rem;min-height:30px;margin-bottom:1rem;"></div>' +
        '<button id="slotBtn" class="quiz-btn" style="background:linear-gradient(135deg,#fd79a8,#6c5ce7);">🎰 סובב!</button></div>';
    
    const dashboard = document.querySelector('.dashboard');
    const firstSection = dashboard.querySelector('.progress-bar-container') || dashboard.querySelector('.guide-section');
    if (firstSection) dashboard.insertBefore(slotSection, firstSection);

    const allTerms = typeof glossaryData !== 'undefined' ? glossaryData : [];
    const extraTerms = typeof extraGlossary !== 'undefined' ? extraGlossary : [];
    const combinedTerms = [...allTerms, ...extraTerms];

    document.getElementById('slotBtn').addEventListener('click', () => {
        const display = document.getElementById('slotDisplay');
        const defEl = document.getElementById('slotDef');
        let count = 0;
        const interval = setInterval(() => {
            const random = combinedTerms[Math.floor(Math.random() * combinedTerms.length)];
            display.textContent = random.term;
            display.style.transform = 'scale(1.1)';
            setTimeout(() => display.style.transform = 'scale(1)', 50);
            count++;
            if (count > 15) {
                clearInterval(interval);
                const final = combinedTerms[Math.floor(Math.random() * combinedTerms.length)];
                display.textContent = '✨ ' + final.term + ' ✨';
                display.style.color = '#fdcb6e';
                defEl.textContent = final.def;
                setTimeout(() => display.style.color = 'white', 1000);
                if (typeof addXP === 'function') addXP(5);
            }
        }, 80);
    });
})();

// ===== AI COST CALCULATOR =====
(function() {
    const calcSection = document.createElement('section');
    calcSection.className = 'guide-section';
    calcSection.id = 'calculator';
    calcSection.innerHTML = '<h2 class="section-title">🧮 מחשבון עלויות AI</h2>' +
        '<div style="background:rgba(20,20,50,0.9);border-radius:20px;padding:2rem;border:1px solid rgba(0,184,148,0.3);">' +
        '<p style="color:#b0b0c0;margin-bottom:1.5rem;text-align:center;">חשב כמה יעלה לך להשתמש במודל AI לפרויקט שלך</p>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem;">' +
        '<div><label style="color:#a29bfe;font-size:0.85rem;">מודל</label><select id="calcModel" style="width:100%;padding:0.6rem;background:rgba(40,40,80,0.8);color:white;border:1px solid rgba(108,92,231,0.3);border-radius:8px;font-family:Heebo;">' +
        '<option value="5,30">GPT-5.6 Sol ($5/$30)</option><option value="2.5,15">GPT-5.6 Terra ($2.5/$15)</option><option value="1,6">GPT-5.6 Luna ($1/$6)</option>' +
        '<option value="5,25">Claude Opus 4.8 ($5/$25)</option><option value="10,50">Claude Fable 5 ($10/$50)</option>' +
        '<option value="3.5,10.5">Gemini 3.5 Pro ($3.5/$10.5)</option><option value="0.5,2">DeepSeek V4 ($0.5/$2)</option>' +
        '<option value="0,0">Nemotron 3 Ultra (חינם)</option></select></div>' +
        '<div><label style="color:#a29bfe;font-size:0.85rem;">שאילתות ליום</label><input id="calcQueries" type="number" value="100" style="width:100%;padding:0.6rem;background:rgba(40,40,80,0.8);color:white;border:1px solid rgba(108,92,231,0.3);border-radius:8px;"></div>' +
        '<div><label style="color:#a29bfe;font-size:0.85rem;">ממוצע input tokens</label><input id="calcInput" type="number" value="500" style="width:100%;padding:0.6rem;background:rgba(40,40,80,0.8);color:white;border:1px solid rgba(108,92,231,0.3);border-radius:8px;"></div>' +
        '<div><label style="color:#a29bfe;font-size:0.85rem;">ממוצע output tokens</label><input id="calcOutput" type="number" value="300" style="width:100%;padding:0.6rem;background:rgba(40,40,80,0.8);color:white;border:1px solid rgba(108,92,231,0.3);border-radius:8px;"></div>' +
        '</div>' +
        '<button id="calcBtn" class="quiz-btn" style="background:#00b894;">חשב עלות 💰</button>' +
        '<div id="calcResult" style="margin-top:1.5rem;padding:1.5rem;background:rgba(0,184,148,0.1);border-radius:15px;border:1px solid rgba(0,184,148,0.3);display:none;">' +
        '</div></div>';

    const arena = document.getElementById('arena');
    if (arena) arena.parentNode.insertBefore(calcSection, arena.nextSibling);

    document.getElementById('calcBtn').addEventListener('click', () => {
        const prices = document.getElementById('calcModel').value.split(',');
        const inputPrice = parseFloat(prices[0]);
        const outputPrice = parseFloat(prices[1]);
        const queries = parseInt(document.getElementById('calcQueries').value);
        const inputTokens = parseInt(document.getElementById('calcInput').value);
        const outputTokens = parseInt(document.getElementById('calcOutput').value);

        const dailyInput = (queries * inputTokens / 1000000) * inputPrice;
        const dailyOutput = (queries * outputTokens / 1000000) * outputPrice;
        const daily = dailyInput + dailyOutput;
        const monthly = daily * 30;
        const yearly = daily * 365;

        const result = document.getElementById('calcResult');
        result.style.display = 'block';
        result.innerHTML = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center;">' +
            '<div><div style="font-size:1.8rem;color:#00b894;font-weight:700;">$' + daily.toFixed(2) + '</div><div style="color:#888;font-size:0.85rem;">ליום</div></div>' +
            '<div><div style="font-size:1.8rem;color:#fdcb6e;font-weight:700;">$' + monthly.toFixed(0) + '</div><div style="color:#888;font-size:0.85rem;">לחודש</div></div>' +
            '<div><div style="font-size:1.8rem;color:#fd79a8;font-weight:700;">$' + yearly.toFixed(0) + '</div><div style="color:#888;font-size:0.85rem;">לשנה</div></div>' +
            '</div><p style="color:#888;font-size:0.8rem;text-align:center;margin-top:1rem;">' +
            'סה"כ טוקנים ליום: ' + (queries*inputTokens).toLocaleString() + ' input + ' + (queries*outputTokens).toLocaleString() + ' output</p>';
    });
})();

// ===== SPEED QUIZ WITH TIMER =====
(function() {
    const speedBtn = document.createElement('button');
    speedBtn.textContent = '⚡ Speed Quiz';
    speedBtn.className = 'quiz-btn';
    speedBtn.style.cssText = 'position:fixed;bottom:6rem;right:2rem;z-index:150;background:linear-gradient(135deg,#e17055,#fdcb6e);box-shadow:0 5px 20px rgba(225,112,85,0.4);';
    document.body.appendChild(speedBtn);

    const speedQuestions = [
        {q:"Transformer הומצא בשנת:",a:"2017",opts:["2015","2017","2019","2022"]},
        {q:"GPT ראשי תיבות של:",a:"Generative Pre-trained Transformer",opts:["General Purpose Technology","Generative Pre-trained Transformer","Google Processing Tool","Gradient Propagation Technique"]},
        {q:"כמה פרמטרים ל-Grok 4.5?",a:"1.5 טריליון",opts:["70 מיליארד","550 מיליארד","1.5 טריליון","7 טריליון"]},
        {q:"מי פיתח AlphaFold?",a:"DeepMind",opts:["OpenAI","DeepMind","Meta","Anthropic"]},
        {q:"Temperature=0 נותן תשובות:",a:"מדויקות ועקביות",opts:["מדויקות ועקביות","יצירתיות","ארוכות","מהירות"]},
        {q:"RAG קיצור של:",a:"Retrieval Augmented Generation",opts:["Random Automated Generator","Retrieval Augmented Generation","Real AI Guidance","Recursive Algorithm Grid"]},
        {q:"NVIDIA H100 עולה בערך:",a:"$25,000-40,000",opts:["$5,000","$25,000-40,000","$100,000","$500,000"]},
        {q:"Claude Fable 5 של:",a:"Anthropic",opts:["OpenAI","Google","Anthropic","Meta"]},
        {q:"מה DSpark עושה?",a:"מאיץ inference ב-85%",opts:["מאמן מודלים","מאיץ inference ב-85%","יוצר תמונות","מתרגם שפות"]},
        {q:"MCP קיצור של:",a:"Model Context Protocol",opts:["Machine Computing Power","Model Context Protocol","Meta Cloud Platform","Multiple Core Processing"]}
    ];

    speedBtn.addEventListener('click', () => {
        let score = 0, current = 0, timeLeft = 30;
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;';
        modal.innerHTML = '<div style="background:rgba(30,30,60,0.98);border:2px solid #e17055;border-radius:20px;padding:2.5rem;max-width:500px;width:90%;text-align:center;font-family:Heebo,sans-serif;">' +
            '<div id="speedTimer" style="font-size:2.5rem;color:#e17055;font-weight:900;margin-bottom:1rem;">30</div>' +
            '<div id="speedQ" style="font-size:1.2rem;color:white;margin-bottom:1.5rem;"></div>' +
            '<div id="speedOpts" style="display:flex;flex-direction:column;gap:0.6rem;"></div>' +
            '<div id="speedScore" style="color:#fdcb6e;margin-top:1rem;"></div></div>';
        document.body.appendChild(modal);

        const timer = setInterval(() => {
            timeLeft--;
            document.getElementById('speedTimer').textContent = timeLeft;
            if (timeLeft <= 5) document.getElementById('speedTimer').style.color = '#ff0000';
            if (timeLeft <= 0) { clearInterval(timer); endSpeedQuiz(); }
        }, 1000);

        function showQ() {
            if (current >= speedQuestions.length) { clearInterval(timer); endSpeedQuiz(); return; }
            const q = speedQuestions[current];
            document.getElementById('speedQ').textContent = q.q;
            document.getElementById('speedOpts').innerHTML = q.opts.map(o => 
                '<button style="padding:0.7rem;background:rgba(108,92,231,0.2);border:1px solid rgba(108,92,231,0.4);border-radius:10px;color:white;cursor:pointer;font-family:Heebo;font-size:0.95rem;" data-ans="' + o + '">' + o + '</button>'
            ).join('');
            document.querySelectorAll('#speedOpts button').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.dataset.ans === q.a) { score++; btn.style.background = 'rgba(0,184,148,0.4)'; }
                    else { btn.style.background = 'rgba(225,112,85,0.4)'; }
                    current++;
                    setTimeout(showQ, 300);
                });
            });
            document.getElementById('speedScore').textContent = 'ניקוד: ' + score + '/' + current;
        }

        function endSpeedQuiz() {
            modal.querySelector('div').innerHTML = '<h2 style="color:#fdcb6e;font-size:2rem;">⚡ סיום!</h2>' +
                '<p style="color:white;font-size:1.5rem;margin:1rem 0;">' + score + '/' + speedQuestions.length + '</p>' +
                '<p style="color:#888;">' + (score >= 8 ? '🏆 מדהים!' : score >= 5 ? '👍 לא רע!' : '📚 יש מה ללמוד!') + '</p>' +
                '<button onclick="this.closest(\'div\').parentElement.remove()" class="quiz-btn" style="margin-top:1rem;">סגור</button>';
            if (typeof addXP === 'function') addXP(score * 5);
        }
        showQ();
        modal.addEventListener('click', (e) => { if (e.target === modal) { clearInterval(timer); modal.remove(); } });
    });
})();

// ===== AI EVENT COUNTDOWN =====
(function() {
    const events = [
        { name: "EU AI Act High-Risk חל", date: new Date("2026-08-02"), emoji: "⚖️" },
        { name: "GPT-5.6 שחרור ציבורי (צפוי)", date: new Date("2026-09-01"), emoji: "🟢" },
        { name: "NVIDIA GTC 2027", date: new Date("2027-03-17"), emoji: "🟢" }
    ];

    const countdownDiv = document.createElement('div');
    countdownDiv.style.cssText = 'max-width:1400px;margin:0 auto 1rem;padding:0 2rem;';
    let html = '<div style="display:flex;gap:1rem;overflow-x:auto;padding:0.5rem 0;">';
    events.forEach(ev => {
        const diff = Math.ceil((ev.date - new Date()) / (1000*60*60*24));
        if (diff > 0) {
            html += '<div style="min-width:200px;background:rgba(116,185,255,0.1);border:1px solid rgba(116,185,255,0.3);border-radius:12px;padding:0.8rem 1.2rem;text-align:center;">' +
                '<div style="font-size:0.8rem;color:#74b9ff;">' + ev.emoji + ' ' + ev.name + '</div>' +
                '<div style="font-size:1.5rem;color:white;font-weight:700;">' + diff + ' ימים</div></div>';
        }
    });
    html += '</div>';
    countdownDiv.innerHTML = html;

    const tipBar = document.querySelector('[style*="fdcb6e"]');
    if (tipBar) tipBar.parentNode.insertBefore(countdownDiv, tipBar.nextSibling);
})();

// ===== CARD FLIP EFFECT =====
document.querySelectorAll('.guide-card').forEach(card => {
    card.addEventListener('dblclick', () => {
        card.style.transition = 'transform 0.6s';
        card.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            card.style.transform = 'rotateY(360deg)';
            setTimeout(() => card.style.transform = '', 600);
        }, 600);
        if (typeof addXP === 'function') addXP(2);
    });
});

// ===== TEXT-TO-SPEECH - READ ALOUD =====
(function() {
    if (!('speechSynthesis' in window)) return;
    document.querySelectorAll('.expanded-content').forEach(content => {
        const ttsBtn = document.createElement('button');
        ttsBtn.textContent = '🔊 הקרא לי';
        ttsBtn.style.cssText = 'margin-top:1rem;padding:0.4rem 1rem;background:rgba(108,92,231,0.2);border:1px solid rgba(108,92,231,0.4);border-radius:15px;color:#a29bfe;cursor:pointer;font-family:Heebo;font-size:0.8rem;';
        ttsBtn.addEventListener('click', () => {
            if (speechSynthesis.speaking) { speechSynthesis.cancel(); ttsBtn.textContent = '🔊 הקרא לי'; return; }
            const text = content.textContent.replace(/קרא עוד|סגור/g, '');
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'he-IL';
            utterance.rate = 0.9;
            utterance.onend = () => { ttsBtn.textContent = '🔊 הקרא לי'; };
            speechSynthesis.speak(utterance);
            ttsBtn.textContent = '⏹️ עצור';
        });
        content.appendChild(ttsBtn);
    });
})();

// ===== ANIMATED GRADIENT MESH BACKGROUND =====
(function() {
    const meshStyle = document.createElement('style');
    meshStyle.textContent = 'body::after{content:"";position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;background:radial-gradient(ellipse at 20% 50%,rgba(108,92,231,0.08) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(253,121,168,0.06) 0%,transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(0,184,148,0.05) 0%,transparent 50%);animation:meshMove 20s ease-in-out infinite;}@keyframes meshMove{0%,100%{background-position:0% 0%,100% 0%,50% 100%}50%{background-position:100% 100%,0% 100%,50% 0%}}';
    document.head.appendChild(meshStyle);
})();

// ===== CAREER PATH BUILDER =====
(function() {
    const careerSection = document.createElement('section');
    careerSection.className = 'guide-section';
    careerSection.id = 'career';
    careerSection.innerHTML = '<h2 class="section-title">🛤️ AI Career Path - מסלול הקריירה שלך</h2>' +
        '<div style="background:rgba(20,20,50,0.9);border-radius:20px;padding:2rem;border:1px solid rgba(253,203,110,0.3);text-align:center;">' +
        '<p style="color:#b0b0c0;margin-bottom:1.5rem;">בחר מי אתה וקבל מסלול למידה מותאם אישית:</p>' +
        '<div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.5rem;">' +
        '<button class="career-btn quiz-btn" data-role="beginner" style="background:#00b894;">🌱 מתחיל לגמרי</button>' +
        '<button class="career-btn quiz-btn" data-role="dev" style="background:#6c5ce7;">💻 מפתח/ת</button>' +
        '<button class="career-btn quiz-btn" data-role="manager" style="background:#e17055;">📊 מנהל/ת מוצר</button>' +
        '<button class="career-btn quiz-btn" data-role="business" style="background:#fdcb6e;color:#333;">💼 עסקים</button>' +
        '</div><div id="careerResult" style="text-align:right;"></div></div>';

    const calculator = document.getElementById('calculator');
    if (calculator) calculator.parentNode.insertBefore(careerSection, calculator.nextSibling);

    const paths = {
        beginner: {title:'🌱 מסלול מתחיל - מ-0 ל-AI Literate',steps:['1. מושגי יסוד: מה זה AI, Data, אלגוריתמים','2. NLP: מה זה LLM, איך ChatGPT עובד','3. Prompt Engineering: איך לדבר עם AI','4. AI גנרטיבי: תמונות, טקסט, וידאו','5. אתיקה: בטיחות, פרטיות, הטיות','6. כלים: נסה ChatGPT, Claude, Midjourney','🎯 יעד: להשתמש ב-AI ביומיום בצורה מושכלת']},
        dev: {title:'💻 מסלול מפתח - Full Stack AI Engineer',steps:['1. למידה עמוקה: Neural Networks, Transformers, Attention','2. LLM APIs: OpenAI, Anthropic, שימוש בפרודקשן','3. RAG: Vector DBs, Embeddings, LangChain','4. AI Agents: Tool Calling, MCP, Orchestration','5. MLOps: Deployment, Monitoring, Testing','6. Fine-tuning: LoRA, QLoRA, RLHF','7. ארכיטקטורות: MoE, Flash Attention, Tokenizers','🎯 יעד: לבנות ולפרוס אפליקציות AI בפרודקשן']},
        manager: {title:'📊 מסלול מנהל מוצר AI',steps:['1. מושגי יסוד: הבנת מה AI יכול ולא יכול','2. AI Product Management: אתגרים ייחודיים','3. AI Strategy: זיהוי הזדמנויות, Build vs Buy','4. AI UX: עיצוב חוויות AI, Graceful Degradation','5. מדדים: Evaluation, Benchmarks, A/B Testing','6. אתיקה: Responsible AI, Governance, Compliance','7. שוק: חברות, מודלים, תמחור, תחרות','🎯 יעד: להוביל מוצר AI מ-0 ל-Product Market Fit']},
        business: {title:'💼 מסלול עסקי - AI לארגונים',steps:['1. AI Strategy: מתי ואיפה AI מתאים','2. ROI: חישוב עלות מול תועלת','3. AI & Marketing: personalization, content','4. AI & Sales: lead scoring, forecasting','5. AI & Customer Service: chatbots, automation','6. Build vs Buy: בחירת פתרונות','7. Governance: מדיניות, סיכונים, compliance','🎯 יעד: להטמיע AI בארגון עם ROI מוכח']}
    };

    careerSection.querySelectorAll('.career-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const path = paths[btn.dataset.role];
            document.getElementById('careerResult').innerHTML = '<h3 style="color:#fdcb6e;margin-bottom:1rem;">' + path.title + '</h3>' +
                '<div style="background:rgba(253,203,110,0.05);border-radius:10px;padding:1rem;">' +
                path.steps.map(s => '<p style="color:#c0c0d0;margin-bottom:0.6rem;padding:0.4rem 0;border-bottom:1px solid rgba(253,203,110,0.1);">' + s + '</p>').join('') + '</div>';
            if (typeof addXP === 'function') addXP(5);
        });
    });
})();

// ===== KEYBOARD SHORTCUTS LEGEND =====
(function() {
    const legend = document.createElement('div');
    legend.id = 'kbLegend';
    legend.style.cssText = 'display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,50,0.98);border:2px solid var(--primary);border-radius:20px;padding:2rem;z-index:10000;min-width:350px;font-family:Heebo,sans-serif;';
    legend.innerHTML = '<h3 style="color:#a29bfe;margin-bottom:1rem;text-align:center;">⌨️ קיצורי מקלדת</h3>' +
        '<div style="color:#c0c0d0;font-size:0.9rem;">' +
        '<p><kbd style="background:#333;padding:2px 6px;border-radius:4px;">/</kbd> - חיפוש</p>' +
        '<p><kbd style="background:#333;padding:2px 6px;border-radius:4px;">Esc</kbd> - סגירת חלונות</p>' +
        '<p><kbd style="background:#333;padding:2px 6px;border-radius:4px;">?</kbd> - קיצורי מקלדת (זה!)</p>' +
        '<p><kbd style="background:#333;padding:2px 6px;border-radius:4px;">G</kbd> - מילון מונחים</p>' +
        '<p><kbd style="background:#333;padding:2px 6px;border-radius:4px;">R</kbd> - מדריך אקראי</p>' +
        '<p><kbd style="background:#333;padding:2px 6px;border-radius:4px;">T</kbd> - מצב בהיר/כהה</p>' +
        '<p><kbd style="background:#333;padding:2px 6px;border-radius:4px;">Double-click</kbd> - הפוך כרטיס</p>' +
        '</div><button onclick="document.getElementById(\'kbLegend\').style.display=\'none\'" class="quiz-btn" style="margin-top:1rem;width:100%;">סגור</button>';
    document.body.appendChild(legend);

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === '?') legend.style.display = legend.style.display === 'none' ? 'block' : 'none';
        if (e.key === 'g' || e.key === 'G') document.getElementById('glossaryToggle').click();
        if (e.key === 'r' || e.key === 'R') document.getElementById('randomBtn').click();
        if (e.key === 't' || e.key === 'T') document.getElementById('themeToggle').click();
    });
})();
