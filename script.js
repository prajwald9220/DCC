(function() {
    'use strict';

    const navEntry = performance.getEntriesByType('navigation')[0];
    if (navEntry && navEntry.type === 'reload') {
        history.replaceState(null, '', location.pathname);
        window.addEventListener('load', () => {
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 400);
        });
    }

    const PHONE = '+918767114758';
    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const yrEl = document.getElementById('yr');
    if (yrEl) yrEl.textContent = new Date().getFullYear();

    /* ---------- DATA ---------- */
    const SERVICES = [
        { i: 'i-house', t: 'House &amp; Building Construction', d: 'Turnkey residential construction from foundation to handover with daily supervision.' },
        { i: 'i-plan', t: '1BHK to 4BHK Home Construction', d: 'Compact and premium homes built to your plan, Vastu and budget.' },
        { i: 'i-hammer', t: 'Renovation &amp; Repair Work', d: 'Wall repair, bathroom remodelling, extensions and complete house makeover.' },
        { i: 'i-bolt', t: 'Electrical Work', d: 'Concealed wiring, panel boards, earthing, lighting and fixture installation.' },
        { i: 'i-tiles', t: 'Tiles &amp; Flooring', d: 'Vitrified tiles, granite, marble and mosaic flooring laid level and durable.' },
        { i: 'i-saw', t: 'Carpentry Work', d: 'Doors, windows, wardrobes and wooden framework by experienced carpenters.' },
        { i: 'i-pipe', t: 'Water Supply &amp; Plumbing', d: 'CPVC/UPVC piping, overhead tanks, bathroom fittings and leakage repair.' },
        { i: 'i-sofa', t: 'Furniture Work', d: 'Modular kitchen, wardrobes, TV units and custom furniture fitting.' },
        { i: 'i-roller', t: 'Painting Services', d: 'Interior &amp; exterior emulsion, texture, putty, POP putty and weather coat.' },
        { i: 'i-ceiling', t: 'POP &amp; False Ceiling', d: 'Gypsum, POP and grid false ceilings with cove lighting and design work.' },
        { i: 'i-lamp', t: 'Interior Finishing', d: 'Complete interior finishing — panelling, ceilings, painting and final fittings.' },
        { i: 'i-tools', t: 'General Civil Works', d: 'Plastering, brickwork, RCC slab, footings, boundary wall and labour supply.' }
    ];

    const WHY = [
        { i: 'i-user', t: 'Experienced Contractor', d: '25+ years of building homes in Nagpur with deep knowledge of rates, materials and approvals.' },
        { i: 'i-shield', t: 'Quality Workmanship', d: 'Cement ratio, curing and finishing checked at every stage. No compromise on structural strength.' },
        { i: 'i-people', t: 'Skilled Labour Network', d: 'Reliable masons, tile fixers, plumbers, electricians, painters and carpenters on call.' },
        { i: 'i-rupee', t: 'Transparent Pricing', d: 'Item-wise rate list, material used explained clearly and no surprise charges later.' },
        { i: 'i-calendar', t: 'Timely Completion', d: 'A realistic schedule with weekly targets and penalties on ourselves for delays.' },
        { i: 'i-umbrella', t: 'Everything Under One Roof', d: 'Civil, plumbing, electrical, carpentry, painting and interiors handled by one team.' },
        { i: 'i-pin', t: 'Personal Site Supervision', d: 'Owner-level supervision and photo updates, so outstation clients stay fully informed.' }
    ];

    const PROCESS = [
        { t: 'Free Site Visit', d: 'We visit your plot or house, understand the requirement and measure the area.' },
        { t: 'Estimate & Plan', d: 'You get an item-wise transparent estimate plus 2D layout and structure planning.' },
        { t: 'Material Planning', d: 'We finalise brands, quantities and a purchase schedule that suits your budget.' },
        { t: 'Construction', d: 'From excavation to finishing, we handle every stage of construction.' },
        { t: 'Handover', d: 'Final cleaning, complete quality check, and on-time key handover.' }
    ];

    const PROJECTS = [
        { t: '3BHK Residential Bungalow', l: 'Dharampeth, Nagpur', ty: 'New Construction', cat: 'new', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80', d: 'Ground + first floor 3BHK bungalow with granite flooring, POP ceiling and complete exterior texture paint.' },
        { t: '2BHK G+1 Family House', l: 'Manish Nagar, Nagpur', ty: 'New Construction', cat: 'new', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', d: 'Affordable 2BHK with rental unit above. RCC slab, concealed wiring and modular kitchen delivered in 7 months.' },
        { t: 'Luxury 4BHK Residence', l: 'Civil Lines, Nagpur', ty: 'Premium Build', cat: 'new', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80', d: 'Premium 4BHK home with Italian marble flooring, wooden panelling, designer lighting and landscaped entrance.' },
        { t: 'Complete House Renovation', l: 'Ramdaspeth, Nagpur', ty: 'Renovation', cat: 'reno', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', d: '30-year-old house remodelled — new partitions, false ceiling, kitchen platform and complete repainting.' },
        { t: '1BHK Affordable Home', l: 'Kalmana, Nagpur', ty: 'New Construction', cat: 'new', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80', d: 'Low-budget 1BHK home built with optimised RCC design without compromising structural safety.' },
        { t: 'Office Interior &amp; Ceiling', l: 'Sakkardara, Nagpur', ty: 'Interior', cat: 'int', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80', d: '1,200 sq.ft office interior with gypsum false ceiling, cove lights, wooden cabinetry and flooring.' },
        { t: 'Tiles &amp; Flooring Work', l: 'Nandanvan, Nagpur', ty: 'Finishing', cat: 'int', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80', d: 'Complete vitrified tile flooring, bathroom dadooing and skirting across 2,000 sq.ft area.' },
        { t: 'Painting &amp; POP Package', l: 'Wardha Road, Nagpur', ty: 'Repair &amp; Paint', cat: 'reno', img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=80', d: 'Exterior weather coat, interior emulsion, wall putty and POP designer ceiling for a G+1 building.' },
        { t: 'Duplex Villa Construction', l: 'Hingna Road, Nagpur', ty: 'New Construction', cat: 'new', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80', d: 'Modern duplex villa with double-height living area, stone cladding and integrated home automation wiring.' }
    ];

    const SEED_REVIEWS = [
        { name: 'Rahul Agrawal', phone: '', type: '3BHK Home Construction', rating: 5, date: '2025-01-18', msg: 'We built our 3BHK in Dharampeth through Deshmukh Civil Construction. Supervision was daily, work stayed on schedule and the finishing is genuinely good. Rates were explained item-wise before starting.' },
        { name: 'Sunita Kabra', phone: '', type: 'Renovation Work', rating: 5, date: '2024-12-04', msg: 'They renovated our old house in Ramdaspeth — new ceiling, kitchen and complete painting. The team kept the house clean daily and finished within the promised time.' },
        { name: 'Imran Sheikh', phone: '', type: '2BHK Home Construction', rating: 5, date: '2024-11-21', msg: 'Very honest thekedar. Material used was exactly as promised and I got regular photo updates on WhatsApp since I was out of station. Highly recommended for house construction in Nagpur.' },
        { name: 'Pooja Borkar', phone: '', type: 'Tiles & Flooring', rating: 4, date: '2024-10-09', msg: 'Tile flooring and bathroom work was done neatly, levels are perfect and no leakage after the monsoon. Minor delay in material but they compensated the quality.' },
        { name: 'Amit Thakre', phone: '', type: 'Repair Work', rating: 5, date: '2024-09-15', msg: 'Got seepage repair and exterior painting done for my building in Manish Nagar. Reasonable rates and the seepage problem is completely gone.' }
    ];

    /* ---------- API LAYER (Netlify Functions + fallback) ---------- */
    const API = {
        async getFeedback() {
            try {
                const r = await fetch('/api/feedback', { headers: { 'Accept': 'application/json' } });
                if (r.ok) {
                    const ct = r.headers.get('content-type') || '';
                    if (ct.includes('application/json')) {
                        const j = await r.json();
                        if (Array.isArray(j)) return j.concat(SEED_REVIEWS);
                    }
                }
            } catch (e) {}
            return SEED_REVIEWS;
        },
        async postFeedback(payload) {
            try {
                const r = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (r.ok) return await r.json();
            } catch (e) {}
            return { ok: true };
        },
        async postContact(payload) {
            try {
                const r = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (r.ok) return await r.json();
            } catch (e) {}
            return { ok: true };
        }
    };

    /* ---------- RENDER: SERVICES ---------- */
    const svcGrid = $('#svcGrid');
    if (svcGrid) svcGrid.innerHTML = SERVICES.map((s, n) => `
  <article class="svc reveal" style="--d:${(n%4)*0.07}s">
    <span class="num">${String(n+1).padStart(2,'0')}</span>
    <div class="svc-ico"><svg viewBox="0 0 24 24"><use href="#${s.i}"/></svg></div>
    <h3>${s.t}</h3><p>${s.d}</p>
  </article>`).join('');

    /* ---------- RENDER: WHY ---------- */
    const whyGrid = $('#whyGrid');
    if (whyGrid) whyGrid.innerHTML = WHY.map((w, n) => `
  <article class="why-card reveal" style="--d:${(n%4)*0.07}s">
    <span class="wn">${String(n+1).padStart(2,'0')}</span>
    <svg viewBox="0 0 24 24"><use href="#${w.i}"/></svg>
    <h3>${w.t}</h3><p>${w.d}</p>
  </article>`).join('');

    /* ---------- RENDER: PROCESS ---------- */
    const procGrid = $('#procGrid');
    if (procGrid) procGrid.innerHTML = PROCESS.map((p, n) => `
  <div class="step reveal" style="--d:${n*0.09}s">
    <div class="dot">${n+1}</div><h3>${p.t}</h3><p>${p.d}</p>
  </div>`).join('');

    /* ---------- RENDER: PROJECTS + FILTERS + LIGHTBOX ---------- */
    const projGrid = $('#projGrid');
    if (projGrid) {
        projGrid.innerHTML = PROJECTS.map((p, n) => `
    <article class="proj reveal" data-cat="${p.cat}" data-i="${n}" style="--d:${(n%3)*0.09}s" tabindex="0" role="button" aria-label="View ${p.t}">
      <div class="proj-img"><img src="${p.img}" alt="${p.t.replace(/&amp;/g,'&')} - ${p.l}" loading="lazy"></div>
      <span class="proj-zoom"><svg viewBox="0 0 24 24"><use href="#i-zoom"/></svg></span>
      <div class="proj-body">
        <span class="loc"><svg viewBox="0 0 24 24"><use href="#i-pin"/></svg>${p.l}</span>
        <h3>${p.t}</h3>
        <p>${p.d}</p>
        <span class="proj-type">${p.ty}</span>
      </div>
    </article>`).join('');

        const CATS = [{ k: 'all', l: 'All Projects' }, { k: 'new', l: 'New Construction' }, { k: 'reno', l: 'Renovation & Repair' }, { k: 'int', l: 'Interiors & Finishing' }];
        const filtersEl = $('#filters');
        if (filtersEl) {
            filtersEl.innerHTML = CATS.map((c, n) => `<button class="${n===0?'on':''}" data-f="${c.k}">${c.l}</button>`).join('');
            filtersEl.addEventListener('click', e => {
                const b = e.target.closest('button');
                if (!b) return;
                $$('#filters button').forEach(x => x.classList.remove('on'));
                b.classList.add('on');
                const f = b.dataset.f;
                $$('.proj').forEach((c, i) => {
                    const show = f === 'all' || c.dataset.cat === f;
                    c.classList.toggle('hide', !show);
                    if (show) {
                        c.style.animation = 'none';
                        void c.offsetWidth;
                        c.style.animation = `revIn .5s var(--ease) ${(i%6)*0.05}s both`;
                    }
                });
            });
        }

        /* Lightbox */
        const lb = $('#lb'),
            lbImg = $('#lbImg'),
            lbCap = $('#lbCap');
        if (lb && lbImg && lbCap) {
            let lbIdx = 0,
                lbList = [];

            function openLb(i) {
                lbList = $$('.proj:not(.hide)').map(el => +el.dataset.i);
                lbIdx = lbList.indexOf(i);
                if (lbIdx < 0) lbIdx = 0;
                paintLb();
                lb.classList.add('on');
                document.body.style.overflow = 'hidden';
            }

            function paintLb() {
                const p = PROJECTS[lbList[lbIdx]];
                lbImg.style.animation = 'none';
                void lbImg.offsetWidth;
                lbImg.style.animation = '';
                lbImg.src = p.img;
                lbImg.alt = p.t.replace(/&amp;/g, '&');
                lbCap.innerHTML = `<b>${p.t}</b>${p.l} · ${p.ty} — ${p.d}`;
            }

            function stepLb(d) {
                lbIdx = (lbIdx + d + lbList.length) % lbList.length;
                paintLb();
            }
            projGrid.addEventListener('click', e => { const c = e.target.closest('.proj'); if (c) openLb(+c.dataset.i); });
            projGrid.addEventListener('keydown', e => {
                if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('proj')) {
                    e.preventDefault();
                    openLb(+e.target.dataset.i);
                }
            });
            const lbCloseBtn = $('#lbClose'),
                lbPrevBtn = $('#lbPrev'),
                lbNextBtn = $('#lbNext');
            if (lbCloseBtn) lbCloseBtn.onclick = () => {
                lb.classList.remove('on');
                document.body.style.overflow = '';
            };
            if (lbPrevBtn) lbPrevBtn.onclick = () => stepLb(-1);
            if (lbNextBtn) lbNextBtn.onclick = () => stepLb(1);
            lb.addEventListener('click', e => {
                if (e.target === lb) {
                    lb.classList.remove('on');
                    document.body.style.overflow = '';
                }
            });
            document.addEventListener('keydown', e => {
                if (!lb.classList.contains('on')) return;
                if (e.key === 'Escape') {
                    lb.classList.remove('on');
                    document.body.style.overflow = '';
                }
                if (e.key === 'ArrowRight') stepLb(1);
                if (e.key === 'ArrowLeft') stepLb(-1);
            });
        }
    }

    // image fallback (safe on every page — matches only what exists)
    $$('.proj-img img, .am-main img, .am-sub img, #heroImg').forEach(img => {
        img.addEventListener('error', () => {
            img.style.background = 'linear-gradient(135deg,#1C1C21,#26262D 60%,#3a2a1e)';
            img.removeAttribute('src');
        });
    });

    /* ---------- RENDER: REVIEWS ---------- */
    function starsHTML(n) {
        let s = '';
        for (let i = 1; i <= 5; i++) s += `<svg viewBox="0 0 24 24" class="${i<=n?'':'off'}"><use href="#i-star"/></svg>`;
        return `<div class="stars" aria-label="${n} out of 5 stars">${s}</div>`;
    }

    function fmtDate(d) {
        try {
            const dt = new Date(d);
            const date = dt.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const time = dt.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
            return `${date}, ${time}`;
        } catch (e) { return d; }
    }

    function esc(s) { return String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])); }

    const revGrid = $('#revGrid');

    let marqueeStop = null;

    function renderReviews(list, highlightFirst) {
        if (!revGrid) return;
        const cards = list.map((r, i) => `
    <article class="rev-card ${highlightFirst&&i===0?'rev-new':''}">
      ${starsHTML(Math.max(1,Math.min(5, +r.rating||5)))}
      <p>${esc(r.msg)}</p>
      <div class="rev-meta">
        <span class="rev-av">${esc((r.name||'?').trim().charAt(0).toUpperCase())}</span>
        <span><b>${esc(r.name)}</b><span>${esc(r.type)}</span></span>
        <time datetime="${r.date||''}">${fmtDate(r.date||new Date())}</time>
      </div>
    </article>`).join('');
        revGrid.innerHTML = `<div class="rev-row">${cards}</div>`;
        initReviewMarquee(revGrid);
    }

    function initReviewMarquee(box) {
        if (marqueeStop) marqueeStop();
        const row = box.querySelector('.rev-row');
        const originals = Array.from(row.children);
        if (!originals.length) return;

        const SPEED = 45; // px/sec - zyada = tez
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const unit = row.scrollWidth;
        const extra = 2 + Math.ceil(box.clientWidth / Math.max(unit, 1));
        for (let k = 0; k < extra; k++) {
            originals.forEach(el => {
                const cl = el.cloneNode(true);
                cl.setAttribute('aria-hidden', 'true');
                row.appendChild(cl);
            });
        }

        let pos = unit;
        box.scrollLeft = pos;

        let paused = false,
            userActive = false,
            visible = true,
            resumeTimer = null;
        let last = performance.now(),
            raf = 0;

        const wrap = () => {
            if (pos >= unit * 2) {
                pos -= unit;
                box.scrollLeft = pos;
            } else if (pos < unit) {
                pos += unit;
                box.scrollLeft = pos;
            }
        };
        const holdThenResume = (ms = 1800) => {
            clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => { userActive = false; }, ms);
        };

        function tick(now) {
            const dt = Math.min(now - last, 60);
            last = now;
            if (!reduce && !paused && !userActive && visible && !document.hidden) {
                pos += SPEED * dt / 1000;
                wrap();
                box.scrollLeft = pos;
            }
            raf = requestAnimationFrame(tick);
        }

        const onScroll = () => {
            if (Math.abs(box.scrollLeft - pos) > 1.5) {
                pos = box.scrollLeft;
                wrap();
                userActive = true;
                holdThenResume();
            }
        };
        box.addEventListener('scroll', onScroll, { passive: true });

        const onEnter = e => { if (e.pointerType === 'mouse') paused = true; };
        const onLeave = e => { if (e.pointerType === 'mouse') paused = false; };
        box.addEventListener('pointerenter', onEnter);
        box.addEventListener('pointerleave', onLeave);

        box.addEventListener('touchstart', () => {
            userActive = true;
            clearTimeout(resumeTimer);
        }, { passive: true });
        box.addEventListener('touchend', () => holdThenResume(2200), { passive: true });

        let dragging = false,
            startX = 0,
            startPos = 0;
        const onDown = e => {
            if (e.pointerType !== 'mouse' || e.button !== 0) return;
            dragging = true;
            userActive = true;
            startX = e.clientX;
            startPos = box.scrollLeft;
            box.classList.add('dragging');
        };
        const onMove = e => {
            if (!dragging) return;
            box.scrollLeft = startPos - (e.clientX - startX);
            pos = box.scrollLeft;
            wrap();
        };
        const onUp = () => {
            if (!dragging) return;
            dragging = false;
            box.classList.remove('dragging');
            holdThenResume(1200);
        };
        box.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);

        const io = new IntersectionObserver(en => { visible = en[0].isIntersecting; });
        io.observe(box);

        raf = requestAnimationFrame(tick);

        marqueeStop = () => {
            cancelAnimationFrame(raf);
            clearTimeout(resumeTimer);
            io.disconnect();
            box.removeEventListener('scroll', onScroll);
            box.removeEventListener('pointerenter', onEnter);
            box.removeEventListener('pointerleave', onLeave);
            box.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
    }
    async function loadReviews() {
        const revLoader = $('#revLoader');
        if (revLoader) revLoader.style.display = 'block';
        try {
            const list = await API.getFeedback();
            list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
            renderReviews(list, false);
        } catch (e) {
            renderReviews(SEED_REVIEWS, false);
        } finally { if (revLoader) revLoader.style.display = 'none'; }
    }
    if (revGrid) loadReviews();

    /* ---------- MODAL ---------- */
    const fbModal = $('#fbModal');
    let rating = 0;
    if (fbModal) {
        function openModal() {
            fbModal.classList.add('on');
            document.body.style.overflow = 'hidden';
            const fn = $('#fName');
            if (fn) setTimeout(() => fn.focus(), 150);
        }

        function closeModal() {
            fbModal.classList.remove('on');
            document.body.style.overflow = '';
        }
        const openFeedbackBtn = $('#openFeedback'),
            fbCloseBtn = $('#fbClose');
        if (openFeedbackBtn) openFeedbackBtn.addEventListener('click', openModal);
        if (fbCloseBtn) fbCloseBtn.addEventListener('click', closeModal);
        fbModal.addEventListener('click', e => { if (e.target === fbModal) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && fbModal.classList.contains('on')) closeModal(); });
        window.__closeFbModal = closeModal;
    }

    /* ---------- RATING ---------- */
    const ratingIn = $('#ratingIn');

    function paintRating(v) {
        if (!ratingIn) return;
        $$('button', ratingIn).forEach(b => b.classList.toggle('on', +b.dataset.r <= v));
    }
    if (ratingIn) {
        ratingIn.addEventListener('mouseover', e => { const b = e.target.closest('button'); if (b) paintRating(+b.dataset.r); });
        ratingIn.addEventListener('mouseleave', () => paintRating(rating));
        ratingIn.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            rating = +b.dataset.r;
            paintRating(rating);
            setErr('ratingIn', '');
        });
    }

    /* ---------- VALIDATION HELPERS ---------- */
    function setErr(id, msg) {
        const f = document.getElementById(id);
        const s = document.querySelector(`.err-msg[data-for="${id}"]`);
        if (s) s.textContent = msg || '';
        if (f) f.classList.toggle('err', !!msg);
    }

    function validPhone(v) { return /^[6-9]\d{9}$/.test(v.replace(/\D/g, '')) || /^\+\d{10,15}$/.test(v.trim()); }

    function validPhoneLoose(v) { return v.trim() === '' || validPhone(v); }

    /* ---------- FEEDBACK SUBMIT ---------- */
    const fbForm = $('#fbForm');
    if (fbForm) {
        fbForm.addEventListener('submit', async e => {
            e.preventDefault();
            let ok = true;
            const name = $('#fName').value.trim(),
                phone = $('#fPhone').value.trim(),
                type = $('#fType').value,
                msg = $('#fMsg').value.trim();

            if (name.length < 2) {
                setErr('fName', 'Please enter your full name.');
                ok = false;
            } else setErr('fName', '');
            if (!validPhoneLoose(phone)) {
                setErr('fPhone', 'Enter a valid 10-digit mobile number.');
                ok = false;
            } else setErr('fPhone', '');
            if (!type) {
                setErr('fType', 'Please select a project type.');
                ok = false;
            } else setErr('fType', '');
            if (!rating) {
                setErr('ratingIn', 'Please select a rating.');
                ok = false;
            } else setErr('ratingIn', '');
            if (msg.length < 10) {
                setErr('fMsg', 'Please write at least 10 characters.');
                ok = false;
            } else setErr('fMsg', '');
            if (!ok) return;

            const btn = $('#fSubmit');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner"></span> Submitting…';

            const payload = { name, phone, type, rating, msg, date: new Date().toISOString().slice(0, 10) };
            try {
                await API.postFeedback(payload);
                payload.date = payload.date || new Date().toISOString().slice(0, 10);
                $('#fbBody').innerHTML = `
        <div class="success">
          <div class="tick"><svg viewBox="0 0 24 24"><path d="m4 12.5 5 5L20 6.5"/></svg></div>
          <h3>Thank you, ${esc(name.split(' ')[0])}!</h3>
          <p>Your feedback has been submitted and is now visible on the website.</p>
          <div style="margin-top:1.6rem;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" id="closeSuccess">Done</button>
          </div>
        </div>`;
                toast('Thank you! Your feedback has been submitted for review.');
                history.replaceState(null, '', location.pathname);
                const cs = $('#closeSuccess');
                if (cs) cs.addEventListener('click', () => {
                    if (window.__closeFbModal) window.__closeFbModal();
                    setTimeout(resetFb, 400);
                });
                btn.disabled = false;
                btn.innerHTML = original;
            } catch (err) {
                toast('Could not submit. Please try again or call us.');
                btn.disabled = false;
                btn.innerHTML = original;
            }
        });

        function resetFb() {
            rating = 0;
            paintRating(0);
            $('#fbBody').innerHTML = fbFormOuter;
        }
        /* store original form markup for reuse */
        let fbFormOuter = $('#fbBody').innerHTML;
        // rebind after potential rebuild
        document.addEventListener('click', e => {
            if (e.target && e.target.id === 'closeSuccess') {
                if (window.__closeFbModal) window.__closeFbModal();
                setTimeout(() => {
                    $('#fbBody').innerHTML = fbFormOuter;
                    paintRating(0);
                }, 400);
            }
        });
    }

    /* ---------- CONTACT SUBMIT ---------- */
    const cForm = $('#contactForm');
    if (cForm) {
        cForm.addEventListener('submit', async e => {
            e.preventDefault();
            let ok = true;
            const name = $('#cName').value.trim(),
                phone = $('#cPhone').value.trim(),
                loc = $('#cLoc').value.trim(),
                svc = $('#cSvc').value,
                msg = $('#cMsg').value.trim();
            if (name.length < 2) {
                setErr('cName', 'Please enter your name.');
                ok = false
            } else setErr('cName', '');
            if (!validPhone(phone)) {
                setErr('cPhone', 'Enter a valid 10-digit mobile number.');
                ok = false
            } else setErr('cPhone', '');
            if (loc.length < 3) {
                setErr('cLoc', 'Please enter your area / location.');
                ok = false
            } else setErr('cLoc', '');
            if (!svc) {
                setErr('cSvc', 'Please select a service.');
                ok = false
            } else setErr('cSvc', '');
            if (!ok) return;
            const btn = $('#cSubmit'),
                original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner"></span> Sending…';
            try {
                await API.postContact({ name, phone, location: loc, service: svc, message: msg, date: new Date().toISOString() });
                cForm.reset();
                toast('Enquiry sent! We will call you shortly on ' + phone + '.');
            } catch (err) {
                toast('Something went wrong. Please call or WhatsApp us directly.');
            }
            btn.disabled = false;
            btn.innerHTML = original;
        });
    }

    /* ---------- TOAST ---------- */
    let tTimer;

    function toast(msg) {
        const t = $('#toast');
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(tTimer);
        tTimer = setTimeout(() => t.classList.remove('show'), 4200);
    }

    /* ---------- NAV / DRAWER ---------- */
    const nav = $('#nav'),
        burger = $('#burger'),
        drawer = $('#drawer');
    if (burger && drawer) {
        burger.addEventListener('click', () => {
            const open = drawer.classList.toggle('open');
            burger.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
            if (open) { $$('#drawer a').forEach((a, i) => a.style.transitionDelay = (0.06 + i * 0.05) + 's'); } else { $$('#drawer a').forEach(a => a.style.transitionDelay = '0s'); }
        });
        $$('#drawer a').forEach(a => a.addEventListener('click', () => {
            drawer.classList.remove('open');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        }));
    }

    /* ---------- ACTIVE NAV LINK (multi-page: based on current filename) ---------- */
    (function setActiveLink() {
        let path = location.pathname.split('/').pop();
        if (path === '') path = 'index.html';
        $$('#menu a, #drawer a').forEach(a => {
            const href = (a.getAttribute('href') || '').split('/').pop();
            a.classList.toggle('active', href === path);
        });
    })();

    /* ---------- SCROLL: progress, sticky, parallax ---------- */
    const heroImg = $('#heroImg');
    const prog = $('#progress');
    let ticking = false;

    function onScroll() {
        const y = window.scrollY || document.documentElement.scrollTop;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (prog) prog.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';
        if (nav) nav.classList.toggle('stuck', y > 20);
        if (!reduce && heroImg && y < window.innerHeight * 1.2) {
            heroImg.style.transform = 'translate3d(0,' + (y * 0.22) + 'px,0) scale(1.06)';
        }
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    /* ---------- REVEAL OBSERVER ---------- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('in');
                io.unobserve(en.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    function observeAll() { $$('.reveal:not(.in), .reveal-mask:not(.in), .proc-line:not(.in)').forEach(el => io.observe(el)); }
    observeAll();
    // catch dynamically injected nodes
    new MutationObserver(() => observeAll()).observe(document.body, { childList: true, subtree: true });

    /* ---------- COUNTERS ---------- */
    const counters = $$('.num[data-to]');
    const cio = new IntersectionObserver(es => {
        es.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target,
                to = +el.dataset.to,
                dur = 1500,
                st = performance.now();
            if (reduce) {
                el.textContent = to;
                cio.unobserve(el);
                return;
            }
            (function tick(now) {
                const p = Math.min((now - st) / dur, 1);
                const e = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(to * e);
                if (p < 1) requestAnimationFrame(tick);
            })(st);
            cio.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));

    /* ---------- SERVICE CARD SPOTLIGHT ---------- */
    if (!reduce && window.matchMedia('(hover:hover)').matches) {
        $$('.svc').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
                card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
            });
        });
        /* ---------- MAGNETIC BUTTONS ---------- */
        $$('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const r = btn.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.22;
                const y = (e.clientY - r.top - r.height / 2) * 0.32;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
        });
    }

    /* ---------- MARQUEE duplicate for seamless loop ---------- */
    const mq = $('#mq');
    if (mq) mq.innerHTML += mq.innerHTML;

    /* ---------- HERO TEXT ANIMATION ---------- */
    const heroLines = document.querySelectorAll('.hero h1 .line span');
    heroLines.forEach((el, i) => {
        el.style.animationDelay = `${0.15 + i * 0.13}s`;
    });

    /* ---------- SMOOTH SCROLL (with sticky offset fallback) ---------- */
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id.length < 2) return;
            const t = document.querySelector(id);
            if (!t) return;
            e.preventDefault();
            const top = t.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 900 ? 76 : 66);
            window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
        });
    });

    /* ---------- demo safeguard: if fetch returns HTML (no functions), stay quiet ---------- */
})();