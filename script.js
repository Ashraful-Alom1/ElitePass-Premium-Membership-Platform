// ===== STATE =====
let state = {
  loggedIn: false,
  user: null,
  plan: 'premium',
  regStep: 1,
  payMethod: 'stripe'
};

// ===== PAGE NAVIGATION =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo(0,0);

  if (page === 'members') {
    if (state.loggedIn) {
      document.getElementById('members-locked').style.display = 'none';
      document.getElementById('members-unlocked').style.display = 'block';
    } else {
      document.getElementById('members-locked').style.display = 'flex';
      document.getElementById('members-unlocked').style.display = 'none';
    }
  }

  if (page === 'dashboard' && state.loggedIn) {
    updateDashboard();
  }
}

function scrollToPricing() {
  showPage('home');
  setTimeout(() => {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// ===== AUTH =====
function doLogin() {
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  if ((email === 'demo@elitepass.com' && pass === 'demo1234') || email.includes('@')) {
    const name = email === 'demo@elitepass.com' ? 'Alex Demo' : email.split('@')[0];
    state.loggedIn = true;
    state.user = {
      name: name,
      email: email,
      plan: 'premium',
      firstName: name.split(' ')[0]
    };
    updateNav();
    updateDashboard();
    showPage('dashboard');
    showToast('👋 Welcome back, ' + state.user.firstName + '!');
  } else {
    showToast('❌ Invalid credentials. Try demo@elitepass.com / demo1234');
  }
}

function logout() {
  state.loggedIn = false;
  state.user = null;
  updateNav();
  showPage('home');
  showToast('👋 You have been logged out.');
}

function updateNav() {
  if (state.loggedIn) {
    document.getElementById('nav-actions').style.display = 'none';
    document.getElementById('nav-user').style.display = 'flex';
    document.getElementById('nav-name').textContent = state.user.firstName;
  } else {
    document.getElementById('nav-actions').style.display = 'flex';
    document.getElementById('nav-user').style.display = 'none';
  }
}

// ===== REGISTRATION =====
let selectedPlan = 'premium';

function selectPlan(plan) {
  selectedPlan = plan;
}

function selectAndRegister(plan) {
  selectedPlan = plan;
  showPage('register');
  nextStep(1);
}

function choosePlan(plan) {
  selectedPlan = plan;
  document.querySelectorAll('.plan-option').forEach(el => el.classList.remove('selected'));
  document.getElementById('opt-' + plan).classList.add('selected');
  document.getElementById('check-basic').style.background = plan === 'basic' ? 'var(--gold)' : '';
  document.getElementById('check-basic').style.borderColor = plan === 'basic' ? 'var(--gold)' : '';
  document.getElementById('check-premium').style.background = plan === 'premium' ? 'var(--gold)' : '';
  document.getElementById('check-premium').style.borderColor = plan === 'premium' ? 'var(--gold)' : '';

  const feats = {
    basic: '10 Resources, Community Access, Newsletter, Certificate, Dashboard',
    premium: 'Unlimited Resources, Priority Support, 50+ Courses, 1-on-1 Consultation, Gold Certificate, Community Access'
  };
  document.getElementById('plan-feat-list').textContent = feats[plan];
}

function nextStep(n) {
  state.regStep = n;
  document.getElementById('reg-step1').style.display = 'none';
  document.getElementById('reg-step2').style.display = 'none';
  document.getElementById('reg-step3').style.display = 'none';
  document.getElementById('reg-step' + n).style.display = 'block';

  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('step' + i);
    el.className = 'step';
    if (i < n) el.classList.add('done');
    else if (i === n) el.classList.add('active');
  }

  // Pre-fill card holder from name
  if (n === 3) {
    const fname = document.getElementById('reg-fname').value;
    const lname = document.getElementById('reg-lname').value;
    if (fname || lname) {
      document.getElementById('card-holder-display').textContent = ((fname + ' ' + lname).trim()) || 'Card Holder';
      document.getElementById('card-name').value = (fname + ' ' + lname).trim();
    }
  }
}

function completeRegistration() {
  const fname = document.getElementById('reg-fname').value || 'Member';
  const lname = document.getElementById('reg-lname').value || '';
  const email = document.getElementById('reg-email').value || 'member@example.com';

  state.loggedIn = true;
  state.user = {
    name: (fname + ' ' + lname).trim(),
    firstName: fname,
    email: email,
    plan: selectedPlan
  };

  updateNav();
  updateDashboard();
  showPage('dashboard');
  showToast('🎉 Welcome to ElitePass! Your ' + selectedPlan + ' membership is active!');
}

// ===== DASHBOARD =====
function updateDashboard() {
  if (!state.user) return;
  const u = state.user;
  const initials = u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
  const plan = u.plan || selectedPlan;
  const isPremium = plan === 'premium';

  document.getElementById('dash-avatar').textContent = initials;
  document.getElementById('dash-name').textContent = u.name;
  document.getElementById('dash-plan-tag').textContent = isPremium ? '👑 Premium Member' : '⚡ Basic Member';
  document.getElementById('dash-greeting-name').textContent = u.firstName;
  document.getElementById('dash-resources').textContent = isPremium ? '28' : '10';
  document.getElementById('dash-tier-val').textContent = isPremium ? 'Premium' : 'Basic';
  document.getElementById('mc-tier-badge').textContent = isPremium ? 'PREMIUM' : 'BASIC';
  document.getElementById('mc-tier2').textContent = isPremium ? 'PREMIUM' : 'BASIC';
  document.getElementById('mc-name').textContent = u.name;
  document.getElementById('mc-name2').textContent = u.name;
  document.getElementById('mc-email').textContent = u.email;
  document.getElementById('mc-email2').textContent = u.email;
  document.getElementById('mc-amount').textContent = isPremium ? '$29.00' : '$9.00';
  document.getElementById('profile-avatar').textContent = initials;
  document.getElementById('profile-fullname').textContent = u.name;
  document.getElementById('profile-email-show').textContent = u.email;
  document.getElementById('profile-plan-tag').textContent = isPremium ? '👑 Premium Member' : '⚡ Basic Member';
  document.getElementById('profile-name-input').value = u.name;
  document.getElementById('profile-email-input').value = u.email;
  document.getElementById('upgrade-msg').textContent = isPremium
    ? "You're on our Premium plan — enjoy full access!"
    : "Upgrade to Premium for unlimited access, courses, and priority support.";
}

function showDashSection(section) {
  ['overview', 'profile', 'membership', 'settings'].forEach(s => {
    document.getElementById('dash-' + s).style.display = s === section ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-menu li a').forEach(a => a.classList.remove('active'));
}

// ===== PAYMENT =====
function selectPM(method) {
  state.payMethod = method;
  document.querySelectorAll('.pay-method').forEach(b => b.classList.remove('active'));
  document.getElementById('pm-' + method).classList.add('active');
}

function formatCard(input) {
  let v = input.value.replace(/\D/g,'').slice(0,16);
  input.value = v.replace(/(.{4})/g,'$1 ').trim();
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g,'').slice(0,4);
  if (v.length >= 2) v = v.slice(0,2) + ' / ' + v.slice(2);
  input.value = v;
}

function updateCard() {
  const v = document.getElementById('card-num').value || '4242  4242  4242  4242';
  const parts = v.replace(/\s/g,'');
  const display = [parts.slice(0,4),parts.slice(4,8),parts.slice(8,12),parts.slice(12,16)]
    .map(p => p || '••••').join('  ');
  document.getElementById('card-num-display').textContent = display || '4242  4242  4242  4242';
}

function updateCardHolder(input) {
  document.getElementById('card-holder-display').textContent = input.value || 'Card Holder';
}

function updateExp() {
  const v = document.getElementById('card-exp').value;
  document.getElementById('card-exp-display').textContent = v || '12 / 28';
}

// ===== CERTIFICATE =====
function openCertificate() {
  if (!state.loggedIn) {
    showPage('login');
    showToast('⚠️ Please log in to access your certificate.');
    return;
  }
  const u = state.user;
  const plan = u.plan || selectedPlan;
  document.getElementById('cert-name').textContent = u.name;
  document.getElementById('cert-tier').textContent = plan === 'premium' ? '👑 PREMIUM MEMBER' : '⚡ BASIC MEMBER';
  document.getElementById('certificate-preview').classList.add('open');
}

function closeCertificate() {
  document.getElementById('certificate-preview').classList.remove('open');
}

function downloadCertificate() {
  showToast('📄 Certificate PDF download started!');
  // In production, this would use jsPDF or window.print()
  const printWin = window.open('', '', 'width=800,height=600');
  printWin.document.write(`
    <html><head>
      <title>ElitePass Certificate</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; font-family: 'DM Sans', sans-serif; background: #FFFDF5; }
        .wrap { padding: 40px; font-family: 'Playfair Display', serif; color: #2A2010; border: 6px solid #C9A84C; margin: 20px; border-radius: 2px; text-align: center; position: relative; }
        .wrap::before { content:''; position:absolute; inset:10px; border:1px solid rgba(201,168,76,0.4); }
        .logo { font-size:1.1rem;font-weight:700;color:#8A6020;letter-spacing:.15em;text-transform:uppercase;margin-bottom:.75rem; }
        .title { font-size:.75rem;letter-spacing:.25em;text-transform:uppercase;color:#A87830;margin-bottom:1.5rem; }
        .heading { font-size:2.2rem;font-weight:900;color:#1A1208;margin-bottom:1rem; }
        .presented { font-family:'DM Sans',sans-serif;font-size:.85rem;color:#7A6840;margin-bottom:.5rem; }
        .name { font-size:2.5rem;font-style:italic;color:#8A6020;margin-bottom:1.25rem; }
        .body { font-family:'DM Sans',sans-serif;font-size:.875rem;color:#5A4A30;max-width:480px;margin:0 auto 1.75rem;line-height:1.7; }
        .badge { display:inline-block;background:linear-gradient(135deg,#C9A84C,#A8883C);color:white;font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.4rem 1.5rem;border-radius:100px;margin-bottom:2rem; }
        .footer { display:flex;justify-content:space-between;align-items:flex-end;padding-top:1.5rem;border-top:1px solid rgba(201,168,76,.3); }
        .sig-line { font-style:italic;font-size:1.3rem;color:#5A4020;border-bottom:1px solid #C9A84C;padding-bottom:.25rem;margin-bottom:.3rem; }
        .sig-title { font-family:'DM Sans',sans-serif;font-size:.7rem;color:#7A6840;text-transform:uppercase;letter-spacing:.1em; }
        .seal { width:70px;height:70px;border:3px solid #C9A84C;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem; }
      </style>
    </head><body>
      <div class="wrap">
        <div class="logo">✦ ElitePass ✦</div>
        <div class="title">Certificate of Membership</div>
        <div class="heading">Certificate of<br>Excellence</div>
        <div class="presented">This certifies that</div>
        <div class="name">${state.user.name}</div>
        <div class="body">has been duly verified and admitted as a valued member of the ElitePass Community, having met all the requirements for this distinguished membership level.</div>
        <div class="badge">${(state.user.plan || 'premium') === 'premium' ? '👑 PREMIUM MEMBER' : '⚡ BASIC MEMBER'}</div>
        <div class="footer">
          <div class="cert-sig">
            <div class="sig-line">Alexandra Sterling</div>
            <div class="sig-title">Founder & Director, ElitePass</div>
          </div>
          <div><div style="font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;color:#7A6840;margin-bottom:.3rem;text-align:center">Issued</div><div style="font-size:.82rem;font-weight:600;color:#2A2010">March 11, 2026</div></div>
          <div class="seal">🏆</div>
        </div>
      </div>
    </body></html>
  `);
  printWin.document.close();
  setTimeout(() => { printWin.print(); }, 500);
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// Pre-select plan if coming from plan cards
window.addEventListener('load', () => {
  choosePlan('premium');
});