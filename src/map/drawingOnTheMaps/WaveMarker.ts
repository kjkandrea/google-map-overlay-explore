interface OverlayViewConstructor {
  new(): google.maps.OverlayView;
}

export function createWaveMarkerConstructor(overlayViewConstructor: OverlayViewConstructor) {
  return class WaveMarker extends overlayViewConstructor {
    private readonly position: google.maps.LatLngLiteral
    private readonly containerDiv: HTMLDivElement;
    private readonly clickAreaButton: HTMLButtonElement;

    constructor(position: google.maps.LatLngLiteral) {
      super()
      this.position = position;
      this.containerDiv = document.createElement("div");
      this.clickAreaButton = document.createElement('button');
      this.clickAreaButton.style.cursor = 'context-menu';
      this.containerDiv.appendChild(this.createElement(this.clickAreaButton))
    }

    public addEventListener(...args: Parameters<HTMLDivElement['addEventListener']>) {
      this.clickAreaButton.addEventListener(...args)
    }

    public onAdd() {
      this.getPanes()!.floatPane.appendChild(this.containerDiv);
    }

    public onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    public draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      )!;

      // Hide the popup when it is far out of view.
      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";

      if (display === "block") {
        this.containerDiv.style.position = "absolute";
        this.containerDiv.style.left = divPosition.x + "px";
        this.containerDiv.style.top = divPosition.y + "px";
        this.containerDiv.style.transform = "translateX(-50%) translateY(-50%)"
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }

    private createElement(clickAreaButton: HTMLButtonElement) {
      const rootElement = document.createElement('div');
      rootElement.classList.add('animate-wrapper')

      rootElement.appendChild(clickAreaButton)

      const emitterElement = document.createElement('div');
      emitterElement.classList.add('emitter')
      rootElement.appendChild(emitterElement)

      const waveElement = document.createElement('div');
      waveElement.classList.add('wave')
      rootElement.appendChild(waveElement)

      return rootElement;
    }
  }
}
