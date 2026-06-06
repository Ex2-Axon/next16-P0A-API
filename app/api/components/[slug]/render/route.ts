import { NextResponse, NextRequest } from 'next/server';
import { getComponent } from '@/lib/component-registry';

function escapeHtml(str: unknown) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function renderTemplate(meta: any) {
  const id = meta.id;
  const data = meta.render || {};

  if (id === 'navbar') {
    const brand = escapeHtml(data.brand ?? 'Microtronic Thailand');
    const badge = escapeHtml(data.badge ?? 'Donation & Payment');
    const subtitle = escapeHtml(data.subtitle ?? '');
    const actionLabel = escapeHtml(data.actionLabel ?? 'Micro Donate & Payment');
    const actionHref = escapeHtml(data.actionHref ?? '#');
    return `
      <nav class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl px-6 py-4">
        <div class="mx-auto flex flex-wrap items-center justify-between gap-4 max-w-7xl">
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-3xl bg-linear-to-br"></div>
            <div>
              <p class="text-base font-black">${brand}</p>
              <p class="text-[10px] uppercase">${badge}</p>
            </div>
          </div>
          <div class="hidden lg:flex items-center gap-3 text-xs text-slate-400">
            <div class="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 text-slate-200">
              <span>${subtitle}</span>
            </div>
            <a href="${actionHref}" target="_blank" rel="noreferrer" class="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-amber-300">${actionLabel}</a>
          </div>
        </div>
      </nav>
    `;
  }

  if (id === 'footer') {
    const description = escapeHtml(data.description ?? '');
    const legal = (data.legalLinks || []).map((l: any) => `<li><a href="${escapeHtml(l.href)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a></li>`).join('');
    const contacts = (data.contactLinks || []).map((c: any) => `<li><a href="${escapeHtml(c.href)}" target="_blank" rel="noreferrer">${escapeHtml(c.label)}</a></li>`).join('');
    const socials = (data.socialLinks || []).map((s: any) => `<a href="${escapeHtml(s.href)}" target="_blank" rel="noreferrer">${escapeHtml(s.label)}</a>`).join(' ');

    return `
      <footer class="border-t border-slate-800/80 bg-slate-950/95 text-slate-300">
        <div class="mx-auto max-w-7xl px-4 py-12">
          <div>
            <p>${description}</p>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>${legal}</ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>${contacts}</ul>
          </div>
          <div>${socials}</div>
        </div>
      </footer>
    `;
  }

  return null;
}

/**
 * GET /api/components/[slug]/render
 * Server-side render a component to HTML and return the string
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const meta = getComponent(slug);
  if (!meta) {
    return NextResponse.json({ success: false, error: 'Component not found' }, { status: 404 });
  }

  try {
    const html = renderTemplate(meta);
    if (html == null) {
      return NextResponse.json({ success: false, error: 'No template available for component' }, { status: 501 });
    }
    return NextResponse.json({ success: true, component: slug, renderHtml: html });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
