/* simulation.js — Circuit Simulation Engine */

const Simulation = {
    type: 'RL',
    values: { R: 10, L: 0.5, C: 0.001, E: 12 },
    currentStep: 0,
    scores: [0, 0, 0, 0],
    totalSteps: 4,
    started: false,

    init() {
        this.bindTabs();
        this.bindStart();
        this.updateDiagram();
    },

    bindTabs() {
        document.querySelectorAll('#circuitTabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#circuitTabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.type = btn.dataset.type;
                this.updateInputVisibility();
                this.updateDiagram();
            });
        });
    },

    updateInputVisibility() {
        const gL = document.getElementById('group-L');
        const gC = document.getElementById('group-C');
        if (!gL || !gC) return;
        gL.style.display = (this.type === 'RC') ? 'none' : '';
        gC.style.display = (this.type === 'RL') ? 'none' : '';
    },

    updateDiagram() {
        this.readValues();
        const container = document.getElementById('circuitDiagram');
        if (container) CircuitDiagram.draw(container, this.type, this.rawValues || this.values, this.units || {});
    },

    readValues() {
        const getV = id => parseFloat(document.getElementById(`input-${id}`)?.value) || 0;
        const getM = id => parseFloat(document.getElementById(`unit-${id}`)?.value) || 1;
        const getL = id => {
            const el = document.getElementById(`unit-${id}`);
            return el ? el.options[el.selectedIndex].text : '';
        };

        this.rawValues = { R: getV('R'), L: getV('L'), C: getV('C'), E: getV('E') };
        this.units = { R: getL('R') || 'Ω', L: getL('L') || 'H', C: getL('C') || 'F', E: 'V' };
        
        this.values = { 
            R: this.rawValues.R * getM('R'), 
            L: this.rawValues.L * getM('L'), 
            C: this.rawValues.C * getM('C'), 
            E: this.rawValues.E 
        };
    },

    bindStart() {
        document.getElementById('startSimBtn')?.addEventListener('click', () => this.start());
    },

    start() {
        this.readValues();
        const { R, E } = this.values;
        if (R <= 0 || E <= 0) { alert('Please enter valid positive values for R and E.'); return; }
        if (this.type !== 'RC' && this.values.L <= 0) { alert('Please enter a valid positive value for L.'); return; }
        if (this.type !== 'RL' && this.values.C <= 0) { alert('Please enter a valid positive value for C.'); return; }

        this.currentStep = 0;
        const steps = this.getStepDefinitions();
        this.totalSteps = steps.length;
        this.scores = new Array(this.totalSteps).fill(0);
        this.started = true;
        document.getElementById('simWorkspace').style.display = 'block';
        this.showEquation();
        this.renderProgressTracker();
        this.renderSteps();
        this.updateDiagram();
        document.getElementById('simWorkspace').scrollIntoView({ behavior: 'smooth' });
    },

    getStepDefinitions() {
        const { R, L, C, E } = this.values;
        if (this.type === 'RL') {
            return [
                { title: 'Integrating Factor', desc: `Find the IF for: \\(\\frac{dI}{dt} + \\frac{R}{L}I = \\frac{E}{L}\\)`, hint: 'Enter in terms of R, L, t (e.g. e^(R*t/L))', answer: () => `e^(${R}*t/${L})`, check: (ans) => this.checkNumeric(ans, `e^(${R}*t/${L})`, ['t']),
                    solution: () => `<p>The equation is in standard form \\(\\frac{dI}{dt} + P \\cdot I = Q\\) where \\(P = \\frac{R}{L} = \\frac{${R}}{${L}} = ${(R/L).toFixed(4)}\\).</p><p>Integrating Factor = \\(e^{\\int P\\,dt} = e^{(R/L)t}\\)</p><div class="equation-highlight">$$\\text{IF} = e^{${(R/L).toFixed(4)}\\,t}$$</div>` },
                { title: 'General Current Equation', desc: 'Write the general solution for I (with constant K)', hint: 'e.g. E/R + K*e^(-R*t/L)', answer: () => `${E}/${R} + K*e^(-${R}*t/${L})`, check: (ans) => this.checkWithConstant(ans, `${E/R} + K*e^(-${R}*t/${L})`, ['t', 'K']),
                    solution: () => `<p>Multiply both sides by IF and integrate:</p><div class="equation-highlight">$$I \\cdot e^{Rt/L} = \\frac{E}{R} \\cdot e^{Rt/L} + K$$</div><p>Therefore:</p><div class="equation-highlight">$$I = \\frac{E}{R} + K\\,e^{-Rt/L} = ${(E/R).toFixed(4)} + K\\,e^{-${(R/L).toFixed(4)}t}$$</div>` },
                { title: 'Integration Constant K', desc: 'At \\(t = 0\\), \\(I = 0\\). Find the value of K.', hint: 'Enter a number', answer: () => `${-E/R}`, check: (ans) => Math.abs(parseFloat(ans) - (-E/R)) < 0.01,
                    solution: () => `<p>At \\(t = 0\\), \\(I = 0\\):</p><div class="equation-highlight">$$0 = \\frac{E}{R} + K \\implies K = -\\frac{E}{R} = -\\frac{${E}}{${R}} = ${(-E/R).toFixed(4)}$$</div>` },
                { title: 'Final Current Equation', desc: 'Write the final expression for \\(I(t)\\).', hint: 'e.g. (E/R)*(1 - e^(-R*t/L))', answer: () => `(${E}/${R})*(1 - e^(-${R}*t/${L}))`, check: (ans) => this.checkNumeric(ans, `(${E/R})*(1 - e^(-${R/L}*t))`, ['t']),
                    solution: () => `<p>Substituting \\(K = -E/R\\):</p><div class="equation-highlight">$$I(t) = \\frac{E}{R}\\left(1 - e^{-Rt/L}\\right) = ${(E/R).toFixed(4)}\\left(1 - e^{-${(R/L).toFixed(4)}t}\\right)$$</div><p>Time constant \\(\\tau = L/R = ${(L/R).toFixed(4)}\\) seconds.</p>` }
            ];
        } else if (this.type === 'RC') {
            const tau = R * C;
            return [
                { title: 'Integrating Factor', desc: `Find the IF for: \\(\\frac{dQ}{dt} + \\frac{1}{RC}Q = \\frac{E}{R}\\)`, hint: 'Enter in terms of R, C, t', answer: () => `e^(t/(${R}*${C}))`, check: (ans) => this.checkNumeric(ans, `e^(t/${tau})`, ['t']),
                    solution: () => `<p>Here \\(P = \\frac{1}{RC} = \\frac{1}{${R} \\times ${C}} = ${(1/tau).toFixed(4)}\\).</p><div class="equation-highlight">$$\\text{IF} = e^{t/(RC)} = e^{${(1/tau).toFixed(4)}\\,t}$$</div>` },
                { title: 'General Charge Equation', desc: 'Write the general solution for Q (with constant K)', hint: 'e.g. C*E + K*e^(-t/(R*C))', answer: () => `${C}*${E} + K*e^(-t/(${R}*${C}))`, check: (ans) => this.checkWithConstant(ans, `${C*E} + K*e^(-t/${tau})`, ['t', 'K']),
                    solution: () => `<p>General solution:</p><div class="equation-highlight">$$Q = CE + K\\,e^{-t/(RC)} = ${(C*E).toFixed(6)} + K\\,e^{-${(1/tau).toFixed(4)}t}$$</div>` },
                { title: 'Integration Constant K', desc: 'At \\(t = 0\\), \\(Q = 0\\). Find K.', hint: 'Enter a number', answer: () => `${-C*E}`, check: (ans) => Math.abs(parseFloat(ans) - (-C*E)) < Math.max(0.01, Math.abs(C*E*0.01)),
                    solution: () => `<p>At \\(t = 0\\), \\(Q = 0\\):</p><div class="equation-highlight">$$K = -CE = -${(C*E).toFixed(6)}$$</div>` },
                { title: 'Final Current Equation', desc: 'Write \\(I(t) = dQ/dt\\).', hint: 'e.g. (E/R)*e^(-t/(R*C))', answer: () => `(${E}/${R})*e^(-t/(${R}*${C}))`, check: (ans) => this.checkNumeric(ans, `(${E/R})*e^(-t/${tau})`, ['t']),
                    solution: () => `<p>Differentiating \\(Q(t)\\):</p><div class="equation-highlight">$$I(t) = \\frac{dQ}{dt} = \\frac{E}{R}\\,e^{-t/(RC)} = ${(E/R).toFixed(4)}\\,e^{-${(1/tau).toFixed(4)}t}$$</div><p>Time constant \\(\\tau = RC = ${tau.toFixed(6)}\\) seconds.</p>` }
            ];
        } else {
            // RLC
            const disc = R*R - 4*L/C;
            const alpha = R / (2*L);
            let caseType = disc > 0.001 ? 'overdamped' : (disc < -0.001 ? 'underdamped' : 'critically damped');
            
            let s1_val, s2_val, s1_str, s2_str, roots_ans, roots_sol;
            let expectedQc, qc_ans, qc_sol;
            
            if (disc > 0.001) {
                s1_val = (-R + Math.sqrt(disc)) / (2*L);
                s2_val = (-R - Math.sqrt(disc)) / (2*L);
                s1_str = s1_val.toFixed(4);
                s2_str = s2_val.toFixed(4);
                roots_ans = `${s1_str}, ${s2_str}`;
                roots_sol = `<p>Discriminant \\(\\Delta = R^2 - 4L/C = ${disc.toFixed(4)}\\). Since \\(\\Delta > 0\\), roots are real and distinct.</p><div class="equation-highlight">$$s_1 = ${s1_str}, s_2 = ${s2_str}$$</div>`;
                expectedQc = `C1*exp(${s1_val}*t) + C2*exp(${s2_val}*t)`;
                qc_ans = `C1*e^(${s1_str}*t) + C2*e^(${s2_str}*t)`;
                qc_sol = `<div class="equation-highlight">$$Q_c(t) = C_1 e^{${s1_str}t} + C_2 e^{${s2_str}t}$$</div>`;
            } else if (disc < -0.001) {
                const beta = Math.sqrt(-disc) / (2*L);
                s1_str = `${(-alpha).toFixed(4)} + ${beta.toFixed(4)}i`;
                s2_str = `${(-alpha).toFixed(4)} - ${beta.toFixed(4)}i`;
                roots_ans = `${s1_str}, ${s2_str}`;
                s1_val = math.complex(-alpha, beta);
                s2_val = math.complex(-alpha, -beta);
                roots_sol = `<p>Discriminant \\(\\Delta = R^2 - 4L/C = ${disc.toFixed(4)}\\). Since \\(\\Delta < 0\\), roots are complex conjugates.</p><div class="equation-highlight">$$s_1, s_2 = ${(-alpha).toFixed(4)} \\pm ${beta.toFixed(4)}i$$</div>`;
                expectedQc = `exp(${-alpha}*t)*(C1*cos(${beta}*t) + C2*sin(${beta}*t))`;
                qc_ans = `e^(${(-alpha).toFixed(4)}*t)*(C1*cos(${beta.toFixed(4)}*t) + C2*sin(${beta.toFixed(4)}*t))`;
                qc_sol = `<div class="equation-highlight">$$Q_c(t) = e^{${(-alpha).toFixed(4)}t} (C_1 \\cos(${beta.toFixed(4)}t) + C_2 \\sin(${beta.toFixed(4)}t))$$</div>`;
            } else {
                s1_val = -R / (2*L);
                s2_val = s1_val;
                s1_str = s1_val.toFixed(4);
                s2_str = s1_str;
                roots_ans = `${s1_str}, ${s2_str}`;
                roots_sol = `<p>Discriminant \\(\\Delta = R^2 - 4L/C \\approx 0\\). Roots are real and repeated.</p><div class="equation-highlight">$$s_1 = s_2 = ${s1_str}$$</div>`;
                expectedQc = `(C1 + C2*t)*exp(${s1_val}*t)`;
                qc_ans = `(C1 + C2*t)*e^(${s1_str}*t)`;
                qc_sol = `<div class="equation-highlight">$$Q_c(t) = (C_1 + C_2 t) e^{${s1_str}t}$$</div>`;
            }

            const qp_val = C * E;

            return [
                { title: 'Characteristic Equation', desc: `Write the characteristic equation derived from \\(L\\frac{d^2Q}{dt^2} + R\\frac{dQ}{dt} + \\frac{Q}{C} = E\\)`, hint: `e.g. ${L}*s^2 + ${R}*s + ${(1/C).toFixed(2)} = 0`, answer: () => `${L}*s^2 + ${R}*s + ${1/C}`, check: (ans) => this.checkCharEq(ans),
                    solution: () => `<p>The homogeneous equation gives the characteristic equation by replacing derivatives with \\(s\\):</p><div class="equation-highlight">$$${L}s^2 + ${R}s + ${(1/C).toFixed(4)} = 0$$</div>` },
                { title: 'Roots of the Equation', desc: 'Find the roots \\(s_1, s_2\\) of the characteristic equation.', hint: 'e.g. -2, -3 or -2+3i, -2-3i', answer: () => roots_ans, check: (ans) => this.checkRoots(ans, s1_val, s2_val),
                    solution: () => roots_sol },
                { title: 'Complementary Solution (Qc)', desc: `Write \\(Q_c(t)\\) using constants \\(C_1, C_2\\) based on the roots (${caseType}).`, hint: 'Use C1, C2, and t', answer: () => qc_ans, check: (ans) => this.checkQc(ans, expectedQc),
                    solution: () => qc_sol },
                { title: 'Particular Solution (Qp)', desc: 'Find the steady-state particular solution \\(Q_p\\).', hint: 'Enter a number', answer: () => `${qp_val}`, check: (ans) => Math.abs(parseFloat(ans) - qp_val) < Math.max(0.001, Math.abs(qp_val*0.01)),
                    solution: () => `<p>At steady state, derivatives are zero. Thus, \\(\\frac{Q_p}{C} = E \\implies Q_p = CE\\).</p><div class="equation-highlight">$$Q_p = ${C} \\times ${E} = ${qp_val.toFixed(6)}$$</div>` },
                { title: 'Final Equation for Charge Q(t)', desc: 'Write the complete solution \\(Q(t) = Q_c(t) + Q_p\\).', hint: 'Combine Qc and Qp', answer: () => `${qc_ans} + ${qp_val}`, check: (ans) => this.checkQc(ans, `${expectedQc} + ${qp_val}`),
                    solution: () => `<p>The total charge is the sum of the complementary and particular solutions:</p><div class="equation-highlight">$$Q(t) = ${qc_sol.replace(/<[^>]*>/g, '').replace('Q_c(t) = ', '')} + ${qp_val.toFixed(6)}$$</div>` }
            ];
        }
    },

    /* Numeric equivalence check: evaluate at multiple test points */
    checkNumeric(userExpr, expectedExpr, vars) {
        try {
            userExpr = this.normalizeExpr(userExpr);
            expectedExpr = this.normalizeExpr(expectedExpr);
            const testPoints = vars.length === 1
                ? [0.01, 0.1, 0.5, 1, 2, 5]
                : [[0.1, 1], [0.5, -2], [1, 0.5], [2, 3], [0.01, -0.5]];

            for (const pt of testPoints) {
                const scope = {};
                if (vars.length === 1) { scope[vars[0]] = pt; }
                else { vars.forEach((v, i) => scope[v] = pt[i]); }

                const userVal = math.evaluate(userExpr, scope);
                const expVal = math.evaluate(expectedExpr, scope);
                const tol = Math.max(Math.abs(expVal) * 0.02, 0.001);
                if (Math.abs(userVal - expVal) > tol) return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },

    checkWithConstant(userExpr, expectedExpr, vars) {
        return this.checkNumeric(userExpr, expectedExpr, vars);
    },

    checkCharEq(userExpr) {
        try {
            const { L, R, C } = this.values;
            const norm = this.normalizeExpr(userExpr.replace(/=.*/, ''));
            // Evaluate at a few values of s
            for (const s of [0, 1, -1, 2, 0.5]) {
                const uv = math.evaluate(norm, { s });
                const ev = L * s * s + R * s + 1 / C;
                const tol = Math.max(Math.abs(ev) * 0.02, 0.01);
                if (Math.abs(uv - ev) > tol) return false;
            }
            return true;
        } catch { return false; }
    },

    checkRoots(userExpr, s1_val, s2_val) {
        try {
            const parts = userExpr.split(',').map(p => math.evaluate(this.normalizeExpr(p.trim())));
            if (parts.length !== 2) return false;
            const p1 = parts[0], p2 = parts[1];
            const match1 = this.compareRoots(p1, s1_val) && this.compareRoots(p2, s2_val);
            const match2 = this.compareRoots(p1, s2_val) && this.compareRoots(p2, s1_val);
            return match1 || match2;
        } catch { return false; }
    },

    compareRoots(a, b) {
        const tol = 0.05;
        const aRe = a.re !== undefined ? a.re : (typeof a === 'number' ? a : 0);
        const aIm = a.im !== undefined ? a.im : 0;
        const bRe = b.re !== undefined ? b.re : (typeof b === 'number' ? b : 0);
        const bIm = b.im !== undefined ? b.im : 0;
        return Math.abs(aRe - bRe) < tol && Math.abs(aIm - bIm) < tol;
    },

    checkQc(userExpr, expectedExpr) {
        try {
            const uExp = this.normalizeExpr(userExpr);
            const eExp = this.normalizeExpr(expectedExpr);
            const testCases = [
                { t: 0.1, C1: 1, C2: 0 },
                { t: 0.1, C1: 0, C2: 1 },
                { t: 0.5, C1: 2, C2: -1 },
                { t: 1.0, C1: -0.5, C2: 0.5 }
            ];
            
            let matchStandard = true;
            let matchSwapped = true;
            
            for (const tc of testCases) {
                const uVal = math.evaluate(uExp, tc);
                const eVal = math.evaluate(eExp, tc);
                const eValSwapped = math.evaluate(eExp, { t: tc.t, C1: tc.C2, C2: tc.C1 });
                
                const tol1 = Math.max(Math.abs(eVal) * 0.05, 0.01);
                if (Math.abs(uVal - eVal) > tol1) matchStandard = false;
                
                const tol2 = Math.max(Math.abs(eValSwapped) * 0.05, 0.01);
                if (Math.abs(uVal - eValSwapped) > tol2) matchSwapped = false;
            }
            return matchStandard || matchSwapped;
        } catch (e) {
            return false;
        }
    },

    normalizeExpr(expr) {
        return expr
            .replace(/C_1/g, 'C1')
            .replace(/C_2/g, 'C2')
            .replace(/\^/g, '^')
            .replace(/e\^/g, 'exp')
            .replace(/exp\(([^)]+)\)/g, 'exp($1)')
            .replace(/exp([^(])/g, 'exp($1)')
            .replace(/(\d)([a-zA-Z])/g, '$1*$2')
            .replace(/\)\(/g, ')*(')
            .replace(/(\))(\d)/g, '$1*$2')
            .replace(/(\d)\(/g, '$1*(')
            .replace(/\bj\b/g, 'i');
    },

    showEquation() {
        const el = document.getElementById('simEquationDisplay');
        if (!el) return;
        const { R, L, C, E } = this.values;
        let html = '<h3>Governing Equation</h3>';
        if (this.type === 'RL') {
            html += `<div class="equation-highlight">$$${L}\\frac{dI}{dt} + ${R}I = ${E}$$</div>`;
            html += `<p>Standard form: \\(\\frac{dI}{dt} + ${(R/L).toFixed(4)}I = ${(E/L).toFixed(4)}\\)</p>`;
        } else if (this.type === 'RC') {
            html += `<div class="equation-highlight">$$${R}\\frac{dQ}{dt} + \\frac{Q}{${C}} = ${E}$$</div>`;
            html += `<p>Standard form: \\(\\frac{dQ}{dt} + ${(1/(R*C)).toFixed(4)}Q = ${(E/R).toFixed(4)}\\)</p>`;
        } else {
            html += `<div class="equation-highlight">$$${L}\\frac{d^2Q}{dt^2} + ${R}\\frac{dQ}{dt} + \\frac{Q}{${C}} = ${E}$$</div>`;
        }
        el.innerHTML = html;
        this.renderMath(el);
    },

    renderProgressTracker() {
        const el = document.getElementById('simProgressTracker');
        if (!el) return;
        const steps = this.getStepDefinitions();
        let html = '<div class="progress-tracker">';
        steps.forEach((s, i) => {
            const state = i < this.currentStep ? 'completed' : (i === this.currentStep ? 'active' : '');
            html += `<div class="progress-step ${state}"><div class="step-circle">${i < this.currentStep ? '✓' : i + 1}</div><span class="step-label">${s.title}</span></div>`;
            if (i < steps.length - 1) {
                const connState = i < this.currentStep ? 'completed' : (i === this.currentStep - 1 ? 'active' : '');
                html += `<div class="step-connector ${connState}"></div>`;
            }
        });
        html += '</div>';
        el.innerHTML = html;
    },

    renderSteps() {
        const el = document.getElementById('simSteps');
        if (!el) return;
        const steps = this.getStepDefinitions();
        let html = '';
        steps.forEach((s, i) => {
            const state = i < this.currentStep ? 'completed' : (i === this.currentStep ? 'active' : 'locked');
            html += `<div class="sim-step-card ${state}" id="step-card-${i}">
                <div class="sim-step-header">
                    <div class="sim-step-number">${i < this.currentStep ? '✓' : i + 1}</div>
                    <div><h4>Step ${i + 1}: ${s.title}</h4><p style="font-size:var(--text-sm);color:var(--text-secondary);margin-top:var(--space-1)">${s.desc}</p></div>
                </div>`;
            if (state === 'active') {
                html += `<div class="sim-step-input-row">
                    <div class="form-group"><label class="form-label">Your Answer</label><input type="text" class="form-input" id="step-input-${i}" placeholder="${s.hint}"><p class="form-hint">${s.hint}</p></div>
                    <button class="btn btn-primary" onclick="Simulation.submitStep(${i})">Submit</button>
                </div>`;
            }
            if (i < this.currentStep) {
                html += `<div class="sim-step-result ${this.scores[i] ? 'correct' : 'incorrect'}">${this.scores[i] ? '✅ Correct! +1 mark' : '❌ Incorrect'}</div>`;
                html += `<div class="solution-box"><h4>📝 Solution</h4>${s.solution()}</div>`;
            }
            html += '</div>';
        });
        el.innerHTML = html;
        this.renderMath(el);
    },

    submitStep(i) {
        const input = document.getElementById(`step-input-${i}`);
        if (!input) return;
        const ans = input.value.trim();
        if (!ans) { alert('Please enter your answer.'); return; }

        const steps = this.getStepDefinitions();
        const correct = steps[i].check(ans);
        this.scores[i] = correct ? 1 : 0;
        this.currentStep = i + 1;

        this.renderProgressTracker();
        this.renderSteps();

        if (this.currentStep >= this.totalSteps) this.showFinalScore();
        else document.getElementById(`step-card-${this.currentStep}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    showFinalScore() {
        const el = document.getElementById('simScoreDisplay');
        if (!el) return;
        const total = this.scores.reduce((a, b) => a + b, 0);
        const pct = Math.round((total / this.totalSteps) * 100);
        const emoji = pct >= 75 ? '🎉' : pct >= 50 ? '👍' : '💪';
        el.innerHTML = `<div class="score-display">
            <p style="font-size:var(--text-lg);margin-bottom:var(--space-2)">${emoji} Simulation Complete!</p>
            <div class="score-value text-gradient">${total} / ${this.totalSteps}</div>
            <p style="margin-top:var(--space-2);color:var(--text-secondary)">You scored ${pct}%</p>
            <button class="btn btn-primary" style="margin-top:var(--space-6)" onclick="Simulation.reset()">🔄 Try Again</button>
        </div>`;
        el.scrollIntoView({ behavior: 'smooth' });
    },

    reset() {
        this.currentStep = 0;
        this.scores = new Array(this.totalSteps || 4).fill(0);
        this.started = false;
        document.getElementById('simWorkspace').style.display = 'none';
        document.getElementById('simScoreDisplay').innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderMath(el) {
        if (typeof renderMathInElement === 'function') {
            renderMathInElement(el, { delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\(', right: '\\)', display: false }
            ], throwOnError: false });
        }
    }
};
