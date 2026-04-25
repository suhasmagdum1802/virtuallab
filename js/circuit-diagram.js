/* ============================================
   circuit-diagram.js — SVG Circuit Renderer
   ============================================ */

const CircuitDiagram = {
    colors: {
        wire: 'var(--text-primary)',
        component: 'var(--primary-500)',
        label: 'var(--text-secondary)',
        arrow: 'var(--accent-500)',
        battery: 'var(--success-500)',
    },

    /* Draw a resistor zigzag at (x, y) going right for given width */
    resistorPath(x, y, w) {
        const h = 14, segs = 5, segW = w / segs;
        let d = `M ${x} ${y}`;
        for (let i = 0; i < segs; i++) {
            const x1 = x + i * segW + segW * 0.25;
            const x2 = x + i * segW + segW * 0.75;
            const x3 = x + (i + 1) * segW;
            d += ` L ${x1} ${y - h} L ${x2} ${y + h} L ${x3} ${y}`;
        }
        return d;
    },

    /* Draw an inductor (bumps) at (x, y) going right */
    inductorPath(x, y, w) {
        const bumps = 4, bumpW = w / bumps;
        let d = `M ${x} ${y}`;
        for (let i = 0; i < bumps; i++) {
            const cx = x + i * bumpW + bumpW / 2;
            d += ` A ${bumpW / 2} ${bumpW / 2} 0 0 1 ${x + (i + 1) * bumpW} ${y}`;
        }
        return d;
    },

    /* Create SVG element with attributes */
    svgEl(tag, attrs = {}) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
        return el;
    },

    /* Create a text label */
    label(x, y, text, size = 14, anchor = 'middle') {
        return this.svgEl('text', { x, y, 'text-anchor': anchor, 'font-size': size, 'font-family': 'Inter, sans-serif', fill: this.colors.label, 'font-weight': '600' });
    },

    /* Draw RC circuit */
    drawRC(container, R, C, E, units = {}) {
        const uR = units.R || 'Ω', uC = units.C || 'F', uE = units.E || 'V';
        container.innerHTML = '';
        const svg = this.svgEl('svg', { viewBox: '0 0 500 320', width: '100%', height: '100%', style: 'max-height:280px' });

        // Wires — top, right, bottom, left
        const wireStyle = { stroke: this.colors.wire, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' };

        // Battery (left side, vertical)
        const batX = 60, batMid = 160;
        // top wire from battery to top-left corner
        svg.appendChild(this.svgEl('line', { x1: batX, y1: batMid - 10, x2: batX, y2: 50, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: batX, y1: 50, x2: 440, y2: 50, ...wireStyle }));
        // Battery symbol
        svg.appendChild(this.svgEl('line', { x1: batX - 20, y1: batMid - 10, x2: batX + 20, y2: batMid - 10, ...wireStyle, 'stroke-width': 3 }));
        svg.appendChild(this.svgEl('line', { x1: batX - 10, y1: batMid + 10, x2: batX + 10, y2: batMid + 10, ...wireStyle, 'stroke-width': 1.5 }));
        // + and - labels
        const plusLabel = this.label(batX - 30, batMid - 6, '+', 16); svg.appendChild(plusLabel); plusLabel.textContent = '+';
        const minLabel = this.label(batX - 25, batMid + 16, '−', 16); svg.appendChild(minLabel); minLabel.textContent = '−';
        // E label
        const eLabel = this.label(batX + 35, batMid + 5, `E=${E}${uE}`, 13); svg.appendChild(eLabel); eLabel.textContent = `E = ${E} ${uE}`;
        // bottom wire
        svg.appendChild(this.svgEl('line', { x1: batX, y1: batMid + 10, x2: batX, y2: 270, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: batX, y1: 270, x2: 440, y2: 270, ...wireStyle }));

        // Resistor (top side)
        const rPath = this.svgEl('path', { d: this.resistorPath(160, 50, 120), ...wireStyle, stroke: this.colors.component });
        svg.appendChild(rPath);
        // Wires to resistor
        svg.appendChild(this.svgEl('line', { x1: 60, y1: 50, x2: 160, y2: 50, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: 280, y1: 50, x2: 440, y2: 50, ...wireStyle }));
        const rLabel = this.label(220, 30, '', 13); svg.appendChild(rLabel); rLabel.textContent = `R = ${R} ${uR}`;

        // Capacitor (right side, vertical)
        const capX = 440, capY = 140;
        svg.appendChild(this.svgEl('line', { x1: capX, y1: 50, x2: capX, y2: capY - 12, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: capX - 20, y1: capY - 12, x2: capX + 20, y2: capY - 12, ...wireStyle, stroke: this.colors.component, 'stroke-width': 3 }));
        svg.appendChild(this.svgEl('line', { x1: capX - 20, y1: capY + 12, x2: capX + 20, y2: capY + 12, ...wireStyle, stroke: this.colors.component, 'stroke-width': 3 }));
        svg.appendChild(this.svgEl('line', { x1: capX, y1: capY + 12, x2: capX, y2: 270, ...wireStyle }));
        const cLabel = this.label(capX + 40, capY + 5, '', 13); svg.appendChild(cLabel); cLabel.textContent = `C = ${C} ${uC}`;

        // Current arrow (top wire)
        const arrowX = 120, arrowY = 42;
        svg.appendChild(this.svgEl('polygon', { points: `${arrowX},${arrowY - 5} ${arrowX + 10},${arrowY} ${arrowX},${arrowY + 5}`, fill: this.colors.arrow }));
        const iLabel = this.label(arrowX + 5, arrowY - 10, 'I', 13); svg.appendChild(iLabel); iLabel.textContent = 'I →';

        // Title
        const title = this.label(250, 305, 'RC Circuit', 15); svg.appendChild(title); title.textContent = 'RC Circuit';

        container.appendChild(svg);
    },

    /* Draw RL circuit */
    drawRL(container, R, L, E, units = {}) {
        const uR = units.R || 'Ω', uL = units.L || 'H', uE = units.E || 'V';
        container.innerHTML = '';
        const svg = this.svgEl('svg', { viewBox: '0 0 500 320', width: '100%', height: '100%', style: 'max-height:280px' });
        const wireStyle = { stroke: this.colors.wire, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' };

        // Battery (left)
        const batX = 60, batMid = 160;
        svg.appendChild(this.svgEl('line', { x1: batX, y1: 80, x2: batX, y2: 50, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: batX, y1: 50, x2: 440, y2: 50, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: batX - 20, y1: batMid - 10, x2: batX + 20, y2: batMid - 10, ...wireStyle, 'stroke-width': 3 }));
        svg.appendChild(this.svgEl('line', { x1: batX - 10, y1: batMid + 10, x2: batX + 10, y2: batMid + 10, ...wireStyle, 'stroke-width': 1.5 }));
        svg.appendChild(this.svgEl('line', { x1: batX, y1: 80, x2: batX, y2: batMid - 10, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: batX, y1: batMid + 10, x2: batX, y2: 270, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: batX, y1: 270, x2: 440, y2: 270, ...wireStyle }));
        const plusL = this.label(batX - 30, batMid - 6, '+', 16); svg.appendChild(plusL); plusL.textContent = '+';
        const minL = this.label(batX - 25, batMid + 16, '−', 16); svg.appendChild(minL); minL.textContent = '−';
        const eL = this.label(batX + 35, batMid + 5, '', 13); svg.appendChild(eL); eL.textContent = `E = ${E} ${uE}`;

        // Resistor (top)
        svg.appendChild(this.svgEl('path', { d: this.resistorPath(160, 50, 120), ...wireStyle, stroke: this.colors.component }));
        const rL = this.label(220, 30, '', 13); svg.appendChild(rL); rL.textContent = `R = ${R} ${uR}`;

        // Inductor (right side, vertical) — draw horizontally then rotate
        const indX = 440, indY = 130;
        svg.appendChild(this.svgEl('line', { x1: indX, y1: 50, x2: indX, y2: indY - 5, ...wireStyle }));
        const indPath = this.svgEl('path', { d: this.inductorPath(indX - 40, 0, 80), ...wireStyle, stroke: this.colors.component, transform: `translate(0, 0) rotate(90, ${indX}, ${indY + 30})` });
        // Simpler: draw bumps vertically
        let indD = `M ${indX} ${indY}`;
        const bumps = 4, bH = 80 / bumps;
        for (let i = 0; i < bumps; i++) {
            indD += ` A ${bH / 2} ${bH / 2} 0 0 0 ${indX} ${indY + (i + 1) * bH}`;
        }
        svg.appendChild(this.svgEl('path', { d: indD, ...wireStyle, stroke: this.colors.component }));
        svg.appendChild(this.svgEl('line', { x1: indX, y1: indY + 80, x2: indX, y2: 270, ...wireStyle }));
        const lL = this.label(indX + 35, indY + 40, '', 13); svg.appendChild(lL); lL.textContent = `L = ${L} ${uL}`;

        // Current arrow
        const arrowX = 120;
        svg.appendChild(this.svgEl('polygon', { points: `${arrowX},42 ${arrowX + 10},47 ${arrowX},52`, fill: this.colors.arrow }));
        const iL = this.label(arrowX + 5, 37, 'I →', 13); svg.appendChild(iL); iL.textContent = 'I →';

        const title = this.label(250, 305, 'RL Circuit', 15); svg.appendChild(title); title.textContent = 'RL Circuit';
        container.appendChild(svg);
    },

    /* Draw RLC circuit */
    drawRLC(container, R, L, C, E, units = {}) {
        const uR = units.R || 'Ω', uL = units.L || 'H', uC = units.C || 'F', uE = units.E || 'V';
        container.innerHTML = '';
        const svg = this.svgEl('svg', { viewBox: '0 0 520 360', width: '100%', height: '100%', style: 'max-height:300px' });
        const wireStyle = { stroke: this.colors.wire, 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' };

        // Battery left
        const bx = 60, bMid = 180;
        svg.appendChild(this.svgEl('line', { x1: bx, y1: 100, x2: bx, y2: 50, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: bx, y1: 50, x2: 460, y2: 50, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: bx - 20, y1: bMid - 10, x2: bx + 20, y2: bMid - 10, ...wireStyle, 'stroke-width': 3 }));
        svg.appendChild(this.svgEl('line', { x1: bx - 10, y1: bMid + 10, x2: bx + 10, y2: bMid + 10, ...wireStyle, 'stroke-width': 1.5 }));
        svg.appendChild(this.svgEl('line', { x1: bx, y1: 100, x2: bx, y2: bMid - 10, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: bx, y1: bMid + 10, x2: bx, y2: 300, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: bx, y1: 300, x2: 460, y2: 300, ...wireStyle }));
        const p = this.label(bx - 30, bMid - 6, '+'); svg.appendChild(p); p.textContent = '+';
        const m = this.label(bx - 25, bMid + 16, '−'); svg.appendChild(m); m.textContent = '−';
        const eL = this.label(bx + 35, bMid + 5, '', 13); svg.appendChild(eL); eL.textContent = `E = ${E} ${uE}`;

        // Resistor top
        svg.appendChild(this.svgEl('path', { d: this.resistorPath(130, 50, 100), ...wireStyle, stroke: this.colors.component }));
        const rL = this.label(180, 30, '', 13); svg.appendChild(rL); rL.textContent = `R = ${R} ${uR}`;

        // Inductor top (after resistor)
        let indD = `M 310 50`;
        const bumps = 4, bW = 80 / bumps;
        for (let i = 0; i < bumps; i++) {
            indD += ` A ${bW / 2} ${bW / 2} 0 0 1 ${310 + (i + 1) * bW} 50`;
        }
        svg.appendChild(this.svgEl('path', { d: indD, ...wireStyle, stroke: this.colors.component }));
        svg.appendChild(this.svgEl('line', { x1: 230, y1: 50, x2: 310, y2: 50, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: 390, y1: 50, x2: 460, y2: 50, ...wireStyle }));
        const lL = this.label(350, 30, '', 13); svg.appendChild(lL); lL.textContent = `L = ${L} ${uL}`;

        // Capacitor right side
        const cx = 460, cy = 160;
        svg.appendChild(this.svgEl('line', { x1: cx, y1: 50, x2: cx, y2: cy - 12, ...wireStyle }));
        svg.appendChild(this.svgEl('line', { x1: cx - 18, y1: cy - 12, x2: cx + 18, y2: cy - 12, ...wireStyle, stroke: this.colors.component, 'stroke-width': 3 }));
        svg.appendChild(this.svgEl('line', { x1: cx - 18, y1: cy + 12, x2: cx + 18, y2: cy + 12, ...wireStyle, stroke: this.colors.component, 'stroke-width': 3 }));
        svg.appendChild(this.svgEl('line', { x1: cx, y1: cy + 12, x2: cx, y2: 300, ...wireStyle }));
        const cL = this.label(cx + 35, cy + 5, '', 13); svg.appendChild(cL); cL.textContent = `C = ${C} ${uC}`;

        // Current arrow
        svg.appendChild(this.svgEl('polygon', { points: '100,42 110,47 100,52', fill: this.colors.arrow }));
        const iL = this.label(105, 37, 'I →', 13); svg.appendChild(iL); iL.textContent = 'I →';

        const title = this.label(260, 340, 'RLC Series Circuit', 15); svg.appendChild(title); title.textContent = 'RLC Series Circuit';
        container.appendChild(svg);
    },

    /* Main entry: draw circuit based on type */
    draw(container, type, values, units = {}) {
        const { R = 10, L = 0.5, C = 0.001, E = 12 } = values || {};
        switch (type) {
            case 'RC': this.drawRC(container, R, C, E, units); break;
            case 'RL': this.drawRL(container, R, L, E, units); break;
            case 'RLC': this.drawRLC(container, R, L, C, E, units); break;
        }
    }
};
