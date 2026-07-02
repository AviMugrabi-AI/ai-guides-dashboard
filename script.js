// Glossary Data - Comprehensive AI Terms
const glossaryData = [
    { term: "AI (Artificial Intelligence)", def: "בינה מלאכותית - תחום במדעי המחשב שמטרתו ליצור מכונות חכמות" },
    { term: "Agentic AI", def: "AI שפועל באופן אוטונומי - מתכנן, מבצע, ומתקן בלי התערבות אנושית בכל צעד" },
    { term: "Algorithm", def: "אלגוריתם - רצף הוראות מוגדר לפתרון בעיה" },
    { term: "AGI (Artificial General Intelligence)", def: "בינה מלאכותית כללית - AI ברמת יכולת אנושית כוללת (עדיין לא קיים)" },
    { term: "Attention Mechanism", def: "מנגנון שמאפשר למודל 'לשים לב' לחלקים רלוונטיים בקלט" },
    { term: "Backpropagation", def: "אלגוריתם שמאמן רשתות נוירונים על ידי תיקון שגיאות לאחור" },
    { term: "Benchmark", def: "מבחן סטנדרטי למדידת ביצועי מודלים. דוגמאות: MMLU, HumanEval, MATH" },
    { term: "Bias", def: "הטיה - כשמודל AI מפלה או מעדיף קבוצה מסוימת בגלל הדאטה" },
    { term: "BERT", def: "מודל שפה של Google להבנת טקסט (Encoder-based Transformer)" },
    { term: "Chain of Thought (CoT)", def: "טכניקה שבה המודל 'חושב בקול רם' צעד-אחר-צעד לפני שנותן תשובה" },
    { term: "Chatbot", def: "צ'אטבוט - תוכנה שמנהלת שיחה עם אנשים" },
    { term: "Classification", def: "סיווג - משימה של שיוך דוגמה לקטגוריה (ספאם/לא ספאם)" },
    { term: "Claude Corps", def: "מוצר של Anthropic (יוני 2026) - צוותי agents שעובדים יחד על משימות מורכבות" },
    { term: "Clustering", def: "אשכול - קיבוץ אוטומטי של דוגמאות דומות" },
    { term: "CNN (Convolutional Neural Network)", def: "רשת נוירונים לזיהוי תמונות שסורקת תבניות בחלקים" },
    { term: "Compute", def: "כוח החישוב הנדרש לאימון/הרצת מודל. נמדד ב-FLOPs. GPU/TPU הם החומרה העיקרית" },
    { term: "Context Layer", def: "שכבת ההקשר שנותנת ל-agents גישה למידע רלוונטי דרך כלים" },
    { term: "Context Window", def: "כמות הטקסט המקסימלית שמודל מעבד בבת אחת. מ-8K עד 1M+ tokens ב-2026" },
    { term: "Dataset", def: "מאגר נתונים - אוסף דוגמאות לאימון מודל" },
    { term: "Deep Learning", def: "למידה עמוקה - למידת מכונה עם רשתות נוירונים רבות שכבות" },
    { term: "Deepfake", def: "תוכן מדיה מזויף שנוצר על ידי AI - וידאו, אודיו או תמונה של אנשים אמיתיים" },
    { term: "Diffusion Model", def: "מודל ליצירת תמונות על ידי הסרת רעש הדרגתית (DALL-E, Midjourney, Stable Diffusion)" },
    { term: "Distillation", def: "זיקוק - העברת ידע ממודל גדול לקטן. המודל הקטן לומד לחקות את הגדול" },
    { term: "Embedding", def: "ייצוג של מילים/תמונות כוקטורים מספריים במרחב רב-ממדי" },
    { term: "Encoder-Decoder", def: "ארכיטקטורה שמקודדת קלט ומפענחת פלט (T5, תרגום)" },
    { term: "Epoch", def: "מעבר אחד שלם על כל הדאטה באימון" },
    { term: "EU AI Act", def: "החוק האירופי לרגולציית AI. חובות High-Risk מאוגוסט 2026" },
    { term: "Feature", def: "תכונה - מאפיין של נתון שהמודל לומד ממנו" },
    { term: "Few-shot Learning", def: "מתן כמה דוגמאות למודל כדי שיבין את המשימה (בניגוד ל-Zero-shot)" },
    { term: "Fine-Tuning", def: "התאמת מודל מאומן לתחום ספציפי עם דאטה נוסף ממוקד" },
    { term: "Frontier Model", def: "מודל בחזית היכולות - הגדול והחזק ביותר בזמן נתון" },
    { term: "GAN (Generative Adversarial Network)", def: "שני מודלים שמתחרים - אחד יוצר ואחד שופט" },
    { term: "GPT (Generative Pre-trained Transformer)", def: "משפחת מודלי שפה של OpenAI. GPT-5.5/5.6 הם הגרסאות העדכניות (יוני 2026)" },
    { term: "GPU", def: "מעבד גרפי - חומרה שמאיצה חישובי AI. NVIDIA שולטת בשוק" },
    { term: "Gradient Descent", def: "שיטת אופטימיזציה - 'ירידה' לנקודה הנמוכה ביותר בפונקציית השגיאה" },
    { term: "Grounding", def: "עיגון - חיבור תשובות המודל למקורות מידע אמיתיים כדי למנוע הזיות" },
    { term: "Guardrails", def: "מנגנוני הגנה שמונעים ממודל AI להגיד/לעשות דברים מסוכנים או לא מדויקים" },
    { term: "Hallucination", def: "כשמודל AI 'ממציא' מידע שנשמע אמיתי אבל שגוי לחלוטין" },
    { term: "Hyperparameter", def: "פרמטר שנקבע ידנית לפני האימון (learning rate, batch size, epochs)" },
    { term: "Inference", def: "היסק - הפעלת מודל מאומן על נתונים חדשים (בניגוד ל-Training)" },
    { term: "Knowledge Cutoff", def: "תאריך שאחריו המודל לא 'יודע' מה קרה בעולם" },
    { term: "Label", def: "תיוג - התשובה הנכונה שמלווה דוגמה באימון מונחה" },
    { term: "Latency", def: "זמן תגובה - כמה זמן לוקח למודל לייצר את התשובה הראשונה" },
    { term: "LLM (Large Language Model)", def: "מודל שפה גדול - מיליארדי פרמטרים. מבין ומייצר שפה (GPT, Claude, Gemini)" },
    { term: "LoRA (Low-Rank Adaptation)", def: "טכניקת Fine-Tuning יעילה שמעדכנת רק חלק קטן מהפרמטרים - חסכונית בזיכרון" },
    { term: "Loss Function", def: "פונקציית הפסד - מדידת השגיאה של המודל. המטרה: להקטין אותה" },
    { term: "Machine Learning", def: "למידת מכונה - תחום שבו מחשבים לומדים מנתונים בלי תכנות מפורש לכל מקרה" },
    { term: "MCP (Model Context Protocol)", def: "פרוטוקול סטנדרטי (Anthropic, 2024) שמאפשר ל-AI agents לגשת לכלים חיצוניים. סטנדרט דה-פקטו ב-2026" },
    { term: "Mixture of Experts (MoE)", def: "ארכיטקטורה שמפעילה רק חלק מהרשת לכל קלט - מודלים ענקיים ויעילים (DeepSeek, Mixtral)" },
    { term: "Model", def: "מודל - התוצאה של אימון אלגוריתם על דאטה. 'המוח' שמבצע את המשימה" },
    { term: "Model Collapse", def: "תופעה שבה מודל שאומן על פלט AI מאבד מגוון ואיכות בהדרגה" },
    { term: "Multi-Agent System", def: "מערכת שבה מספר agents עובדים יחד, כל אחד עם תפקיד שונה (Claude Corps)" },
    { term: "Multimodal", def: "מולטי-מודאלי - מודל שמבין כמה סוגי קלט: טקסט, תמונה, אודיו, וידאו (GPT-4o, Gemini)" },
    { term: "Nemotron 3 Ultra", def: "מודל NVIDIA (יוני 2026) - 550B פרמטרים, המודל הפתוח החזק ביותר, רישיון מלא" },
    { term: "Neural Network", def: "רשת נוירונים - מבנה מתמטי של שכבות 'נוירונים' שמעבדים מידע" },
    { term: "NLP (Natural Language Processing)", def: "עיבוד שפה טבעית - AI שמבין, מפרש ומייצר שפה אנושית" },
    { term: "On-Device AI", def: "AI שרץ ישירות על המכשיר (טלפון/מחשב) בלי ענן - מהיר ופרטי" },
    { term: "Open Weight / Open Source", def: "מודלים עם משקלות זמינים לציבור (LLaMA, Mistral, Nemotron, Qwen)" },
    { term: "OpenClaw", def: "Framework של Microsoft (2026) לבניית agents אוטונומיים (הוצג ב-Build 2026)" },
    { term: "Orchestration", def: "תזמור - ניהול זרימת העבודה של agent: מתי לחשוב, לפעול, לשאול" },
    { term: "Overfitting", def: "התאמת יתר - כשמודל 'שינן' את הדאטה במקום ללמוד דפוסים כלליים" },
    { term: "Parameter", def: "פרמטר - מספר שהמודל לומד באימון. GPT-4: ~1.8T, Nemotron 3: 550B" },
    { term: "Planning (Agent)", def: "יכולת של agent לפרק משימה מורכבת לצעדים ולתכנן סדר ביצוע" },
    { term: "Pre-training", def: "אימון ראשוני של מודל על כמות עצומה של דאטה כללי (טריליוני טוקנים)" },
    { term: "Prompt", def: "שאילתה - ההנחיה/שאלה שנותנים למודל AI" },
    { term: "Prompt Engineering", def: "אומנות ניסוח הנחיות אופטימליות למודלי AI לקבלת תוצאות טובות" },
    { term: "Quantization", def: "דחיסת מודל על ידי הקטנת דיוק מספרי - מאפשר הרצה על חומרה חלשה יותר" },
    { term: "RAG (Retrieval Augmented Generation)", def: "שילוב אחזור מסמכים עם יצירת תשובות - מפחית הזיות, מעדכן ידע" },
    { term: "Reasoning Model", def: "מודל שחושב צעד-אחר-צעד לפני שעונה (o1, Claude thinking). משפר דיוק במשימות מורכבות" },
    { term: "Red Teaming", def: "צוות שמנסה בכוונה 'לשבור' את המודל - למצוא חולשות בטיחותיות ופרצות" },
    { term: "Regression", def: "רגרסיה - חיזוי ערך מספרי רציף (מחיר, טמפרטורה)" },
    { term: "Reinforcement Learning", def: "למידת חיזוק - למידה על ידי ניסוי וטעייה עם תגמולים ועונשים" },
    { term: "RLHF", def: "Reinforcement Learning from Human Feedback - כך ChatGPT למד להיות מועיל ובטוח" },
    { term: "Scaffold / Harness", def: "קוד העטיפה שהופך מודל שפה פסיבי ל-agent פעיל (לולאה, כלים, זיכרון)" },
    { term: "Scaling Laws", def: "חוקי הגדלה - ביצועים משתפרים בצורה צפויה ככל שמודל גדל ומאומן יותר" },
    { term: "Self-Attention", def: "מנגנון שמאפשר לכל חלק בקלט 'לשים לב' לכל חלק אחר ברצף" },
    { term: "Sparse Attention", def: "טכניקה שמפחיתה חישוב - attention רק לחלקים רלוונטיים. MiniMax MSA: 1/20 compute" },
    { term: "Structured Output", def: "יכולת מודל להחזיר תשובה בפורמט מובנה (JSON, טבלה) ולא טקסט חופשי" },
    { term: "Subagent", def: "agent משני שנקרא על ידי agent ראשי לביצוע משימה ספציפית" },
    { term: "Supervised Learning", def: "למידה מונחית - אימון עם דוגמאות ותשובות נכונות (הנפוץ ביותר)" },
    { term: "Synthetic Data", def: "נתונים שנוצרו על ידי AI לצורך אימון מודלים אחרים - פתרון למחסור בדאטה" },
    { term: "System Prompt", def: "הנחיה נסתרת שמגדירה את ההתנהגות, האישיות והמגבלות של המודל" },
    { term: "Temperature", def: "פרמטר שקובע 'יצירתיות': 0=מדויק וחוזר על עצמו, 1=מגוון ומפתיע" },
    { term: "Throughput", def: "כמות הטוקנים שמודל יכול לייצר בשנייה - חשוב ליישומים בזמן אמת" },
    { term: "Token", def: "טוקן - יחידת טקסט בסיסית. ~4 תווים באנגלית, ~2 תווים בעברית" },
    { term: "Tool Calling / Function Calling", def: "יכולת מודל להפעיל כלים חיצוניים (API, חיפוש, חישוב) - מה שהופך LLM ל-agent" },
    { term: "TPU (Tensor Processing Unit)", def: "שבב AI מותאם של Google - מתחרה ב-GPU של NVIDIA לאימון מודלים" },
    { term: "Training", def: "אימון - התהליך שבו מודל לומד מנתונים. יכול לקחת שבועות ולעלות מיליונים" },
    { term: "Transfer Learning", def: "העברת ידע ממודל שאומן על משימה אחת למשימה אחרת - חוסך זמן ודאטה" },
    { term: "Transformer", def: "ארכיטקטורה מבוססת Attention (2017) - הבסיס של כל מודלי AI המודרניים" },
    { term: "Unsupervised Learning", def: "למידה לא-מונחית - מציאת דפוסים בנתונים בלי תשובות מסומנות" },
    { term: "Vector Database", def: "מסד נתונים לאחסון וחיפוש וקטורים (embeddings) - הבסיס של RAG" },
    { term: "Vibe Coding", def: "סגנון תכנות שבו מתארים ל-AI מה רוצים בשפה טבעית והוא כותב את הקוד" },
    { term: "Voice Cloning", def: "שכפול קול אנושי - יצירת דיבור טבעי בקול של אדם ספציפי (ElevenLabs)" },
    { term: "Weight", def: "משקל - ערך מספרי בנוירון שנלמד באימון ומשפיע על הפלט" },
    { term: "Window (Context)", def: "חלון ההקשר - כמות הטקסט שמודל מעבד. ב-2026: 8K עד מעל 1M tokens" },
    { term: "Zero-shot", def: "יכולת מודל לבצע משימה חדשה בלי דוגמאות - רק מהנחיה טקסטואלית" },
    { term: "A2A (Agent-to-Agent)", def: "פרוטוקול תקשורת בין agents שונים - מאפשר שיתוף פעולה בין מערכות" },
    { term: "Ablation Study", def: "מחקר שבודק מה קורה כשמסירים חלקים מהמודל - מה באמת חשוב" },
    { term: "Activation Function", def: "פונקציה שמחליטה אם נוירון 'נדלק' או לא (ReLU, Sigmoid, Softmax)" },
    { term: "AlphaFold", def: "מודל DeepMind שפתר את בעיית קיפול חלבונים - נובל 2024" },
    { term: "Batch Size", def: "כמות דוגמאות שמודל מעבד בבת אחת באימון - משפיע על מהירות ודיוק" },
    { term: "BLEU Score", def: "מדד להערכת איכות תרגום אוטומטי" },
    { term: "Catastrophic Forgetting", def: "כשמודל שוכח מה שלמד קודם כשלומד משהו חדש" },
    { term: "Constitutional AI", def: "גישה של Anthropic - אימון AI עם עקרונות מוסריים כתובים" },
    { term: "Data Augmentation", def: "הגדלת מאגר נתונים על ידי שינויים קטנים (סיבוב תמונות, הוספת רעש)" },
    { term: "Dropout", def: "טכניקה למניעת Overfitting - מכבה נוירונים אקראיים באימון" },
    { term: "Edge AI", def: "AI שרץ על מכשירי קצה (טלפונים, IoT) - לא בענן" },
    { term: "Explainable AI (XAI)", def: "AI שיכול להסביר למה הוא החליט מה שהחליט - חשוב ברפואה ומשפט" },
    { term: "Federated Learning", def: "אימון מודל על מכשירים מבוזרים בלי לשלוח דאטה למרכז - שמירת פרטיות" },
    { term: "FLOP", def: "Floating Point Operation - יחידת מדידה לכמות חישוב שמודל צורך" },
    { term: "Foundation Model", def: "מודל בסיס גדול שאומן על דאטה כללי וניתן להתאמה למשימות שונות" },
    { term: "GAI (Generative AI)", def: "AI שיוצר תוכן חדש: טקסט, תמונות, מוזיקה, וידאו, קוד" },
    { term: "Hugging Face", def: "פלטפורמה מרכזית לשיתוף מודלים, datasets וכלי AI - ה-GitHub של AI" },
    { term: "Image Segmentation", def: "חלוקת תמונה לאזורים - זיהוי מדויק של גבולות אובייקטים" },
    { term: "In-Context Learning", def: "יכולת מודל ללמוד ממה שנמצא בפרומפט - בלי אימון נוסף" },
    { term: "Jailbreak", def: "ניסיון לעקוף מגבלות בטיחות של מודל AI - לגרום לו לעשות דברים אסורים" },
    { term: "Knowledge Graph", def: "מבנה נתונים שמייצג ידע כרשת של קשרים בין ישויות" },
    { term: "LiDAR", def: "חיישן לייזר למיפוי 3D - משמש ברכב אוטונומי ורובוטיקה" },
    { term: "MMLU", def: "Massive Multitask Language Understanding - בנצ'מרק מרכזי למדידת ידע כללי של מודלים" },
    { term: "Object Detection", def: "זיהוי וסימון אובייקטים בתמונה עם מלבנים ותיוגים (YOLO)" },
    { term: "Perplexity", def: "מדד שמעריך כמה טוב מודל שפה 'מפתיע' ממילים - נמוך = טוב יותר" },
    { term: "Reward Model", def: "מודל שמעריך את איכות תשובות AI - חלק מתהליך RLHF" },
    { term: "Semantic Search", def: "חיפוש לפי משמעות ולא רק מילות מפתח - מבוסס embeddings" },
    { term: "Sim-to-Real", def: "אימון רובוטים בסימולציה והעברת הידע לעולם האמיתי" },
    { term: "SOTA (State of the Art)", def: "הביצועים הטובים ביותר שהושגו עד כה במשימה מסוימת" },
    { term: "Text-to-SQL", def: "המרת שאלה בשפה טבעית לשאילתת SQL - מאפשר לשאול שאלות על DB" },
    { term: "Top-k / Top-p Sampling", def: "שיטות לשליטה ביצירתיות הפלט - בוחרים מתוך k/p% המילים הסבירות" },
    { term: "Variational Autoencoder (VAE)", def: "רשת שלומדת ייצוג דחוס של נתונים ויכולה לייצר דוגמאות חדשות" },
    { term: "Watermarking (AI)", def: "סימון נסתר בתוכן שנוצר על ידי AI - לזיהוי מקור" },
    { term: "World Model", def: "מודל שמבין את הפיזיקה והלוגיקה של העולם - חזון לדור הבא של AI" }
];

// Toggle expanded content
function toggleContent(btn) {
    const content = btn.nextElementSibling;
    const isShowing = content.classList.contains('show');
    
    content.classList.toggle('show');
    btn.classList.toggle('active');
    btn.textContent = isShowing ? 'קרא עוד ↓' : 'סגור ↑';
}

// Category filtering
document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const cards = document.querySelectorAll('.guide-card');
    const sections = document.querySelectorAll('.guide-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            if (category === 'all') {
                cards.forEach(card => card.style.display = '');
                sections.forEach(section => section.style.display = '');
            } else {
                sections.forEach(section => {
                    const sectionCards = section.querySelectorAll('.guide-card');
                    let hasVisible = false;
                    
                    sectionCards.forEach(card => {
                        if (card.dataset.category === category) {
                            card.style.display = '';
                            hasVisible = true;
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    section.style.display = hasVisible ? '' : 'none';
                });
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            cards.forEach(card => card.style.display = '');
            sections.forEach(section => section.style.display = '');
            return;
        }

        sections.forEach(section => {
            const sectionCards = section.querySelectorAll('.guide-card');
            let hasVisible = false;

            sectionCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = '';
                    hasVisible = true;
                } else {
                    card.style.display = 'none';
                }
            });

            section.style.display = hasVisible ? '' : 'none';
        });
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
        if (!searchInput.value.trim()) {
            cards.forEach(card => card.style.display = '');
            sections.forEach(section => section.style.display = '');
        }
    });

    // Live search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });

    // Glossary
    const glossaryPanel = document.getElementById('glossary');
    const glossaryToggle = document.getElementById('glossaryToggle');
    const glossaryList = document.getElementById('glossaryList');
    const glossarySearch = document.getElementById('glossarySearch');

    // Render glossary
    function renderGlossary(data) {
        glossaryList.innerHTML = data.map(item => `
            <div class="glossary-item">
                <div class="term-name">${item.term}</div>
                <div class="term-def">${item.def}</div>
            </div>
        `).join('');
    }

    renderGlossary(glossaryData);

    // Toggle glossary panel
    glossaryToggle.addEventListener('click', () => {
        glossaryPanel.classList.toggle('open');
        glossaryToggle.textContent = glossaryPanel.classList.contains('open') ? '✕ סגור' : '📖 מילון';
    });

    // Glossary search
    glossarySearch.addEventListener('input', () => {
        const query = glossarySearch.value.trim().toLowerCase();
        if (!query) {
            renderGlossary(glossaryData);
            return;
        }
        const filtered = glossaryData.filter(item => 
            item.term.toLowerCase().includes(query) || 
            item.def.toLowerCase().includes(query)
        );
        renderGlossary(filtered);
    });

    // Close glossary on outside click
    document.addEventListener('click', (e) => {
        if (!glossaryPanel.contains(e.target) && 
            !glossaryToggle.contains(e.target) && 
            glossaryPanel.classList.contains('open')) {
            glossaryPanel.classList.remove('open');
            glossaryToggle.textContent = '📖 מילון';
        }
    });

    // Smooth scroll for section navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            if (category !== 'all') {
                const section = document.getElementById(category);
                if (section) {
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        });
    });

    // Scroll reveal animation - re-trigger card animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.guide-card, .section-title, .stat-card').forEach(el => {
        observer.observe(el);
    });

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }

    // ===== PROGRESS TRACKING =====
    const readGuides = JSON.parse(localStorage.getItem('readGuides') || '[]');
    const allExpandBtns = document.querySelectorAll('.expand-btn');
    const totalGuides = allExpandBtns.length;

    function updateProgress() {
        const count = readGuides.length;
        const pct = Math.round((count / totalGuides) * 100);
        document.getElementById('progressBar').style.width = pct + '%';
        document.getElementById('progressText').textContent = count + ' מתוך ' + totalGuides + ' מדריכים נקראו (' + pct + '%)';
        // Mark read cards
        allExpandBtns.forEach((btn, i) => {
            if (readGuides.includes(i)) {
                btn.closest('.guide-card').classList.add('read');
            }
        });
    }

    allExpandBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if (!readGuides.includes(i)) {
                readGuides.push(i);
                localStorage.setItem('readGuides', JSON.stringify(readGuides));
                updateProgress();
            }
        });
    });
    updateProgress();

    // ===== RANDOM GUIDE =====
    document.getElementById('randomBtn').addEventListener('click', () => {
        const cardsList = document.querySelectorAll('.guide-card');
        const randomIndex = Math.floor(Math.random() * cardsList.length);
        const randomCard = cardsList[randomIndex];
        randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        randomCard.style.boxShadow = '0 0 40px rgba(253,121,168,0.6)';
        setTimeout(() => { randomCard.style.boxShadow = ''; }, 2000);
        // Auto expand
        const expandBtn = randomCard.querySelector('.expand-btn');
        if (expandBtn && !expandBtn.classList.contains('active')) expandBtn.click();
    });

    // ===== QUIZ =====
    const quizQuestions = [
        { q: "מה ההבדל בין AI צר (Narrow) ל-AGI?", options: ["AI צר מתמחה במשימה אחת, AGI יכולות אנושיות כלליות", "אין הבדל", "AGI יותר מהיר", "AI צר יקר יותר"], correct: 0 },
        { q: "מה תפקיד Backpropagation?", options: ["יצירת תמונות", "תיקון שגיאות ברשת נוירונים", "דחיסת מודלים", "חיפוש באינטרנט"], correct: 1 },
        { q: "מה זה Hallucination ב-AI?", options: ["כשהמודל חולם בלילה", "כשהמודל ממציא מידע שנשמע אמיתי", "כשהמודל איטי", "כשיש באג בקוד"], correct: 1 },
        { q: "מה המהפכה שהביאו Transformers ב-2017?", options: ["מודלים קטנים יותר", "עיבוד מקבילי + מנגנון Attention", "ביטול GPU", "תמונות בלבד"], correct: 1 },
        { q: "מה RAG עושה?", options: ["יוצר תמונות", "משלב אחזור מסמכים עם יצירת תשובות", "מאמן מודלים", "מוחק נתונים"], correct: 1 },
        { q: "כמה פרמטרים יש ל-Nemotron 3 Ultra?", options: ["7 מיליארד", "70 מיליארד", "550 מיליארד", "1.8 טריליון"], correct: 2 },
        { q: "מה ההבדל בין Supervised ל-Unsupervised Learning?", options: ["אין הבדל", "Supervised עם תשובות, Unsupervised בלי", "Unsupervised יותר מדויק", "Supervised לא צריך דאטה"], correct: 1 },
        { q: "מה MCP (Model Context Protocol)?", options: ["שפת תכנות", "פרוטוקול שמאפשר ל-agents לגשת לכלים", "סוג של GPU", "אלגוריתם דחיסה"], correct: 1 },
        { q: "מה עשתה OpenAI ביוני 2026?", options: ["נסגרה", "הכריזה על GPT-5.6 (Sol, Terra, Luna)", "מכרה ל-Google", "שחררה רובוט"], correct: 1 },
        { q: "מה Vibe Coding?", options: ["סגנון עיצוב", "תכנות על פי מצב רוח", "תיאור ל-AI בשפה טבעית והוא כותב קוד", "שם לשפת תכנות"], correct: 2 },
        { q: "מה Temperature=0 עושה למודל?", options: ["משבית אותו", "תשובות מדויקות וחוזרות", "תשובות יצירתיות ומפתיעות", "מגביר מהירות"], correct: 1 },
        { q: "מה Reinforcement Learning?", options: ["למידה מספרים", "למידה עם ניסוי וטעייה + תגמולים", "למידה ללא מחשב", "סוג של CNN"], correct: 1 }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const quizModal = document.getElementById('quizModal');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizScore = document.getElementById('quizScore');
    const quizNext = document.getElementById('quizNext');

    document.getElementById('startQuiz').addEventListener('click', () => {
        currentQuestion = 0; score = 0; answered = false;
        quizModal.classList.add('active');
        showQuestion();
    });

    quizModal.addEventListener('click', (e) => {
        if (e.target === quizModal) quizModal.classList.remove('active');
    });

    function showQuestion() {
        if (currentQuestion >= quizQuestions.length) {
            quizQuestion.textContent = 'חידון הסתיים!';
            quizOptions.innerHTML = '';
            quizScore.textContent = 'ציון: ' + score + '/' + quizQuestions.length + ' (' + Math.round(score/quizQuestions.length*100) + '%)';
            quizNext.textContent = 'סגור';
            quizNext.style.display = 'block';
            quizNext.onclick = () => quizModal.classList.remove('active');
            return;
        }
        answered = false;
        const q = quizQuestions[currentQuestion];
        quizScore.textContent = 'שאלה ' + (currentQuestion + 1) + '/' + quizQuestions.length + ' | ניקוד: ' + score;
        quizQuestion.textContent = q.q;
        quizOptions.innerHTML = q.options.map((opt, i) => '<button class="quiz-option" data-index="' + i + '">' + opt + '</button>').join('');
        quizNext.style.display = 'none';

        quizOptions.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                if (answered) return;
                answered = true;
                const idx = parseInt(btn.dataset.index);
                if (idx === q.correct) { btn.classList.add('correct'); score++; }
                else { btn.classList.add('wrong'); quizOptions.children[q.correct].classList.add('correct'); }
                quizNext.style.display = 'block';
                quizNext.textContent = 'שאלה הבאה →';
                quizNext.onclick = () => { currentQuestion++; showQuestion(); };
            });
        });
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !e.ctrlKey) {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            quizModal.classList.remove('active');
            if (glossaryPanel.classList.contains('open')) {
                glossaryPanel.classList.remove('open');
                glossaryToggle.textContent = '📖 מילון';
            }
        }
    });
});
