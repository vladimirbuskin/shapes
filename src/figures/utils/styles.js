export function translate(el, point) {
  el.setAttribute('transform', `translate(${point.x}, ${point.y})`)
}

export function applyStyles(el, props) {
  el.setAttribute('fill', props['fill']);
  el.setAttribute('stroke', props['stroke']);
  el.setAttribute('stroke-width', props['stroke-width']);
}

