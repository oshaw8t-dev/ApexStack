import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, AppWindow } from 'lucide-react';

interface SlotData {
  label: string;
  color: 'normal' | 'add' | 'remove';
  index: number;
}

interface MenuData {
  slots: Omit<SlotData, 'index'>[];
  iconName: string;
}

declare global {
  interface Window {
    __apex_action: (action: string, data: unknown) => void;
  }
}

function sendAction(action: string, data: unknown = null) {
  if (typeof window.__apex_action === 'function') {
    window.__apex_action(action, data);
  }
}

function SlotIcon({ color }: { color: string }) {
  if (color === 'add')    return <Plus size={18} strokeWidth={2.5} />;
  if (color === 'remove') return <Trash2 size={16} strokeWidth={2} />;
  return <AppWindow size={16} strokeWidth={1.8} />;
}

const MIN_SEGMENTS = 6;

export function RadialMenu() {
  const [menuData, setMenuData]   = useState<MenuData | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visible, setVisible]     = useState(false);

  useEffect(() => {
    const onShow = (e: Event) => {
      const data = (e as CustomEvent<MenuData>).detail;
      setMenuData(data);
      setHoveredId(null);
      setVisible(true);
    };
    const onHide = () => setVisible(false);
    window.addEventListener('apex:show', onShow);
    window.addEventListener('apex:hide', onHide);
    return () => {
      window.removeEventListener('apex:show', onShow);
      window.removeEventListener('apex:hide', onHide);
    };
  }, []);

  const handleSlotClick = useCallback((index: number, color: string) => {
    if (color === 'add')    sendAction('add',    index);
    else if (color === 'remove') sendAction('remove', index);
    else                    sendAction('click',  index);
  }, []);

  const handleCenterClick = useCallback(() => sendAction('close', null), []);

  // ── SVG geometry ──────────────────────────────────────────────────
  const W = 400, H = 400, cx = 200, cy = 200;
  const innerR = 68, outerR = 185, centerR = 58;
  const startAngle = -Math.PI / 2;

  const realSlots = (menuData?.slots ?? []).map((s, i) => ({ ...s, index: i }));
  const padCount  = Math.max(0, MIN_SEGMENTS - realSlots.length);
  const allSlots  = [
    ...realSlots,
    ...Array.from({ length: padCount }, (_, i) => ({
      label: '', color: 'normal' as const,
      index: realSlots.length + i, isEmpty: true,
    })),
  ];
  const n         = allSlots.length;
  const angleStep = (2 * Math.PI) / n;
  const GAP       = 0.04;

  const segPath = (i: number) => {
    const a0 = startAngle + i * angleStep + GAP / 2;
    const a1 = startAngle + (i + 1) * angleStep - GAP / 2;
    const x1 = cx + Math.cos(a0) * innerR, y1 = cy + Math.sin(a0) * innerR;
    const x2 = cx + Math.cos(a1) * innerR, y2 = cy + Math.sin(a1) * innerR;
    const x3 = cx + Math.cos(a1) * outerR, y3 = cy + Math.sin(a1) * outerR;
    const x4 = cx + Math.cos(a0) * outerR, y4 = cy + Math.sin(a0) * outerR;
    const lg = a1 - a0 > Math.PI ? 1 : 0;
    return `M${x1} ${y1} A${innerR} ${innerR} 0 ${lg} 1 ${x2} ${y2} L${x3} ${y3} A${outerR} ${outerR} 0 ${lg} 0 ${x4} ${y4}Z`;
  };

  const iconPos = (i: number) => {
    const angle = startAngle + (i + 0.5) * angleStep;
    const r     = (innerR + outerR) / 2;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  };

  const segFill = (slot: (typeof allSlots)[0]) => {
    if ('isEmpty' in slot && slot.isEmpty) return 'rgba(22,24,50,0.60)';
    const hov = hoveredId === slot.index;
    if (slot.color === 'add')    return hov ? 'rgba(20,80,40,0.92)'  : 'rgba(12,50,25,0.85)';
    if (slot.color === 'remove') return hov ? 'rgba(80,18,18,0.92)'  : 'rgba(50,10,10,0.85)';
    return hov ? 'rgba(40,44,80,0.95)' : 'rgba(22,24,50,0.88)';
  };

  const segStroke = (slot: (typeof allSlots)[0]) => {
    if ('isEmpty' in slot && slot.isEmpty) return 'rgba(50,60,120,0.25)';
    const hov = hoveredId === slot.index;
    if (slot.color === 'add')    return hov ? 'rgba(60,200,100,0.6)' : 'rgba(30,100,50,0.4)';
    if (slot.color === 'remove') return hov ? 'rgba(220,60,60,0.7)'  : 'rgba(120,30,30,0.4)';
    return hov ? 'rgba(100,120,255,0.6)' : 'rgba(50,60,120,0.4)';
  };

  const accentColor = (slot: (typeof allSlots)[0]) => {
    if (slot.color === 'add')    return '#4ecb71';
    if (slot.color === 'remove') return '#cc4444';
    return '#6677ee';
  };

  const labelColor = (slot: (typeof allSlots)[0]) => {
    const hov = hoveredId === slot.index;
    if (slot.color === 'add')    return hov ? '#80ffaa' : '#4ecb71';
    if (slot.color === 'remove') return hov ? '#ff9090' : '#cc5555';
    return hov ? '#ffffff' : '#aaaacc';
  };

  const iconColor = (slot: (typeof allSlots)[0]) => {
    const hov = hoveredId === slot.index;
    if (slot.color === 'add')    return hov ? '#80ffaa' : '#3aaa60';
    if (slot.color === 'remove') return hov ? '#ff8080' : '#aa3333';
    return hov ? '#ccccff' : '#7788bb';
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', display: 'flex',
               alignItems: 'center', justifyContent: 'center',
               background: 'transparent', overflow: 'hidden' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleCenterClick(); }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="menu"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{ scale: 0.7,    opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
                 style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.55))' }}>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {allSlots.map((slot) => {
                const isEmpty = 'isEmpty' in slot && slot.isEmpty;
                const hov     = hoveredId === slot.index && !isEmpty;
                const pos     = iconPos(slot.index);
                const a0 = startAngle + slot.index * angleStep + GAP / 2;
                const a1 = startAngle + (slot.index + 1) * angleStep - GAP / 2;
                const lg = a1 - a0 > Math.PI ? 1 : 0;
                const ax1 = cx + Math.cos(a0) * (outerR-3), ay1 = cy + Math.sin(a0) * (outerR-3);
                const ax2 = cx + Math.cos(a1) * (outerR-3), ay2 = cy + Math.sin(a1) * (outerR-3);

                return (
                  <g key={slot.index}>
                    <motion.path
                      d={segPath(slot.index)}
                      fill={segFill(slot)}
                      stroke={segStroke(slot)}
                      strokeWidth={hov ? 1.5 : 1}
                      style={{ cursor: isEmpty ? 'default' : 'pointer',
                               filter: hov ? 'url(#glow)' : 'none',
                               transformOrigin: `${cx}px ${cy}px` }}
                      animate={{ scale: hov ? 1.025 : 1 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => !isEmpty && setHoveredId(slot.index)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => !isEmpty && handleSlotClick(slot.index, slot.color)}
                    />

                    {/* Accent arc on hover */}
                    {hov && (
                      <path
                        d={`M${ax1} ${ay1} A${outerR-3} ${outerR-3} 0 ${lg} 1 ${ax2} ${ay2}`}
                        fill="none" stroke={accentColor(slot)}
                        strokeWidth="2.5" strokeLinecap="round"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}

                    {/* Icon */}
                    {!isEmpty && (
                      <foreignObject x={pos.x-10} y={pos.y-22} width="20" height="20"
                                     style={{ pointerEvents: 'none', overflow: 'visible' }}>
                        <div style={{ color: iconColor(slot), display: 'flex',
                                      alignItems: 'center', justifyContent: 'center',
                                      width: 20, height: 20 }}>
                          <SlotIcon color={slot.color} />
                        </div>
                      </foreignObject>
                    )}

                    {/* Label */}
                    {!isEmpty && slot.label && (
                      <text x={pos.x} y={pos.y + 10} textAnchor="middle"
                            style={{ fontFamily: 'Segoe UI, system-ui, sans-serif',
                                     fontSize: hov ? '11px' : '10px',
                                     fontWeight: hov ? '600' : '400',
                                     fill: labelColor(slot),
                                     pointerEvents: 'none',
                                     letterSpacing: '0.2px' }}>
                        {slot.label.length > 12 ? slot.label.slice(0,11)+'…' : slot.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Inner ring */}
              <circle cx={cx} cy={cy} r={innerR}
                      fill="rgba(8,8,20,0.95)" stroke="rgba(30,32,60,0.8)" strokeWidth="1" />

              {/* Center circle */}
              <motion.g
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.15 }}
                style={{ transformOrigin: `${cx}px ${cy}px`, cursor: 'pointer' }}
                onClick={handleCenterClick}
              >
                <circle cx={cx} cy={cy} r={centerR}
                        fill="rgba(14,14,28,0.97)"
                        stroke="rgba(60,65,130,0.7)"
                        strokeWidth="1.5" filter="url(#glow)" />
                <text x={cx} y={cy - 6} textAnchor="middle"
                      style={{ fontFamily: 'Segoe UI, system-ui, sans-serif',
                               fontSize: menuData && menuData.iconName.length > 10 ? '9px' : '11px',
                               fontWeight: '500', fill: '#9090c0',
                               letterSpacing: '0.4px', pointerEvents: 'none' }}>
                  {menuData?.iconName ?? ''}
                </text>
                <text x={cx} y={cy + 10} textAnchor="middle"
                      style={{ fontFamily: 'Segoe UI, system-ui, sans-serif',
                               fontSize: '9px', fontWeight: '400',
                               fill: '#555570', letterSpacing: '0.3px',
                               pointerEvents: 'none' }}>
                  ✕ chiudi
                </text>
              </motion.g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
