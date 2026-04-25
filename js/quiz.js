/* quiz.js — Quiz Module */

const Quiz = {
    questions: [
        { q: 'For the circuit with L = 0.5 H, R = 100 Ω, E = 20 V, the ODE is 0.5(dI/dt) + 100I = 20. What is the integrating factor?', opts: ['e^(100t)', 'e^(200t)', 'e^(50t)', 'e^(-200t)'], ans: 1, exp: 'Rewriting in standard form: dI/dt + (100/0.5)I = 20/0.5 → dI/dt + 200I = 40. Here P = 200, so IF = e^(∫200 dt) = e^(200t).' },
        { q: 'For L = 0.5 H, R = 100 Ω, E = 20 V with I(0) = 0, the current I(t) is:', opts: ['0.2(1 − e^(−200t))', '0.2(1 + e^(−200t))', '20(1 − e^(−200t))', '0.5(1 − e^(−100t))'], ans: 0, exp: 'General solution: I = E/R + Ke^(−Rt/L) = 0.2 + Ke^(−200t). At t = 0, I = 0: K = −0.2. So I(t) = 0.2(1 − e^(−200t)).' },
        { q: 'For R = 120 Ω, L = 0.6 H, E = 30 V with I(0) = 0, the steady-state current (as t → ∞) is:', opts: ['0.5 A', '50 A', '0.25 A', '0.2 A'], ans: 2, exp: 'As t → ∞, the exponential term vanishes. Steady-state current = E/R = 30/120 = 0.25 A.' },
        { q: 'For R = 120 Ω, L = 0.6 H, E = 30 V, the current equation I(t) with I(0) = 0 is:', opts: ['0.25(1 − e^(−200t))', '0.25(1 − e^(−72t))', '30(1 − e^(−200t))', '0.6(1 − e^(−120t))'], ans: 0, exp: 'Standard form: dI/dt + (R/L)I = E/L → dI/dt + 200I = 50. Solution: I = E/R(1 − e^(−Rt/L)) = 0.25(1 − e^(−200t)). Time constant τ = L/R = 0.003 s.' },
        { q: 'For L = 640 H, R = 250 Ω, E = 500 V, the time constant τ = L/R is:', opts: ['0.39 s', '2.56 s', '160000 s', '1.28 s'], ans: 1, exp: 'Time constant τ = L/R = 640/250 = 2.56 seconds. This is the time at which the current reaches approximately 63.2% of its maximum value.' },
        { q: 'For L = 640 H, R = 250 Ω, E = 500 V, the time for the current to reach 90% of its maximum value is:', opts: ['2.56 ln(10) s', '2.56 ln(2) s', '640 ln(10) s', '250 ln(10) s'], ans: 0, exp: 'At 90% of max: 0.9 = 1 − e^(−Rt/L) → e^(−Rt/L) = 0.1 → t = (L/R)·ln(10) = 2.56 × ln(10) ≈ 5.89 seconds.' },
        { q: 'In an RL circuit, the time taken for current to reach half its maximum value (E/2R) is:', opts: ['(L/R)·ln 3', '(R/L)·ln 2', '(L/R)·ln 2', '(L/R)·ln 10'], ans: 2, exp: 'At half maximum: E/(2R) = (E/R)(1 − e^(−Rt/L)) → 1/2 = 1 − e^(−Rt/L) → e^(−Rt/L) = 1/2 → t = (L/R)·ln 2.' },
        { q: 'For the RC circuit ODE: R(dQ/dt) + Q/C = V, the integrating factor is:', opts: ['e^(−t/RC)', 'e^(t/RC)', 'e^(RCt)', 'e^(t·C/R)'], ans: 1, exp: 'Standard form: dQ/dt + (1/RC)Q = V/R. Here P = 1/(RC), so IF = e^(∫(1/RC)dt) = e^(t/RC).' },
        { q: 'For C = 0.01 F, R = 20 Ω, E = 10 V with Q(0) = 0, the charge Q(t) is:', opts: ['0.1(1 − e^(−5t))', '0.01(1 − e^(−5t))', '10(1 − e^(−0.2t))', '0.1(1 − e^(−0.2t))'], ans: 0, exp: 'Q = CE(1 − e^(−t/RC)) = (0.01)(10)(1 − e^(−t/0.2)) = 0.1(1 − e^(−5t)). Here RC = 20 × 0.01 = 0.2, so 1/RC = 5.' },
        { q: 'For C = 0.01 F, R = 20 Ω, E = 10 V, the current I(t) = dQ/dt flowing into the circuit is:', opts: ['0.5 e^(−5t)', '5 e^(−5t)', '0.1 e^(−5t)', '0.5 e^(−0.2t)'], ans: 0, exp: 'I = dQ/dt = (E/R)·e^(−t/RC) = (10/20)·e^(−5t) = 0.5·e^(−5t) amperes. The current starts at 0.5 A and decays exponentially.' }
    ],
    current: 0,
    answers: [],
    submitted: false,

    init() {
        this.current = 0;
        this.answers = new Array(this.questions.length).fill(-1);
        this.submitted = false;
        this.render();
    },

    render() {
        const c = document.getElementById('quizContainer');
        if (!c) return;

        if (this.submitted) { this.showResults(c); return; }

        const q = this.questions[this.current];
        const pct = ((this.current) / this.questions.length) * 100;

        c.innerHTML = `
            <div class="quiz-progress">
                <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                <p class="quiz-progress-text">Question ${this.current + 1} of ${this.questions.length}</p>
            </div>
            <div class="card quiz-question-card" style="padding:var(--space-8)">
                <p class="quiz-question">${this.current + 1}. ${q.q}</p>
                <div class="quiz-options">
                    ${q.opts.map((o, i) => `<button class="quiz-option ${this.answers[this.current] === i ? 'selected' : ''}" onclick="Quiz.selectOption(${i})">
                        <span class="option-marker">${String.fromCharCode(65 + i)}</span><span>${o}</span>
                    </button>`).join('')}
                </div>
                <div class="quiz-nav">
                    <button class="btn btn-secondary" ${this.current === 0 ? 'disabled style="opacity:.5"' : ''} onclick="Quiz.prev()">← Previous</button>
                    ${this.current < this.questions.length - 1
                        ? `<button class="btn btn-primary" onclick="Quiz.next()">Next →</button>`
                        : `<button class="btn btn-success" onclick="Quiz.submit()">Submit Quiz</button>`}
                </div>
            </div>`;
    },

    selectOption(i) {
        this.answers[this.current] = i;
        this.render();
    },

    next() { if (this.current < this.questions.length - 1) { this.current++; this.render(); } },
    prev() { if (this.current > 0) { this.current--; this.render(); } },

    submit() {
        if (this.answers.includes(-1)) {
            if (!confirm('You have unanswered questions. Submit anyway?')) return;
        }
        this.submitted = true;
        this.render();
    },

    showResults(c) {
        let score = 0;
        this.questions.forEach((q, i) => { if (this.answers[i] === q.ans) score++; });

        let html = `<div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <div class="quiz-score-circle"><span class="score-num">${score}</span><span class="score-total">out of ${this.questions.length}</span></div>
            <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">${score >= 8 ? '🎉 Excellent work!' : score >= 5 ? '👍 Good effort! Review the explanations below.' : '💪 Keep practicing! Check the solutions below.'}</p>
            <button class="btn btn-primary" onclick="Quiz.init()">🔄 Retake Quiz</button>
        </div>
        <div style="margin-top:var(--space-8)">
            <h3 style="margin-bottom:var(--space-4)">Review Answers</h3>`;

        this.questions.forEach((q, i) => {
            const correct = this.answers[i] === q.ans;
            html += `<div class="card" style="padding:var(--space-5);margin-bottom:var(--space-3)">
                <p style="font-weight:600;margin-bottom:var(--space-3)">${i + 1}. ${q.q}</p>
                <div class="quiz-options" style="pointer-events:none">
                    ${q.opts.map((o, j) => {
                        let cls = '';
                        if (j === q.ans) cls = 'correct';
                        else if (j === this.answers[i] && !correct) cls = 'incorrect';
                        return `<div class="quiz-option ${cls}"><span class="option-marker">${String.fromCharCode(65 + j)}</span><span>${o}</span></div>`;
                    }).join('')}
                </div>
                <div class="quiz-explanation"><strong>Explanation:</strong> ${q.exp}</div>
            </div>`;
        });

        html += '</div>';
        c.innerHTML = html;
    }
};
