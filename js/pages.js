/* pages.js — Page Content Generators */

const Pages = {
    home() {
        return `
        <div class="hero">
            <div class="hero-bg">
                <div class="hero-grid"></div>
                <div class="hero-orb hero-orb-1"></div>
                <div class="hero-orb hero-orb-2"></div>
                <div class="hero-orb hero-orb-3"></div>
                <div class="hero-particles">
                    <div class="particle"></div><div class="particle"></div><div class="particle"></div>
                    <div class="particle"></div><div class="particle"></div><div class="particle"></div>
                </div>
            </div>
            <div class="container">
                <div class="hero-content">
                    <div class="hero-badge"><span class="section-badge">⚡ Interactive Learning Platform</span></div>
                    <h1>Virtual Lab on<br><span class="text-gradient">Electrical Circuit</span></h1>
                    <p class="hero-subtitle">Master RC, RL &amp; RLC circuit equations through guided, step-by-step problem solving with instant verification. Learn by doing, not just reading.</p>
                    <div class="hero-actions">
                        <a href="#simulation" class="btn btn-primary btn-lg">🔬 Start Simulation</a>
                        <a href="#theory" class="btn btn-secondary btn-lg">📖 View Theory</a>
                        <a href="#test" class="btn btn-accent btn-lg">📝 Take Test</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" style="background:var(--bg-secondary)">
            <div class="container">
                <div class="section-header">
                    <span class="section-badge">✨ Features</span>
                    <h2>Learn Circuits the <span class="text-gradient">Smart Way</span></h2>
                    <p>Our virtual lab guides you through every step of solving circuit differential equations, building real understanding.</p>
                </div>
                <div class="features-grid">
                    <div class="card feature-card"><span class="feature-icon">🎯</span><h3>Step-by-Step Solving</h3><p>Work through each stage of the solution — integrating factor, general equation, constants, and final answer — at your own pace.</p></div>
                    <div class="card feature-card"><span class="feature-icon">✅</span><h3>Instant Verification</h3><p>Submit your answer at each step and get immediate feedback. The system checks mathematical equivalence, not just exact strings.</p></div>
                    <div class="card feature-card"><span class="feature-icon">📊</span><h3>Guided Learning</h3><p>Solutions are revealed after each attempt so you always learn the correct method, even if your answer was wrong.</p></div>
                    <div class="card feature-card"><span class="feature-icon">🔬</span><h3>Live Circuit Diagrams</h3><p>Dynamic SVG circuit schematics update in real-time as you select different circuit types and enter component values.</p></div>
                    <div class="card feature-card"><span class="feature-icon">📐</span><h3>LaTeX Equations</h3><p>Beautiful, properly formatted mathematical equations rendered with KaTeX for a professional, textbook-quality experience.</p></div>
                    <div class="card feature-card"><span class="feature-icon">🏆</span><h3>Score &amp; Progress</h3><p>Earn marks for each correct step and track your progress with a visual progress tracker that keeps you motivated.</p></div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="container">
                <div class="section-header">
                    <span class="section-badge">🚀 How It Works</span>
                    <h2>Three Simple Steps</h2>
                </div>
                <div class="how-it-works-grid">
                    <div class="step-card"><h3>Choose Your Circuit</h3><p>Select RC, RL, or RLC circuit type and enter the component values — resistance, inductance, capacitance, and EMF.</p></div>
                    <div class="step-card"><h3>Solve Step by Step</h3><p>Work through the differential equation: find the integrating factor, write the general solution, determine constants, and derive the final equation.</p></div>
                    <div class="step-card"><h3>Learn &amp; Improve</h3><p>Get instant feedback on each step. View detailed solutions, earn marks, and build a deep understanding of circuit analysis.</p></div>
                </div>
            </div>
        </div>

        <div class="section" style="background:var(--bg-secondary)">
            <div class="container">
                <div class="stats-bar">
                    <div class="stat-item"><div class="stat-value">3</div><div class="stat-label">Circuit Types</div></div>
                    <div class="stat-item"><div class="stat-value">4</div><div class="stat-label">Solving Steps</div></div>
                    <div class="stat-item"><div class="stat-value">10</div><div class="stat-label">Quiz Questions</div></div>
                    <div class="stat-item"><div class="stat-value">∞</div><div class="stat-label">Practice Runs</div></div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="container">
                <div class="cta-banner">
                    <h2>Ready to <span class="text-gradient">Master Circuits</span>?</h2>
                    <p>Start solving differential equations with our interactive simulator. No textbook needed — just your brain and curiosity.</p>
                    <a href="#simulation" class="btn btn-primary btn-lg">⚡ Launch Simulator</a>
                </div>
            </div>
        </div>`;
    },

    aim() {
        return `<div class="aim-page">
            <h1>Aim</h1>
            <p>The aim of this virtual laboratory is to provide an interactive and self-guided platform for undergraduate engineering students to understand and solve the differential equations governing fundamental electrical circuits, namely RC, RL, and RLC series circuits.</p>
            <h2>Purpose</h2>
            <p>In traditional classroom settings, students often rely on directly copying final solutions from textbooks or instructors without fully grasping the intermediate mathematical steps involved. This virtual lab addresses that gap by requiring the student to work through each step of the solution independently before the correct answer is revealed.</p>
            <p>By entering their own answers at every stage — from computing the integrating factor to determining the integration constant and writing the final current equation — students develop a stronger conceptual and procedural understanding of first-order and second-order ordinary differential equations as applied to electrical circuits.</p>
            <h2>Scope</h2>
            <p>This platform covers the analysis of series RC circuits during capacitor charging, series RL circuits during current growth, and series RLC circuits with their characteristic equation and damping behaviour. The mathematical methods employed include the integrating factor technique for first-order linear differential equations and the characteristic equation approach for second-order circuits.</p>
            <p>The virtual lab is designed to complement the B.Tech first-year curriculum in Engineering Mathematics and Basic Electrical Engineering, providing students with a practical, hands-on tool to reinforce theoretical knowledge through guided problem-solving practice.</p>
        </div>`;
    },

    theory() {
        return `<div class="theory-page">
            <div class="section-header"><span class="section-badge">📖 Theory</span><h2>Electrical Circuit Theory</h2><p>A comprehensive guide to RC, RL, and RLC circuits for B.Tech first-year students.</p></div>

            <div class="theory-section">
                <h2>1. First-Order Linear ODE</h2>
                <p>Many electrical circuits are governed by first-order linear ordinary differential equations of the form:</p>
                <div class="equation-highlight">$$\\frac{dy}{dt} + P(t)\\,y = Q(t)$$</div>
                <p>To solve this, we use the <strong>Integrating Factor (IF)</strong> method. The integrating factor is defined as:</p>
                <div class="equation-highlight">$$\\text{IF} = e^{\\int P(t)\\,dt}$$</div>
                <p>Multiplying both sides by the IF and integrating gives the general solution:</p>
                <div class="equation-highlight">$$y \\cdot \\text{IF} = \\int Q(t) \\cdot \\text{IF}\\;dt + K$$</div>
                <p>where \\(K\\) is the integration constant determined by initial conditions.</p>
            </div>

            <div class="theory-section">
                <h2>2. RC Circuit (Charging)</h2>
                <p>An RC circuit consists of a resistor \\(R\\) and a capacitor \\(C\\) connected in series with an EMF source \\(E\\). When the switch is closed, the capacitor begins to charge.</p>
                <p>Applying Kirchhoff's Voltage Law (KVL):</p>
                <div class="equation-highlight">$$E = IR + \\frac{Q}{C}$$</div>
                <p>Since \\(I = \\frac{dQ}{dt}\\), we rewrite:</p>
                <div class="equation-highlight">$$\\frac{dQ}{dt} + \\frac{1}{RC}\\,Q = \\frac{E}{R}$$</div>
                <p>This is a first-order linear ODE with \\(P = \\frac{1}{RC}\\) and \\(Q(t) = \\frac{E}{R}\\).</p>
                <h3>Solution</h3>
                <p><strong>Integrating Factor:</strong> \\(\\text{IF} = e^{t/(RC)}\\)</p>
                <p><strong>General solution for charge:</strong></p>
                <div class="equation-highlight">$$Q = CE + K\\,e^{-t/(RC)}$$</div>
                <p>At \\(t = 0\\), \\(Q = 0\\): thus \\(K = -CE\\).</p>
                <div class="equation-highlight">$$Q(t) = CE\\left(1 - e^{-t/(RC)}\\right)$$</div>
                <p><strong>Current:</strong></p>
                <div class="equation-highlight">$$I(t) = \\frac{dQ}{dt} = \\frac{E}{R}\\,e^{-t/(RC)}$$</div>
                <h3>Time Constant</h3>
                <p>The time constant \\(\\tau = RC\\) is the time at which the charge reaches approximately 63.2% of its maximum value \\(CE\\). After \\(5\\tau\\), the capacitor is considered fully charged.</p>
            </div>

            <div class="theory-section">
                <h2>3. RL Circuit (Current Growth)</h2>
                <p>An RL circuit consists of a resistor \\(R\\) and an inductor \\(L\\) in series with an EMF source \\(E\\). When the switch is closed, current begins to grow.</p>
                <p>Applying KVL:</p>
                <div class="equation-highlight">$$E = L\\frac{dI}{dt} + RI$$</div>
                <p>Rewriting in standard form:</p>
                <div class="equation-highlight">$$\\frac{dI}{dt} + \\frac{R}{L}\\,I = \\frac{E}{L}$$</div>
                <h3>Solution</h3>
                <p><strong>Integrating Factor:</strong> \\(\\text{IF} = e^{Rt/L}\\)</p>
                <p><strong>General solution:</strong></p>
                <div class="equation-highlight">$$I = \\frac{E}{R} + K\\,e^{-Rt/L}$$</div>
                <p>At \\(t = 0\\), \\(I = 0\\): thus \\(K = -\\frac{E}{R}\\).</p>
                <div class="equation-highlight">$$I(t) = \\frac{E}{R}\\left(1 - e^{-Rt/L}\\right)$$</div>
                <h3>Time Constant</h3>
                <p>The time constant \\(\\tau = \\frac{L}{R}\\). At \\(t = \\tau\\), the current reaches about 63.2% of its steady-state value \\(\\frac{E}{R}\\).</p>
            </div>

            <div class="theory-section">
                <h2>4. RLC Series Circuit</h2>
                <p>An RLC circuit has a resistor, inductor, and capacitor in series. Applying KVL:</p>
                <div class="equation-highlight">$$L\\frac{d^2Q}{dt^2} + R\\frac{dQ}{dt} + \\frac{Q}{C} = E$$</div>
                <p>This is a <strong>second-order linear ODE</strong>. The homogeneous equation has the characteristic equation:</p>
                <div class="equation-highlight">$$Ls^2 + Rs + \\frac{1}{C} = 0$$</div>
                <p>The roots are:</p>
                <div class="equation-highlight">$$s = \\frac{-R \\pm \\sqrt{R^2 - \\frac{4L}{C}}}{2L}$$</div>

            </div>

            <div class="theory-section">
                <h2>5. Charging and Discharging</h2>
                <p><strong>Charging:</strong> When an uncharged capacitor is connected to an EMF source through a resistor, charge builds up exponentially according to \\(Q = CE(1 - e^{-t/\\tau})\\). The current starts at \\(E/R\\) and decays exponentially to zero.</p>
                <p><strong>Discharging:</strong> When a charged capacitor discharges through a resistor, \\(Q = Q_0\\,e^{-t/\\tau}\\) and \\(I = -\\frac{Q_0}{RC}\\,e^{-t/\\tau}\\). Both charge and current decay exponentially.</p>
                <p><strong>Current Growth (RL):</strong> In an RL circuit, current grows from zero to \\(E/R\\) as \\(I = \\frac{E}{R}(1 - e^{-t/\\tau})\\). The inductor opposes changes in current.</p>
                <p><strong>Current Decay (RL):</strong> When the source is removed, current decays as \\(I = I_0\\,e^{-t/\\tau}\\).</p>
            </div>
        </div>`;
    },

    simulation() {
        return `<div class="sim-page">
            <div class="section-header"><span class="section-badge">🔬 Simulation</span><h2>Circuit Equation Solver</h2><p>Select a circuit, enter values, and solve the governing equation step by step.</p></div>

            <div class="sim-config">
                <div class="sim-config-left">
                    <div>
                        <label class="form-label">Circuit Type</label>
                        <div class="tabs" id="circuitTabs">
                            <button class="tab-btn active" data-type="RL" id="tab-RL">RL</button>
                            <button class="tab-btn" data-type="RC" id="tab-RC">RC</button>
                            <button class="tab-btn" data-type="RLC" id="tab-RLC">RLC</button>
                        </div>
                    </div>
                    <div class="sim-inputs-grid" id="simInputs">
                        <div class="form-group">
                            <label class="form-label">Resistance R</label>
                            <div style="display:flex;gap:8px">
                                <input type="number" class="form-input" id="input-R" value="10" min="0.1" step="any">
                                <select class="form-select" id="unit-R" style="width:auto">
                                    <option value="1">Ω</option>
                                    <option value="1e3">kΩ</option>
                                    <option value="1e6">MΩ</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" id="group-L">
                            <label class="form-label">Inductance L</label>
                            <div style="display:flex;gap:8px">
                                <input type="number" class="form-input" id="input-L" value="0.5" min="0.001" step="any">
                                <select class="form-select" id="unit-L" style="width:auto">
                                    <option value="1">H</option>
                                    <option value="1e-3">mH</option>
                                    <option value="1e-6">µH</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" id="group-C" style="display:none">
                            <label class="form-label">Capacitance C</label>
                            <div style="display:flex;gap:8px">
                                <input type="number" class="form-input" id="input-C" value="1" min="0.000001" step="any">
                                <select class="form-select" id="unit-C" style="width:auto">
                                    <option value="1">F</option>
                                    <option value="1e-3" selected>mF</option>
                                    <option value="1e-6">µF</option>
                                    <option value="1e-9">nF</option>
                                    <option value="1e-12">pF</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group"><label class="form-label">EMF E (V)</label><input type="number" class="form-input" id="input-E" value="12" min="0.1" step="any"></div>
                    </div>
                    <button class="btn btn-primary" id="startSimBtn" style="width:100%">🚀 Start Solving</button>
                </div>
                <div class="sim-config-right">
                    <div class="circuit-diagram-container" id="circuitDiagram"></div>
                </div>
            </div>

            <div id="simWorkspace" style="display:none">
                <div class="sim-equation-display" id="simEquationDisplay"></div>
                <div id="simProgressTracker" style="margin:var(--space-6) 0"></div>
                <div id="simSteps"></div>
                <div id="simScoreDisplay"></div>
            </div>
        </div>`;
    },

    test() {
        return `<div class="quiz-page">
            <div class="section-header"><span class="section-badge">📝 Test</span><h2>Circuit Theory Quiz</h2><p>Test your knowledge with 10 questions on RC, RL, RLC circuits and related mathematics.</p></div>
            <div id="quizContainer"></div>
        </div>`;
    },

    contributors() {
        return `<div class="section">
            <div class="container">
                <div class="section-header"><span class="section-badge">👥 Our Team</span><h2>Contributors</h2><p>The people behind this virtual laboratory.</p><p style="margin-top:var(--space-2);font-size:var(--text-base);color:var(--primary-500);font-weight:600">Pimpri Chinchwad College of Engineering, Pune</p></div>
                <div class="team-grid">
                    <div class="card team-card"><div class="team-avatar">SM</div><h3>Suhas Magdum</h3><p class="team-role">Developer</p><p class="team-college">PCCoE, Pune</p><p style="margin-top:var(--space-3);font-size:var(--text-sm)">Designed and developed the virtual lab platform, simulation engine, and user interface.</p></div>
                    <div class="card team-card"><div class="team-avatar">SN</div><h3>Siddhant Naikwade</h3><p class="team-role">Developer</p><p class="team-college">PCCoE, Pune</p><p style="margin-top:var(--space-3);font-size:var(--text-sm)">Contributed to the simulation logic, theory content, and quiz module development.</p></div>
                    <div class="card team-card"><div class="team-avatar team-avatar-img" style="background:none;border:3px solid var(--warning-500)"><img src="https://fe.pccoepune.com/images/faculty/ganesh-tarte.JPG" alt="Mr. Ganesh Tarte" style="width:100%;height:100%;border-radius:50%;object-fit:cover"></div><h3>Mr. Ganesh Tarte</h3><p class="team-role">Mentor</p><p class="team-college">PCCoE, Pune</p><p style="margin-top:var(--space-3);font-size:var(--text-sm)">Provided academic guidance, reviewed content accuracy, and mentored the project development.</p></div>
                </div>
            </div>
        </div>`;
    },

    references() {
        return `<div class="ref-page">
            <div class="section-header"><span class="section-badge">📚 References</span><h2>References &amp; Resources</h2><p>Recommended reading and learning materials for electrical circuit analysis.</p></div>
            <div class="ref-list">
                <div class="card ref-item"><span class="ref-number">1</span><div class="ref-content"><h4>Engineering Circuit Analysis</h4><p>W.H. Hayt, J.E. Kemmerly, S.M. Durbin — McGraw-Hill Education. A widely used textbook for undergraduate circuit analysis covering all fundamental topics.</p></div></div>
                <div class="card ref-item"><span class="ref-number">2</span><div class="ref-content"><h4>Higher Engineering Mathematics</h4><p>B.S. Grewal — Khanna Publishers. Comprehensive reference for differential equations, integrating factor method, and applied mathematics for engineers.</p></div></div>
                <div class="card ref-item"><span class="ref-number">3</span><div class="ref-content"><h4>Fundamentals of Electric Circuits</h4><p>C.K. Alexander, M.N.O. Sadiku — McGraw-Hill. Covers first-order and second-order circuits, transient analysis, and time-domain response.</p></div></div>
                <div class="card ref-item"><span class="ref-number">4</span><div class="ref-content"><h4>NPTEL — Basic Electrical Engineering</h4><p>Free video lectures from IITs on circuit theory and network analysis.</p><a href="https://nptel.ac.in" target="_blank" rel="noopener">nptel.ac.in</a></div></div>
                <div class="card ref-item"><span class="ref-number">5</span><div class="ref-content"><h4>Khan Academy — Differential Equations</h4><p>Introduction to first-order ODEs, integrating factors, and applications in physics and engineering.</p><a href="https://www.khanacademy.org/math/differential-equations" target="_blank" rel="noopener">khanacademy.org</a></div></div>
                <div class="card ref-item"><span class="ref-number">6</span><div class="ref-content"><h4>MIT OpenCourseWare — Circuits and Electronics</h4><p>Lecture notes and problem sets from MIT covering RC, RL, and RLC circuit transients.</p><a href="https://ocw.mit.edu" target="_blank" rel="noopener">ocw.mit.edu</a></div></div>
                <div class="card ref-item"><span class="ref-number">7</span><div class="ref-content"><h4>Advanced Engineering Mathematics</h4><p>Erwin Kreyszig — Wiley. Standard reference for second-order ODEs, Laplace transforms, and their circuit applications.</p></div></div>
            </div>
        </div>`;
    },

    feedback() {
        return `<div class="feedback-page">
            <div class="section-header"><span class="section-badge">💬 Feedback</span><h2>Share Your Feedback</h2><p>Help us improve this virtual lab with your valuable suggestions.</p></div>
            <div class="card" style="padding:var(--space-8)">
                <form id="feedbackForm">
                    <div class="form-group"><label class="form-label">Name</label><input type="text" class="form-input" id="fb-name" required placeholder="Your full name"></div>
                    <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="fb-email" required placeholder="your@email.com"></div>
                    <div class="form-group"><label class="form-label">Rating</label><div class="star-rating" id="starRating"><span class="star" data-v="1">★</span><span class="star" data-v="2">★</span><span class="star" data-v="3">★</span><span class="star" data-v="4">★</span><span class="star" data-v="5">★</span></div></div>
                    <div class="form-group"><label class="form-label">Message</label><textarea class="form-textarea" id="fb-message" required placeholder="Tell us what you think..."></textarea></div>
                    <button type="submit" class="btn btn-primary" style="width:100%">Submit Feedback</button>
                </form>
            </div>
        </div>`;
    },

    contact() {
        return `<div class="contact-page">
            <div class="section-header"><span class="section-badge">📞 Contact</span><h2>Get in Touch</h2><p>Have a question or suggestion? Reach out to us.</p></div>
            <div class="contact-grid">
                <div class="contact-info-cards">
                    <div class="card contact-info-card"><div class="contact-icon">📧</div><div><h4>Email</h4><p>suhas.magdum25@pccoepune.org</p></div></div>
                    <div class="card contact-info-card"><div class="contact-icon">📱</div><div><h4>Phone</h4><p>+91 8983902911</p></div></div>
                    <div class="card contact-info-card"><div class="contact-icon">📍</div><div><h4>Location</h4><p>Pimpri Chinchwad College of Engineering, Pune</p></div></div>
                    <div class="card contact-info-card"><div class="contact-icon">🕐</div><div><h4>Availability</h4><p>Monday – Saturday, 9:00 AM – 6:00 PM IST</p></div></div>
                </div>
                <div class="card" style="padding:var(--space-6)">
                    <h3 style="margin-bottom:var(--space-5)">Send a Message</h3>
                    <form id="contactForm">
                        <div class="form-group"><label class="form-label">Name</label><input type="text" class="form-input" required placeholder="Your name"></div>
                        <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" required placeholder="your@email.com"></div>
                        <div class="form-group"><label class="form-label">Subject</label><input type="text" class="form-input" required placeholder="Subject"></div>
                        <div class="form-group"><label class="form-label">Message</label><textarea class="form-textarea" required placeholder="Your message..."></textarea></div>
                        <button type="submit" class="btn btn-primary" style="width:100%">Send Message</button>
                    </form>
                </div>
            </div>
        </div>`;
    }
};
