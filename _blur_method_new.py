    def _draw_blur_bg(self, p, si, alpha):
        """Scala il pixmap full-screen alla dimensione logica del widget,
        poi ritaglia alla zona delle sub-app. Nessun calcolo DPI manuale."""
        if si not in self._blur_cache: return
        blurred = self._blur_cache[si]
        st = self.stacks[si]
        rects = [self._sub_rect(st, d, j, 1.0)
                 for d in DIRS for j in range(len(st.slots.get(d, [])))]
        if not rects: return
        pad = 30
        bx = max(0, min(r.left()  for r in rects) - pad)
        by = max(0, min(r.top()   for r in rects) - pad)
        bw = max(r.right()  for r in rects) + pad - bx
        bh = max(r.bottom() for r in rects) + pad - by
        log.debug(f"_draw_blur_bg: zone=({bx},{by},{bw},{bh}) widget=({self.width()},{self.height()}) px=({blurred.width()}x{blurred.height()})")
        # Scala il pixmap alle dimensioni logiche del widget (gestisce DPI in automatico)
        scaled = blurred.scaled(self.width(), self.height(),
                                Qt.AspectRatioMode.IgnoreAspectRatio,
                                Qt.TransformationMode.SmoothTransformation)
        clip = QPainterPath()
        clip.addRect(QRectF(bx, by, bw, bh))
        p.save()
        p.setOpacity(min(1.0, alpha))
        p.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)
        p.setClipPath(clip)
        p.drawPixmap(0, 0, scaled)
        p.restore()
