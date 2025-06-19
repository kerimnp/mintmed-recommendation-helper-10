
export interface VisualEffect {
  type: 'pulse' | 'flash' | 'shake' | 'glow' | 'fade';
  target: string;
  duration: number;
  intensity: number;
  color?: string;
}

export class VisualEffectsEngine {
  private activeEffects: Map<string, number> = new Map();

  applyEffect(effect: VisualEffect) {
    const element = document.querySelector(`[data-vital="${effect.target}"]`);
    if (!element) return;

    // Clear existing effect
    this.clearEffect(effect.target);

    switch (effect.type) {
      case 'pulse':
        this.applyPulseEffect(element as HTMLElement, effect);
        break;
      case 'flash':
        this.applyFlashEffect(element as HTMLElement, effect);
        break;
      case 'shake':
        this.applyShakeEffect(element as HTMLElement, effect);
        break;
      case 'glow':
        this.applyGlowEffect(element as HTMLElement, effect);
        break;
    }
  }

  private applyPulseEffect(element: HTMLElement, effect: VisualEffect) {
    const keyframes = [
      { transform: 'scale(1)', opacity: '1' },
      { transform: `scale(${1 + effect.intensity * 0.1})`, opacity: '0.8' },
      { transform: 'scale(1)', opacity: '1' }
    ];

    const animation = element.animate(keyframes, {
      duration: 600,
      iterations: effect.duration / 600,
      easing: 'ease-in-out'
    });

    const timeoutId = window.setTimeout(() => {
      animation.cancel();
      this.activeEffects.delete(effect.target);
    }, effect.duration);

    this.activeEffects.set(effect.target, timeoutId);
  }

  private applyFlashEffect(element: HTMLElement, effect: VisualEffect) {
    const originalBg = element.style.backgroundColor;
    const flashColor = effect.color || '#ff4444';
    
    let isFlashing = true;
    const flashInterval = setInterval(() => {
      element.style.backgroundColor = isFlashing ? flashColor : originalBg;
      isFlashing = !isFlashing;
    }, 200);

    const timeoutId = window.setTimeout(() => {
      clearInterval(flashInterval);
      element.style.backgroundColor = originalBg;
      this.activeEffects.delete(effect.target);
    }, effect.duration);

    this.activeEffects.set(effect.target, timeoutId);
  }

  private applyShakeEffect(element: HTMLElement, effect: VisualEffect) {
    const keyframes = [
      { transform: 'translateX(0)' },
      { transform: `translateX(-${effect.intensity}px)` },
      { transform: `translateX(${effect.intensity}px)` },
      { transform: 'translateX(0)' }
    ];

    const animation = element.animate(keyframes, {
      duration: 100,
      iterations: effect.duration / 100,
      easing: 'ease-in-out'
    });

    const timeoutId = window.setTimeout(() => {
      animation.cancel();
      this.activeEffects.delete(effect.target);
    }, effect.duration);

    this.activeEffects.set(effect.target, timeoutId);
  }

  private applyGlowEffect(element: HTMLElement, effect: VisualEffect) {
    const glowColor = effect.color || '#ff0000';
    element.style.boxShadow = `0 0 ${effect.intensity * 10}px ${glowColor}`;
    element.style.border = `2px solid ${glowColor}`;

    const timeoutId = window.setTimeout(() => {
      element.style.boxShadow = '';
      element.style.border = '';
      this.activeEffects.delete(effect.target);
    }, effect.duration);

    this.activeEffects.set(effect.target, timeoutId);
  }

  clearEffect(target: string) {
    const timeoutId = this.activeEffects.get(target);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.activeEffects.delete(target);
    }
  }

  clearAllEffects() {
    this.activeEffects.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.activeEffects.clear();
  }
}
