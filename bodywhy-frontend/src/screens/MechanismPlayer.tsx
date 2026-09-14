import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNode } from '../api/client';
import type { NodeData } from '../api/client';

export function MechanismPlayer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [node, setNode] = useState<NodeData | null>(null);
  const [beat, setBeat] = useState<string>('hook');
  const [canAdvance, setCanAdvance] = useState(true);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!id) return;
    getNode(id).then(setNode);
    setBeat('hook');
  }, [id]);

  const steps: string[] = parseSteps(node?.mechanismStepsJson);
  const beatOrder: string[] = ['hook', 'tension', ...steps.map((_, i) => `step${i}`), 'realization', 'thread', 'takeaway'];

  useEffect(() => {
    if (!liveRegionRef.current || !node) return;
    liveRegionRef.current.setAttribute('aria-live', beat === 'realization' ? 'assertive' : 'polite');
    liveRegionRef.current.textContent = beatText();
  }, [beat, node]);

  useEffect(() => {
    if (beat !== 'realization' || reducedMotion) { setCanAdvance(true); return; }
    setCanAdvance(false);
    const t = setTimeout(() => setCanAdvance(true), 1750);
    return () => clearTimeout(t);
  }, [beat]);

  const advance = () => {
    if (!canAdvance) return;
    const idx = beatOrder.indexOf(beat);
    if (idx < beatOrder.length - 1) setBeat(beatOrder[idx + 1]);
    else navigate('/');
  };

  const exit = () => navigate(-1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exit();
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); advance(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [beat, canAdvance]);

  function beatText(): string {
    if (!node) return '';
    if (beat === 'hook') return node.hookText ?? '';
    if (beat === 'tension') return node.tensionText ?? '';
    if (beat === 'realization') return node.realizationText ?? '';
    if (beat === 'thread') return node.threadText ?? '';
    if (beat === 'takeaway') return node.takeawayText ?? '';
    return steps[Number(beat.replace('step', ''))] ?? '';
  }

  function parseSteps(json: string | null | undefined): string[] {
    if (!json) return [];
    try {
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  if (!node) {
    return (
      <div aria-busy="true" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-base)' }}>
        <div aria-hidden="true" style={{ width: '60%', height: '2.25rem', background: 'var(--ink-secondary)', opacity: 0.4 }} />
      </div>
    );
  }

  const stepIndex = beat.startsWith('step') ? Number(beat.replace('step', '')) : -1;
  const isRealization = beat === 'realization';
  const isTakeaway = beat === 'takeaway';

  return (
    <div
      onClick={advance}
      role="button" tabIndex={0}
      aria-label="Tap or press space to continue"
      style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 'var(--space-4)', cursor: 'pointer',
        background: isTakeaway ? '#F8F1E7' : 'var(--surface-base)',
        transition: reducedMotion ? 'none' : `background var(--duration-fast) var(--easing-standard)`,
      }}
    >
      <div ref={liveRegionRef} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }} />

      {stepIndex >= 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}
             aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
          {steps.map((_, i) => (
            <span key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i === stepIndex ? 'var(--ink-primary)' : 'var(--ink-secondary)',
              opacity: i === stepIndex ? 1 : 0.4,
            }} />
          ))}
        </div>
      )}

      <p
        key={beat}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isRealization ? 'var(--text-hook)' : 'var(--text-body-lg)',
          lineHeight: isRealization ? 1.3 : 1.6,
          color: 'var(--ink-primary)', maxWidth: 'var(--content-max-width)',
          animation: reducedMotion ? 'none' : `fadeSettle var(--duration-fast) var(--easing-standard)`,
        }}
      >
        {beatText()}
      </p>

      {beat === 'thread' && node.threadNodeId && (
        <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/mechanism/${node.threadNodeId}`); }}
            style={{ background: 'none', border: 'none', color: 'var(--accent-interactive)', fontSize: 'var(--text-body)', cursor: 'pointer' }}
          >
            See how that loop works →
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); advance(); }}
            style={{ background: 'none', border: 'none', color: 'var(--ink-secondary)', fontSize: 'var(--text-label)', cursor: 'pointer' }}
          >
            Not now
          </button>
        </div>
      )}

      {beat !== 'thread' && (!isRealization || canAdvance) && (
        <span aria-hidden="true" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-label)', color: 'var(--ink-secondary)', opacity: 0.4 }}>
          ⌄
        </span>
      )}

      <style>{`@keyframes fadeSettle { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}