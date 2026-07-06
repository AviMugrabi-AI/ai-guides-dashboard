// ===== EXTRAS v2.1 - More interactive features =====

// ===== AI COMPARISON TOOL =====
(function() {
    const section = document.createElement('section');
    section.className = 'guide-section';
    section.id = 'compare';
    section.innerHTML = '<h2 class="section-title">⚖️ השוואת מודלים אינטראקטיבית</h2>' +
        '<div style="background:rgba(20,20,50,0.9);border-radius:20px;padding:2rem;border:1px solid rgba(108,92,231,0.3);">' +
        '<p style="color:#b0b0c0;margin-bottom:1rem;text-align:center;">בחר שני מודלים והשווה ביניהם</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">' +
        '<select id="model1" style="padding:0.8rem;background:rgba(40,40,80,0.8);color:white;border:1px solid rgba(108,92,231,0.3);border-radius:10px;font-family:Heebo;font-size:0.9rem;">' +
        '<option value="gpt56sol">GPT-5.6 Sol</option><option value="claude_fable">Claude Fable 5</option><option value="gemini35">Gemini 3.5 Pro</option>' +
        '<option value="grok45">Grok 4.5</option><option value="deepseek">DeepSeek V4</option><option value="nemotron">Nemotron 3 Ultra</option></select>' +
        '<select id="model2" style="padding:0.8rem;background:rgba(40,40,80,0.8);color:white;border:1px solid rgba(108,92,231,0.3);border-radius:10px;font-family:Heebo;font-size:0.9rem;">' +
        '<option value="claude_fable">Claude Fable 5</option><option value="gpt56sol">GPT-5.6 Sol</option><option value="gemini35">Gemini 3.5 Pro</option>' +
        '<option value="grok45">Grok 4.5</option><option value="deepseek">DeepSeek V4</option><option value="nemotron">Nemotron 3 Ultra</option></select></div>' +
        '<button id="compareBtn" class="quiz-btn">השווה! ⚡</button>' +
        '<div id="compareResult" style="margin-top:1.5rem;"></div></div>';

    const leaderboard = document.getElementById('leaderboard');
    if (leaderboard) leaderboard.parentNode.insertBefore(section, leaderboard);

    const modelData = {
        gpt56sol: { name:"GPT-5.6 Sol", company:"OpenAI", params:"N/A (est. 2T+)", context:"200K", price:"$5/$30", coding:96, reasoning:97, creative:94, speed:70, value:60, access:"מוגבל (20 שותפים)" },
        claude_fable: { name:"Claude Fable 5", company:"Anthropic", params:"N/A", context:"1M", price:"$10/$50", coding:95, reasoning:94, creative:92, speed:75, value:55, access:"ציבורי (עם guardrails)" },
        gemini35: { name:"Gemini 3.5 Pro", company:"Google", params:"N/A", context:"2M", price:"$3.50/$10.50", coding:89, reasoning:91, creative:90, speed:85, value:85, access:"ציבורי" },
        grok45: { name:"Grok 4.5", company:"xAI", params:"1.5T", context:"256K", price:"N/A", coding:91, reasoning:93, creative:88, speed:72, value:50, access:"בטא פרטית (Tesla/SpaceX)" },
        deepseek: { name:"DeepSeek V4 Pro", company:"DeepSeek", params:"N/A (MoE)", context:"128K", price:"$0.50/$2", coding:88, reasoning:87, creative:82, speed:95, value:98, access:"ציבורי" },
        nemotron: { name:"Nemotron 3 Ultra", company:"NVIDIA", params:"550B", context:"128K", price:"חינם!", coding:86, reasoning:85, creative:80, speed:70, value:100, access:"קוד פתוח מלא" }
    };

    document.getElementById('compareBtn').addEventListener('click', () => {
        const m1 = modelData[document.getElementById('model1').value];
        const m2 = modelData[document.getElementById('model2').value];
        
        function bar(val, color) {
            return '<div style="background:rgba(255,255,255,0.1);border-radius:5px;height:20px;overflow:hidden;flex:1;"><div style="height:100%;width:'+val+'%;background:'+color+';border-radius:5px;transition:width 0.5s;"></div></div>';
        }

        const metrics = [
            {label:"קידוד", k:"coding"},
            {label:"חשיבה", k:"reasoning"},
            {label:"יצירתיות", k:"creative"},
            {label:"מהירות", k:"speed"},
            {label:"תמורה למחיר", k:"value"}
        ];

        let html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">';
        html += '<div style="text-align:center;padding:1rem;background:rgba(108,92,231,0.1);border-radius:15px;"><h3 style="color:#a29bfe;margin-bottom:0.5rem;">'+m1.name+'</h3><p style="color:#888;font-size:0.8rem;">'+m1.company+' | '+m1.price+'</p><p style="color:#666;font-size:0.75rem;">Context: '+m1.context+' | '+m1.access+'</p></div>';
        html += '<div style="text-align:center;padding:1rem;background:rgba(253,121,168,0.1);border-radius:15px;"><h3 style="color:#fd79a8;margin-bottom:0.5rem;">'+m2.name+'</h3><p style="color:#888;font-size:0.8rem;">'+m2.company+' | '+m2.price+'</p><p style="color:#666;font-size:0.75rem;">Context: '+m2.context+' | '+m2.access+'</p></div>';
        html += '</div>';

        html += '<div style="display:flex;flex-direction:column;gap:0.8rem;">';
        metrics.forEach(m => {
            const winner = m1[m.k] > m2[m.k] ? 1 : m1[m.k] < m2[m.k] ? 2 : 0;
            html += '<div style="display:flex;align-items:center;gap:0.5rem;">';
            html += '<span style="min-width:50px;color:'+(winner===1?'#a29bfe':'#888')+';font-size:0.85rem;font-weight:'+(winner===1?'700':'400')+';">'+m1[m.k]+'</span>';
            html += bar(m1[m.k], '#a29bfe');
            html += '<span style="min-width:70px;text-align:center;color:#ccc;font-size:0.8rem;">'+m.label+'</span>';
            html += bar(m2[m.k], '#fd79a8');
            html += '<span style="min-width:50px;text-align:left;color:'+(winner===2?'#fd79a8':'#888')+';font-size:0.85rem;font-weight:'+(winner===2?'700':'400')+';">'+m2[m.k]+'</span>';
            html += '</div>';
        });
        html += '</div>';

        // Verdict
        const score1 = metrics.reduce((s,m) => s + m1[m.k], 0);
        const score2 = metrics.reduce((s,m) => s + m2[m.k], 0);
        const winner = score1 > score2 ? m1.name : score2 > score1 ? m2.name : 'תיקו!';
        const winColor = score1 > score2 ? '#a29bfe' : '#fd79a8';
        html += '<div style="text-align:center;margin-top:1.5rem;padding:1rem;background:rgba(253,203,110,0.1);border-radius:10px;"><span style="color:#fdcb6e;font-size:1.1rem;">🏆 מנצח כללי: </span><strong style="color:'+winColor+';font-size:1.2rem;">'+winner+'</strong><span style="color:#888;font-size:0.8rem;"> ('+score1+' vs '+score2+')</span></div>';

        document.getElementById('compareResult').innerHTML = html;
    });
})();


// ===== STUDY STREAK TRACKER =====
(function() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    let streak = parseInt(localStorage.getItem('streak') || '0');
    
    if (lastVisit !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastVisit === yesterday) {
            streak++;
        } else if (lastVisit) {
            streak = 1; // reset
        } else {
            streak = 1; // first visit
        }
        localStorage.setItem('streak', streak);
        localStorage.setItem('lastVisit', today);
    }

    const streakDiv = document.createElement('div');
    streakDiv.style.cssText = 'position:fixed;top:8px;left:130px;z-index:9000;color:#fdcb6e;font-size:0.75rem;font-family:Heebo,sans-serif;background:rgba(20,20,50,0.9);padding:4px 12px;border-radius:15px;border:1px solid rgba(253,203,110,0.3);';
    streakDiv.textContent = '🔥 ' + streak + ' ימים רצוף';
    document.body.appendChild(streakDiv);

    if (streak >= 7) showNotification('🔥 שבוע שלם של למידה! מדהים!');
})();

// ===== READING TIME ESTIMATOR =====
(function() {
    document.querySelectorAll('.guide-card').forEach(card => {
        const expandedContent = card.querySelector('.expanded-content');
        if (!expandedContent) return;
        const wordCount = expandedContent.textContent.split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 150)); // 150 words/min for Hebrew
        const badge = document.createElement('span');
        badge.style.cssText = 'position:absolute;top:12px;left:40px;font-size:0.65rem;color:#888;background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:8px;';
        badge.textContent = '⏱️ ' + minutes + ' דק\'';
        card.appendChild(badge);
    });
})();

// ===== SMART SEARCH SUGGESTIONS =====
(function() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const suggestions = ['transformer','gpt','neural network','attention','rag','agent','prompt','fine-tuning',
        'embedding','tokenizer','diffusion','reinforcement','cnn','llm','bias','hallucination',
        'deepseek','claude','gemini','benchmark','training','inference','gpu','mlops'];

    const sugBox = document.createElement('div');
    sugBox.style.cssText = 'display:none;position:absolute;top:100%;left:0;right:0;background:rgba(30,30,60,0.98);border:1px solid rgba(108,92,231,0.3);border-radius:0 0 15px 15px;max-height:200px;overflow-y:auto;z-index:50;';
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(sugBox);

    searchInput.addEventListener('input', () => {
        const val = searchInput.value.toLowerCase().trim();
        if (val.length < 2) { sugBox.style.display = 'none'; return; }
        const matches = suggestions.filter(s => s.includes(val)).slice(0, 5);
        if (matches.length === 0) { sugBox.style.display = 'none'; return; }
        sugBox.style.display = 'block';
        sugBox.innerHTML = matches.map(m => 
            '<div style="padding:0.5rem 1rem;color:#c0c0d0;cursor:pointer;border-bottom:1px solid rgba(108,92,231,0.1);font-size:0.9rem;" onmouseover="this.style.background=\'rgba(108,92,231,0.2)\'" onmouseout="this.style.background=\'none\'">' + m + '</div>'
        ).join('');
        sugBox.querySelectorAll('div').forEach(div => {
            div.addEventListener('click', () => {
                searchInput.value = div.textContent;
                sugBox.style.display = 'none';
                searchInput.dispatchEvent(new Event('input'));
            });
        });
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.parentElement.contains(e.target)) sugBox.style.display = 'none';
    });
})();

// ===== BOOKMARKS / CONTINUE READING =====
(function() {
    const lastRead = localStorage.getItem('lastReadCard');
    if (lastRead) {
        const continueDiv = document.createElement('div');
        continueDiv.style.cssText = 'max-width:1400px;margin:0.5rem auto;padding:0 2rem;';
        continueDiv.innerHTML = '<div style="background:rgba(0,184,148,0.1);border:1px solid rgba(0,184,148,0.3);border-radius:12px;padding:0.7rem 1.2rem;display:flex;align-items:center;gap:0.8rem;cursor:pointer;" id="continueReading">' +
            '<span style="font-size:1.2rem;">📖</span><span style="color:#00b894;font-size:0.9rem;">המשך לקרוא: <strong>' + lastRead + '</strong></span></div>';
        const dashboard = document.querySelector('.dashboard');
        if (dashboard && dashboard.firstChild) dashboard.insertBefore(continueDiv, dashboard.firstChild.nextSibling);
        
        document.getElementById('continueReading').addEventListener('click', () => {
            const cards = document.querySelectorAll('.guide-card');
            cards.forEach(card => {
                if (card.querySelector('h3') && card.querySelector('h3').textContent.includes(lastRead)) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.boxShadow = '0 0 30px rgba(0,184,148,0.5)';
                    setTimeout(() => card.style.boxShadow = '', 2000);
                }
            });
        });
    }

    // Track last read
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.closest('.guide-card').querySelector('h3').textContent;
            localStorage.setItem('lastReadCard', title);
        });
    });
})();

// ===== FOCUS MODE =====
(function() {
    const focusBtn = document.createElement('button');
    focusBtn.textContent = '🎯 מצב מיקוד';
    focusBtn.style.cssText = 'position:fixed;bottom:6rem;left:2rem;padding:0.5rem 1rem;background:rgba(0,184,148,0.8);color:white;border:none;border-radius:25px;cursor:pointer;font-family:Heebo;font-size:0.8rem;z-index:150;box-shadow:0 3px 15px rgba(0,184,148,0.3);';
    document.body.appendChild(focusBtn);

    let focusMode = false;
    focusBtn.addEventListener('click', () => {
        focusMode = !focusMode;
        document.body.classList.toggle('focus-mode', focusMode);
        focusBtn.textContent = focusMode ? '✕ צא ממיקוד' : '🎯 מצב מיקוד';
        focusBtn.style.background = focusMode ? 'rgba(225,112,85,0.8)' : 'rgba(0,184,148,0.8)';
        if (focusMode) showNotification('🎯 מצב מיקוד - רק התוכן, בלי הסחות');
    });
})();

// ===== PRINT / EXPORT GUIDE =====
(function() {
    document.querySelectorAll('.expanded-content').forEach(content => {
        const printBtn = document.createElement('button');
        printBtn.textContent = '🖨️ הדפס';
        printBtn.style.cssText = 'margin-top:0.5rem;margin-right:0.5rem;padding:0.3rem 0.8rem;background:rgba(116,185,255,0.2);border:1px solid rgba(116,185,255,0.4);border-radius:15px;color:#74b9ff;cursor:pointer;font-family:Heebo;font-size:0.75rem;';
        printBtn.addEventListener('click', () => {
            const card = content.closest('.guide-card');
            const title = card.querySelector('h3').textContent;
            const body = content.innerHTML;
            const win = window.open('', '_blank');
            win.document.write('<html dir="rtl"><head><title>' + title + '</title><style>body{font-family:Arial,sans-serif;padding:2rem;line-height:1.8;max-width:800px;margin:0 auto;}h1{color:#6c5ce7;}h4{color:#6c5ce7;margin-top:1.5rem;}li{margin-bottom:0.5rem;}strong{color:#333;}</style></head><body><h1>' + title + '</h1>' + body + '<hr><p style="color:#888;font-size:0.8rem;">מקור: דשבורד מדריכי AI v2.1 | avimugrabi-ai.github.io/ai-guides-dashboard</p></body></html>');
            win.document.close();
            win.print();
        });
        content.appendChild(printBtn);
    });
})();
