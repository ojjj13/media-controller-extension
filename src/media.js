(() => {
  if (document.querySelector("[mcx-media]") === null) {
    for (const $media of document.querySelectorAll("audio, video")) {
      if (!$media.paused && !$media.muted) {
        $media.toggleAttribute("mcx-media", true);
        window.dispatchEvent(new Event("hook"));
        return;
      }
    }
    ["play", "pause"].forEach((method) => {
      const originalMethod = Audio.prototype[method];
      Audio.prototype[method] = function () {
        const value = originalMethod.apply(this, arguments);
        if (this.getAttribute("mcx-media") === null) {
          if (!document.contains(this)) {
            document.body.append(this);
          }
          this.toggleAttribute("mcx-media", true);
          window.dispatchEvent(new Event("hook"));
        }
        return value;
      };
    });
  }
})();
