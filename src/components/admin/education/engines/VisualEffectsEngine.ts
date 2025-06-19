
export interface VisualEffect {
  type: 'pulse' | 'flash' | 'shake' | 'glow' | 'fade' | 'monitor-flicker' | 'alarm-light' | 'equipment-status';
  target: string;
  duration: number;
  intensity: number;
  color?: string;
  pattern?: 'steady' | 'blinking' | 'rapid' | 'slow';
}

export interface MonitorEffect {
  type: 'waveform' | 'flatline' | 'irregular' | 'normal';
  parameter: string;
  duration?: number;
}

export class VisualEffectsEngine {
  private activeEffects: Map<string, number> = new Map();
  private monitorEffects: Map<string, any> = new Map();
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    this.initializeCanvas();
  }

  private initializeCanvas() {
    // Create a canvas for drawing waveforms and advanced effects
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1000';
    this.ctx = this.canvas.getContext('2d');
  }

  applyEffect(effect: VisualEffect) {
    const element = document.querySelector(`[data-vital="${effect.target}"]`);
    if (!element) return;

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
      case 'monitor-flicker':
        this.applyMonitorFlickerEffect(element as HTMLElement, effect);
        break;
      case 'alarm-light':
        this.applyAlarmLightEffect(element as HTMLElement, effect);
        break;
      case 'equipment-status':
        this.applyEquipmentStatusEffect(element as HTMLElement, effect);
        break;
    }
  }

  private applyMonitorFlickerEffect(element: HTMLElement, effect: VisualEffect) {
    let flickerCount = 0;
    const maxFlickers = Math.floor(effect.duration / 100);
    
    const flickerInterval = setInterval(() => {
      if (flickerCount >= maxFlickers) {
        clearInterval(flickerInterval);
        this.activeEffects.delete(effect.target);
        return;
      }
      
      // Simulate monitor flicker with opacity changes
      element.style.opacity = Math.random() > 0.5 ? '0.3' : '1';
      element.style.filter = `brightness(${0.5 + Math.random() * 0.5})`;
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.filter = 'brightness(1)';
      }, 50);
      
      flickerCount++;
    }, 100);

    const timeoutId = window.setTimeout(() => {
      clearInterval(flickerInterval);
      element.style.opacity = '1';
      element.style.filter = 'brightness(1)';
      this.activeEffects.delete(effect.target);
    }, effect.duration);

    this.activeEffects.set(effect.target, timeoutId);
  }

  private applyAlarmLightEffect(element: HTMLElement, effect: VisualEffect) {
    const alarmColor = effect.color || '#ff0000';
    let isOn = true;
    
    const blinkInterval = setInterval(() => {
      if (isOn) {
        element.style.backgroundColor = alarmColor;
        element.style.boxShadow = `0 0 20px ${alarmColor}, inset 0 0 20px ${alarmColor}`;
        element.style.borderColor = alarmColor;
      } else {
        element.style.backgroundColor = '';
        element.style.boxShadow = '';
        element.style.borderColor = '';
      }
      isOn = !isOn;
    }, effect.pattern === 'rapid' ? 150 : effect.pattern === 'slow' ? 800 : 400);

    const timeoutId = window.setTimeout(() => {
      clearInterval(blinkInterval);
      element.style.backgroundColor = '';
      element.style.boxShadow = '';
      element.style.borderColor = '';
      this.activeEffects.delete(effect.target);
    }, effect.duration);

    this.activeEffects.set(effect.target, timeoutId);
  }

  private applyEquipmentStatusEffect(element: HTMLElement, effect: VisualEffect) {
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'equipment-status-indicator';
    statusIndicator.style.cssText = `
      position: absolute;
      top: -5px;
      right: -5px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${effect.color || '#00ff00'};
      box-shadow: 0 0 10px ${effect.color || '#00ff00'};
      z-index: 1000;
      animation: pulse 1s infinite;
    `;

    element.style.position = 'relative';
    element.appendChild(statusIndicator);

    const timeoutId = window.setTimeout(() => {
      if (statusIndicator.parentNode) {
        statusIndicator.parentNode.removeChild(statusIndicator);
      }
      this.activeEffects.delete(effect.target);
    }, effect.duration);

    this.activeEffects.set(effect.target, timeoutId);
  }

  drawECGWaveform(elementId: string, heartRate: number, isNormal: boolean = true) {
    const element = document.getElementById(elementId);
    if (!element || !this.ctx) return;

    const rect = element.getBoundingClientRect();
    if (!this.canvas) return;
    
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.canvas.style.left = rect.left + 'px';
    this.canvas.style.top = rect.top + 'px';
    
    if (!document.body.contains(this.canvas)) {
      document.body.appendChild(this.canvas);
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = isNormal ? '#00ff00' : '#ff0000';
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = 0.8;

    const centerY = this.canvas.height / 2;
    const amplitude = this.canvas.height * 0.3;
    const frequency = heartRate / 60; // Hz
    const timeSpan = 5; // seconds visible
    const pointsPerSecond = 100;

    this.ctx.beginPath();
    for (let i = 0; i < timeSpan * pointsPerSecond; i++) {
      const x = (i / pointsPerSecond / timeSpan) * this.canvas.width;
      const t = (i / pointsPerSecond);
      
      let y = centerY;
      
      if (isNormal) {
        // Normal ECG pattern
        const beatTime = t % (1 / frequency);
        const phase = beatTime * frequency;
        
        if (phase < 0.1) {
          // P wave
          y += amplitude * 0.2 * Math.sin(phase * Math.PI / 0.1);
        } else if (phase > 0.2 && phase < 0.5) {
          // QRS complex
          const qrsPhase = (phase - 0.2) / 0.3;
          if (qrsPhase < 0.3) {
            y -= amplitude * 0.3; // Q
          } else if (qrsPhase < 0.7) {
            y += amplitude * 1.5; // R
          } else {
            y -= amplitude * 0.5; // S
          }
        } else if (phase > 0.6 && phase < 0.8) {
          // T wave
          const tPhase = (phase - 0.6) / 0.2;
          y += amplitude * 0.4 * Math.sin(tPhase * Math.PI);
        }
      } else {
        // Irregular pattern
        y += amplitude * Math.sin(t * frequency * 2 * Math.PI) * (0.5 + Math.random() * 0.5);
        y += amplitude * 0.3 * Math.sin(t * frequency * 8 * Math.PI) * Math.random();
      }
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();
  }

  showFlatline(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element || !this.ctx) return;

    const rect = element.getBoundingClientRect();
    if (!this.canvas) return;
    
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.lineWidth = 3;
    
    const centerY = this.canvas.height / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, centerY);
    this.ctx.lineTo(this.canvas.width, centerY);
    this.ctx.stroke();
    
    // Add alarm effect
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
