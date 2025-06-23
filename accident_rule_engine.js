// --- Injury Rule Engine Logic in JS ---
function injuryRuleEngineWithBodyPart(textInput) {
    const deaths_keywords = [
        "killed", "died", "fatal", "death", "deceased", "passed away", "passed on", "heart failure",
        "fatality", "loss of life", "pronounced dead", "dead on arrival", "doa", "found dead",
        "succumbed to injuries", "expired", "fatal crash", "tragic accident", "tragic", "casualty",
        "died on scene", "mortality", "demise", "perished", "life lost", "fatal outcome",
        "life ended", "killed on impact", "died instantly", "non survivable"
    ];
    const severe_injury_keywords = [
        "disable", "disabling", "severe", "head on collision", "rollover", "overturned", "jackknife",
        "ejected", "transported to hospital", "ambulance", "emergency room", "emergency", "pedestrian",
        "bicyclist", "hard impact", "life threatening", "critical condition", "permanently injured",
        "paralyzed", "unconscious", "traumatic brain injury", "tbi", "coma", "amputation",
        "internal bleeding", "fractured spine", "broken neck", "fractured neck", "broken spine",
        "spinal cord injury", "spinal column injury", "broken ribs", "fractured ribs", "skull fracture",
        "dismembered", "hemorrhaging", "organ damage", "crushed", "head trauma", "life altering",
        "broken bones", "compound fracture", "severed limb", "dismemberment", "critical injury",
        "contusion", "incapacitate", "incapacitating", "catastrophic", "critical", "major trauma",
        "serious bodily harm", "crippling", "severe burn", "3rd degree burn", "3rd degree", 
        "third degree", "paralysis", "severed", "admitted to er", "significant injuries",
        "sustained significant", "surgery", "surgeries", "steroid injections", "personal injury", "extensive medical treatment",
        " bodily injury claims", "further medical treatments and surgeries"
    ];
    const normal_injury_keywords = [
        "tenderness", "tender", "tingling", "struck", "stop sign", "hospital",
        "injured", "rear ended", "bruised", "rear end", "pain", "slipped", "fell", "damaged",
        "collision", "hit", "sore", "swelling", "abrasion", "minor injury", "slight injury",
        "cut", "grazed", "scrape", "minor burn", "sprain", "twisted ankle", "mild discomfort",
        "discomfort", "stiffness", "brusing", "bruise", "strain", "strained", "sprained",
        "dizzy", "headache", "traumatized", "minor injuries", "slight injuries", "scratch",
        "minor cut", "laceration", "hairline fracture", "soreness", "pinched nerve",
        "pinched", "pulled muscle", "swollen", "soft tissue injury", "not serious", "minor rear end",
        "fall", "slip and fall", "slip", "suffered injuries",  "sustained injuries", "reported injuries", "damages for injuries"
    ];
    const no_injury_keywords = [
        "no injury reported", "no injury", "unhurt", "unharmed", "not injured", "safe",
        "escaped injury", "no physical harm", "injury not found", "no visible injury",
        "refused treatment", "not hurt", "medically cleared", "no treatment needed",
        "denied medical treatment", "refused medical aid", "refused medical",
        "didn't sustain injuries", "no injuries sustained", "no injury sustained", "no harm",
        "no apparent injury", "released without injury", "released without treatment", "uninjured",
        "unscathed", "intact", "walked away unharmed", "walked away uninjured", "cleared",
        "good condition", "no serious injury", "no serious injuries", "no apparent injuries",
        "no injuries", "no injuries reported", "sound"
    ];
    const body_parts = [
        "head", "brain", "skull", "face", "eye", "ear", "nose", "mouth", "jaw",
        "neck", "throat", "shoulder", "chest", "back", "spine", "ribs", "abdomen",
        "stomach", "hip", "pelvis", "arm", "elbow", "wrist", "hand", "finger",
        "leg", "thigh", "knee", "ankle", "foot", "toe", "rib", "spinal cord", "lung"
    ];

    let text = "";
    if (Array.isArray(textInput)) {
        text = textInput.join(" ").toLowerCase();
    } else if (typeof textInput === "string") {
        text = textInput.toLowerCase();
    } else {
        throw new Error("Input must be a list of strings or a string.");
    }

    let injury_found, severity, score;
    if (deaths_keywords.some(kw => text.includes(kw))) {
        injury_found = "Fatal";
        severity = "Major";
        score = 100;
    } else if (severe_injury_keywords.some(kw => text.includes(kw))) {
        injury_found = "Possible Injury";
        severity = "major";
        score = 70;
    } else if (normal_injury_keywords.some(kw => text.includes(kw))) {
        injury_found = "Possible Injury";
        severity = "minor";
        score = 40;
    } else if (no_injury_keywords.some(kw => text.includes(kw))) {
        injury_found = false;
        severity = null;
        score = 0;
    } else {
        injury_found = false;
        severity = null;
        score = 0;
    }

    // Detect body parts (whole word match)
    const detected_body_parts = body_parts.filter(bp => new RegExp(`\\b${bp}\\b`, 'i').test(text));

    return {
        injury_found: injury_found,
        severity: severity,
        severity_score: score,
        body_parts: detected_body_parts.length > 0 ? detected_body_parts : null
    };
}

// --- UI Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const input = document.getElementById('accident-input');
    const message = document.getElementById('message');
    const results = document.getElementById('results');
    const injuryFound = document.getElementById('injury-found');
    const severity = document.getElementById('severity');
    const severityScore = document.getElementById('severity-score');
    const bodyPartsSection = document.getElementById('body-parts-section');
    const bodyParts = document.getElementById('body-parts');

    function showMessage(msg, isError = true) {
        message.textContent = msg;
        message.style.color = isError ? '#d63a3a' : '#50fa7b';
        message.style.display = 'block';
    }

    function clearMessage() {
        message.textContent = '';
        message.style.display = 'none';
    }

    function showResults(data) {
        injuryFound.textContent = data.injury_found !== false ? data.injury_found : 'None';
        severity.textContent = data.severity ? data.severity : 'None';
        severityScore.textContent = data.severity_score;
        if (data.body_parts && data.body_parts.length > 0) {
            bodyPartsSection.classList.remove('hidden');
            bodyParts.textContent = data.body_parts.join(', ');
        } else {
            bodyPartsSection.classList.add('hidden');
            bodyParts.textContent = '';
        }
        results.classList.remove('hidden');
    }

    function clearResults() {
        results.classList.add('hidden');
        bodyPartsSection.classList.add('hidden');
        injuryFound.textContent = '';
        severity.textContent = '';
        severityScore.textContent = '';
        bodyParts.textContent = '';
    }

    analyzeBtn.addEventListener('click', function() {
        clearMessage();
        clearResults();
        const text = input.value.trim();
        if (!text) {
            showMessage('⚠️ Please enter a valid accident description.');
            return;
        }
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
        setTimeout(() => {
            try {
                const result = injuryRuleEngineWithBodyPart(text);
                showResults(result);
            } catch (err) {
                showMessage('⚠️ ' + (err.message || 'An error occurred.'));
            }
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze';
        }, 200); // Simulate a short delay for UX
    });
}); 