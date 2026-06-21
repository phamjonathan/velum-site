(function(){
    "use strict";
    const panels  = Array.from(document.querySelectorAll('.panel'));
    const total   = panels.length;
    const dotsWrap= document.getElementById('dots');
    const navLinks= Array.from(document.querySelectorAll('#nav .links a'));
    const curEl   = document.getElementById('cur');
    const hint    = document.getElementById('hint');

    let current = 0, animating = false;
    const DURATION = 1.0, COOLDOWN = 140, P3_STEP = 600;
    let cooldownUntil = 0;

    // --- Scroller (Process) panel support ---
    const SCROLLER = panels.findIndex(p => p.classList.contains('scroller'));
    function scrollerEl(){ return SCROLLER >= 0 ? panels[SCROLLER].querySelector('.proc-scroll') : null; }
    function scAtTop(sc){ return sc.scrollTop <= 1; }
    function scAtBottom(sc){ return sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1; }
    (function initProcess(){
      const sc = scrollerEl(); if (!sc) return;
      const panel = panels[SCROLLER];
      const cards = [...panel.querySelectorAll('.roadmap-card')];
      const dots  = [...panel.querySelectorAll('.roadmap-dot')];
      const area  = panel.querySelector('.proc-card-area');
      const N = cards.length; if (!N) return;
      let step = -1;

      // Paint a continuous progress value (0 .. N-1) as a single vertical column:
      // all cards slide together — the active one centered, the next peeking below
      // and the previous leaving above. No fade or scale; they just scroll in the
      // same frame, like the reference. Step = card height + gap so neighbours peek.
      const track = panel.querySelector('.roadmap-track');
      const layout = (prog) => {
        const H = track ? track.clientHeight : 560;
        const stp = H * 1.12;
        const near = Math.round(prog);
        cards.forEach((c, i) => {
          const y = (i - prog) * stp;
          c.style.transform = 'translateY(' + y.toFixed(1) + 'px)';
          c.style.opacity = '1';
          c.style.zIndex = (i === near) ? 100 : 50;
        });
      };
      const setActiveStep = (i) => {
        cards.forEach((c, k) => c.classList.toggle('is-active', k === i));
        dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
      };

      // continuous scroll progress -> cascade + nearest-step highlight
      const update = () => {
        const max = sc.scrollHeight - sc.clientHeight;
        const p = max > 0 ? sc.scrollTop / max : 0;
        const prog = p * (N - 1);
        layout(prog);
        const near = Math.max(0, Math.min(N - 1, Math.round(prog)));
        if (near !== step){ step = near; setActiveStep(near); }
      };
      // Coalesce scroll bursts into one paint per frame (smoother fast scrolling),
      // and keep the column correctly positioned across viewport resizes.
      let rafPending = false;
      const onScroll = () => {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(() => { rafPending = false; update(); });
      };
      sc.addEventListener('scroll', onScroll, { passive:true });
      window.addEventListener('resize', update, { passive:true });
      update();

      // dot click -> scroll so that step's card lands at the front
      dots.forEach((d, i) => d.addEventListener('click', () => {
        const max = sc.scrollHeight - sc.clientHeight;
        sc.scrollTo({ top: (N > 1 ? i / (N - 1) : 0) * max, behavior:'smooth' });
      }));

      // subtle cursor tilt + parallax (drives CSS vars inherited by the card)
      if (area && window.matchMedia('(pointer:fine)').matches){
        let raf = 0, tx = 0, ty = 0;
        const apply = () => {
          raf = 0;
          area.style.setProperty('--rx', (-ty * 6).toFixed(2) + 'deg');
          area.style.setProperty('--ry', ( tx * 8).toFixed(2) + 'deg');
          area.style.setProperty('--sx', ( tx * 26).toFixed(1) + 'px');
          area.style.setProperty('--sy', ( ty * 26).toFixed(1) + 'px');
          area.style.setProperty('--sx2',( tx * 14).toFixed(1) + 'px');
          area.style.setProperty('--sy2',( ty * 14).toFixed(1) + 'px');
        };
        area.addEventListener('mousemove', (e) => {
          const r = area.getBoundingClientRect();
          tx = (e.clientX - r.left) / r.width  - 0.5;   // -0.5 .. 0.5
          ty = (e.clientY - r.top)  / r.height - 0.5;
          if (!raf) raf = requestAnimationFrame(apply);
        });
        area.addEventListener('mouseleave', () => {
          tx = ty = 0;
          ['--rx','--ry','--sx','--sy','--sx2','--sy2'].forEach(v => area.style.setProperty(v, v.includes('r') ? '0deg' : '0px'));
        });
      }
    })();

    // --- Hero 5 (#p3): scroll-stepped diagonal card stack ---
    // Mirrors the Process scroller's layout(): one card revealed per scroll step,
    // newest at the front, older cards fanned up-left behind; the "Clarity at
    // every step" watermark shrinks + fades as cards accumulate (gone at full).
    const P3 = panels.findIndex(p => p.id === 'p3');
    const P3N = 4;
    let p3Step = 0;
    const p3 = {
      wm:    P3 >= 0 ? panels[P3].querySelector('.hero-wm') : null,
      cards: P3 >= 0 ? [...panels[P3].querySelectorAll('.glass-card')] : [],
      dots:  P3 >= 0 ? [...panels[P3].querySelectorAll('.stack-progress i')] : []
    };
    function paintP3(n){
      if (P3 < 0) return;
      p3Step = Math.max(0, Math.min(P3N, n));
      p3.cards.forEach((c, i) => {
        let x, y, s, op, rot, z;
        if (i >= p3Step){               // not yet revealed — waiting low-right, ready to slide in
          x = 150; y = 240; s = .94; op = 0; rot = 0; z = 0;
        } else {
          const d = (p3Step - 1) - i;   // 0 = newest (front), larger = further back
          if (d <= 0){                  // front card — large, low-right
            x = 150; y = 170; s = 1; op = 1; rot = 0; z = 100;
          } else {                      // earlier cards cascade up-and-left behind it
            const k = Math.min(d, 3);
            x = 150 - k * 110; y = 170 - k * 95; s = 1 - k * .03;
            op = Math.max(.78, 1 - k * .08); rot = 0;
            z = 100 - Math.round(k * 12);
          }
        }
        c.style.transform = 'translate(calc(-50% + ' + x.toFixed(1) + 'px),' + y.toFixed(1) + 'px) scale(' + s.toFixed(3) + ') rotate(' + rot.toFixed(2) + 'deg)';
        c.style.opacity = op.toFixed(3);
        c.style.zIndex = z;
      });
      const prog = p3Step / P3N;
      if (p3.wm){
        p3.wm.style.opacity = (1 - prog).toFixed(3);
        p3.wm.style.transform = 'translate(-50%,-50%) scale(' + (1 - prog * 0.42).toFixed(3) + ')';
      }
      p3.dots.forEach((d, i) => d.classList.toggle('on', i < p3Step));
    }

    const dots = [];
    panels.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to section ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d); dots.push(d);
    });

    panels.forEach((panel, i) => {
      const content = panel.querySelector('.content');
      const bg = panel.querySelector('.bg');
      const fg = panel.querySelector('.fg');
      if (i === 0){
        gsap.set(panel, { yPercent:0, autoAlpha:1, zIndex:2 });
        gsap.set([bg, fg, content], { yPercent:0, autoAlpha:1 });
      } else {
        gsap.set(panel, { yPercent:100, autoAlpha:0, zIndex:1 });
      }
    });

    function setActiveUI(index){
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      navLinks.forEach(a => a.classList.toggle('current', Number(a.dataset.goto) === index));
      curEl.textContent = String(index + 1).padStart(2, '0');
      document.documentElement.classList.toggle('on-grass', panels[index] && panels[index].id === 'p6');
      document.documentElement.classList.toggle('on-light', panels[index] && ['p1','pproc','p4','p5'].includes(panels[index].id));
      if (panels[index] && panels[index].id === 'p2' && window.__velumStats) window.__velumStats();
    }

    function goTo(index){
      if (animating) return;
      if (index < 0 || index >= total || index === current) return;
      animating = true;
      if (hint) hint.style.opacity = '0';

      const dir = index > current ? 1 : -1;
      const outgoing = panels[current], incoming = panels[index];
      const outBg = outgoing.querySelector('.bg'), outFg = outgoing.querySelector('.fg'), outContent = outgoing.querySelector('.content');
      const inBg = incoming.querySelector('.bg'), inFg = incoming.querySelector('.fg'), inContent = incoming.querySelector('.content');

      // If entering the scroller panel, pre-position its internal scroll:
      // top when arriving from above, bottom when arriving from below.
      if (incoming.classList.contains('scroller')){
        const inSc = incoming.querySelector('.proc-scroll');
        if (inSc) inSc.scrollTop = dir > 0 ? 0 : inSc.scrollHeight;
      }
      // Entering #p3: start empty (watermark up) from above, full (cards open) from below.
      if (incoming.id === 'p3') paintP3(dir > 0 ? 0 : P3N);

      gsap.set(incoming, { zIndex:3, autoAlpha:1, yPercent: dir * 100 });
      gsap.set(outgoing, { zIndex:2 });
      gsap.set(inBg, { yPercent: dir * -22, scale:1.08 });
      if (inFg) gsap.set(inFg, { yPercent: dir * 60, autoAlpha:0 });
      if (inContent) gsap.set(inContent, { yPercent: dir * 40, autoAlpha:0 });

      const tl = gsap.timeline({
        defaults:{ duration:DURATION, ease:'power3.inOut' },
        onComplete(){
          gsap.set(outgoing, { yPercent: -dir * 100, autoAlpha:0, zIndex:1 });
          gsap.set(outBg, { yPercent:0, scale:1 });
          if (outFg) gsap.set(outFg, { yPercent:0, autoAlpha:1 });
          if (outContent) gsap.set(outContent, { yPercent:0, autoAlpha:1 });
          gsap.set(incoming, { zIndex:2 });
          current = index; animating = false;
          cooldownUntil = performance.now() + COOLDOWN;
        }
      });

      tl.to(incoming, { yPercent:0 }, 0)
        .to(outgoing, { yPercent:-dir*100 }, 0)
        .to(inBg, { yPercent:0, scale:1 }, 0)
        .to(outBg, { yPercent:dir*18, scale:1.06 }, 0);
      if (inFg) tl.to(inFg, { yPercent:0, autoAlpha:1, duration:DURATION*0.85 }, 0.12);
      if (outFg) tl.to(outFg, { yPercent:-dir*40, autoAlpha:0, duration:DURATION*0.7 }, 0);
      if (inContent) tl.to(inContent, { yPercent:0, autoAlpha:1, duration:DURATION*0.8, ease:'power3.out' }, 0.18);
      if (outContent) tl.to(outContent, { yPercent:-dir*30, autoAlpha:0, duration:DURATION*0.55 }, 0);

      setActiveUI(index);
    }

    function next(){ goTo(current + 1); }
    function prev(){ goTo(current - 1); }
    function inputReady(){ return !animating && performance.now() >= cooldownUntil; }

    let wheelArmed = true;
    window.addEventListener('wheel', (e) => {
      const dy = e.deltaY;
      // Inside the Process panel: let it scroll natively until an edge is hit.
      if (current === SCROLLER && !animating){
        const sc = scrollerEl();
        if (sc){
          const goingDown = dy > 0;
          if ((goingDown && !scAtBottom(sc)) || (!goingDown && !scAtTop(sc))){
            return; // native scroll; do not snap, do not preventDefault
          }
        }
      }
      e.preventDefault();
      if (Math.abs(dy) < 8) return;
      if (!inputReady()) return;
      // Inside #p3: reveal/hide one card per step, paced by a short cooldown so a
      // continuous scroll glides through all the cards without needing to stop.
      if (current === P3){
        if (dy > 0 && p3Step < P3N){ paintP3(p3Step + 1); cooldownUntil = performance.now() + P3_STEP; return; }
        if (dy < 0 && p3Step > 0){ paintP3(p3Step - 1); cooldownUntil = performance.now() + P3_STEP; return; }
        // at an edge (all cards shown / all hidden): fall through to a panel change
      }
      if (!wheelArmed) return;
      wheelArmed = false;
      if (dy > 0) next(); else prev();
    }, { passive:false });

    let wheelStopTimer = null;
    window.addEventListener('wheel', () => {
      if (wheelStopTimer) clearTimeout(wheelStopTimer);
      wheelStopTimer = setTimeout(() => { wheelArmed = true; }, 90);
    }, { passive:true });

    let touchStartY = null, touchStartX = null;
    window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; touchStartX = e.touches[0].clientX; }, { passive:true });
    window.addEventListener('touchmove', (e) => {
      if (current === SCROLLER) return; // allow native scrolling inside the Process panel
      e.preventDefault();
    }, { passive:false });
    window.addEventListener('touchend', (e) => {
      if (touchStartY === null) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      const dx = touchStartX - e.changedTouches[0].clientX;
      touchStartY = touchStartX = null;
      if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx)) return;
      if (current === SCROLLER){
        const sc = scrollerEl();
        if (sc){
          if (dy > 0 && !scAtBottom(sc)) return; // still scrolling cards down
          if (dy < 0 && !scAtTop(sc)) return;    // still scrolling cards up
        }
      }
      if (!inputReady()) return;
      if (current === P3){
        if (dy > 0){ if (p3Step < P3N){ paintP3(p3Step + 1); return; } }
        else       { if (p3Step > 0){ paintP3(p3Step - 1); return; } }
      }
      if (dy > 0) next(); else prev();
    }, { passive:true });

    window.addEventListener('keydown', (e) => {
      const k = e.key;
      const navKeys = ['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'];
      if (navKeys.includes(k)) e.preventDefault();
      if (!inputReady()) return;
      const sc = (current === SCROLLER) ? scrollerEl() : null;
      switch (k){
        case 'ArrowDown': case 'PageDown': case ' ':
          if (sc && !scAtBottom(sc)){ sc.scrollBy({ top: sc.clientHeight * 0.72, behavior:'smooth' }); break; }
          if (current === P3 && p3Step < P3N){ paintP3(p3Step + 1); break; }
          next(); break;
        case 'ArrowUp': case 'PageUp':
          if (sc && !scAtTop(sc)){ sc.scrollBy({ top: -sc.clientHeight * 0.72, behavior:'smooth' }); break; }
          if (current === P3 && p3Step > 0){ paintP3(p3Step - 1); break; }
          prev(); break;
        case 'Home': goTo(0); break;
        case 'End': goTo(total - 1); break;
      }
    });

    document.querySelectorAll('[data-goto]').forEach(el => {
      el.addEventListener('click', (e) => { e.preventDefault(); goTo(Number(el.dataset.goto)); });
    });
    // Social links and the mailto contact are real links — let them behave natively.

    window.snap = { goTo, next, prev, get current(){ return current; }, total };
  })();

  /* ---- Hero 1: seamless crossfade video loop ---- */
  (function seamlessHeroVideo(){
    var a = document.querySelector('#p0 .bgvid'); if(!a) return;
    var FADE = 1.2, RATE = 0.85, bg = a.parentNode;
    var b = a.cloneNode(false);
    b.removeAttribute('poster'); b.removeAttribute('autoplay');
    a.removeAttribute('loop'); b.removeAttribute('loop');
    a.muted = true; b.muted = true;
    a.playbackRate = b.playbackRate = RATE;
    a.style.transition = b.style.transition = 'opacity '+FADE+'s linear';
    a.style.opacity = '1'; b.style.opacity = '0';
    bg.appendChild(b);
    var src = a.currentSrc || (a.querySelector('source')||{}).src;
    if(src && !b.querySelector('source') && !b.src){ b.src = src; }
    if(b.load) b.load();
    b.playbackRate = RATE;
    var top = a, bottom = b, armed = false;
    function onTime(){
      var v=this; if(v!==top) return;
      var d=v.duration; if(!d||isNaN(d)) return;
      if(!armed && v.currentTime >= d - FADE){
        armed=true; bottom.currentTime=0; bottom.playbackRate=RATE;
        var p=bottom.play(); if(p&&p.catch)p.catch(function(){});
        top.style.opacity='0'; bottom.style.opacity='1';
        var prevTop=top, prevBottom=bottom; top=prevBottom; bottom=prevTop;
        setTimeout(function(){ try{prevTop.pause();}catch(e){} armed=false; }, FADE*1000+60);
      }
    }
    a.addEventListener('timeupdate', onTime);
    b.addEventListener('timeupdate', onTime);
    var pa=a.play(); if(pa&&pa.catch)pa.catch(function(){});
  })();

  /* ---- Results: count-up stats, fire once when the panel is reached ---- */
  (function statCounters(){
    var nums = document.querySelectorAll('#p2 .stat-num');
    if (!nums.length) return;
    var done = false;
    function run(){
      if (done) return; done = true;
      nums.forEach(function(el){
        var to = parseFloat(el.dataset.to), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', dur = 1500, start = null;
        function step(t){
          if (!start) start = t;
          var p = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + Math.round(to * e) + suf;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
    // Fired once by the deck controller when the Results panel becomes active.
    window.__velumStats = run;
  })();