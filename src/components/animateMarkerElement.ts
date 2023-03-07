export function createAnimateMarkerElement() {
  const rootElement = document.createElement('div');
  rootElement.classList.add('animate-wrapper')

  const emitterElement = document.createElement('div');
  emitterElement.classList.add('emitter')
  rootElement.append(emitterElement)

  const waveElement = document.createElement('div');
  waveElement.classList.add('wave')
  rootElement.append(waveElement)

  return rootElement;
}
