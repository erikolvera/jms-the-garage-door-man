/* ==========================================================================
   JMS - The Garage Door Men — Reviews page logic
   Renders approved reviews from reviews.json and handles the (no-account)
   review submission form. Strings are read from data-i18n'd DOM nodes so the
   shared language toggle in scripts.js stays the single source of truth.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderApprovedReviews();
  initReviewForm();
});

/** Escape user/JSON text before injecting into HTML. */
function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Initials for the avatar bubble, mirroring the homepage testimonial cards. */
function initials(name) {
  const parts = String(name || '').trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join('') || '?';
}

const STAR_SVG =
  '<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';

function starsMarkup(rating) {
  const n = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
  return STAR_SVG.repeat(n);
}

/** Fetch reviews.json and render approved entries into the grid. */
async function renderApprovedReviews() {
  const grid = document.getElementById('reviews-list-grid');
  const empty = document.getElementById('reviews-empty');
  if (!grid) return;

  let reviews = [];
  try {
    const res = await fetch('reviews.json', { cache: 'no-cache' });
    if (res.ok) reviews = await res.json();
  } catch (e) {
    reviews = [];
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  grid.innerHTML = reviews.map((r) => {
    const meta = [esc(r.location), esc(r.date)].filter(Boolean).join(' · ');
    return (
      '<div class="testimonial-card scroll-reveal">' +
        '<span class="quote-icon">“</span>' +
        '<div class="stars">' + starsMarkup(r.rating) + '</div>' +
        '<p class="testimonial-text">' + esc(r.text) + '</p>' +
        '<div class="testimonial-user">' +
          '<div class="user-avatar">' + esc(initials(r.name)) + '</div>' +
          '<div class="user-info"><h5>' + esc(r.name) + '</h5>' +
            (meta ? '<p>' + meta + '</p>' : '') + '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

/** Read a translated message from its hidden template span. */
function msg(id) {
  const el = document.getElementById(id);
  return el ? el.textContent : '';
}

function initReviewForm() {
  const form = document.getElementById('review-form');
  if (!form) return;

  const status = document.getElementById('review-form-status');
  const submit = document.getElementById('review-submit');
  const honeypot = document.getElementById('review-honeypot');

  const showStatus = (text, kind) => {
    if (!status) return;
    status.textContent = text;
    status.hidden = !text;
    status.classList.remove('is-success', 'is-error');
    if (kind) status.classList.add(kind === 'success' ? 'is-success' : 'is-error');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot tripped — silently succeed so bots get no signal.
    if (honeypot && honeypot.value) {
      showStatus(msg('msg-success'), 'success');
      form.reset();
      return;
    }

    if (!form.rating || !form.rating.value) {
      showStatus(msg('msg-rating-required'), 'error');
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const action = form.getAttribute('action') || '';
    // Endpoint not configured yet — fail gracefully with the contact prompt.
    if (action.includes('REPLACE_ME')) {
      showStatus(msg('msg-error'), 'error');
      return;
    }

    if (submit) submit.disabled = true;
    showStatus(msg('msg-sending'), null);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        showStatus(msg('msg-success'), 'success');
        form.reset();
      } else {
        showStatus(msg('msg-error'), 'error');
      }
    } catch (err) {
      showStatus(msg('msg-error'), 'error');
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}
