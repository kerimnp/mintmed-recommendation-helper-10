
export interface AudioAlert {
  type: 'alarm' | 'beep' | 'voice' | 'ambient' | 'equipment';
  frequency?: number;
  duration?: number;
  volume?: number;
  pattern?: 'continuous' | 'intermittent' | 'pulse' | 'critical';
  voice?: string;
  equipmentType?: 'ventilator' | 'monitor' | 'pump' | 'defibrillator';
}

export class AdvancedAudioEngine {
  private audioContext: AudioContext | null = null;
  private activeAlarms: Map<string, OscillatorNode | NodeJS.Timeout> = new Map();
  private voiceSynthesis: SpeechSynthesis | null = null;
  private ambientSounds: Map<string, AudioBufferSourceNode> = new Map();
  private masterVolume: number = 0.7;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.voiceSynthesis = window.speechSynthesis;
      this.initializeAmbientSounds();
    }
  }

  private initializeAmbientSounds() {
    // Initialize hospital ambient sounds
    this.playAmbientSound('hospital-background', 0.1, true);
  }

  playHeartMonitor(heartRate: number) {
    if (!this.audioContext) return;

    const beepInterval = 60000 / heartRate;
    
    if (this.activeAlarms.has('heartbeat')) {
      this.stopAlarm('heartbeat');
    }

    const playBeep = () => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();
      const filter = this.audioContext!.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
      
      // More realistic heart monitor beep
      filter.type = 'highpass';
      filter.frequency.value = 800;
      
      oscillator.frequency.setValueAtTime(1000, this.audioContext!.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext!.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.15 * this.masterVolume, this.audioContext!.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(this.audioContext!.currentTime + 0.1);
    };

    const heartbeatTimer = setInterval(playBeep, beepInterval);
    this.activeAlarms.set('heartbeat', heartbeatTimer);
  }

  playEquipmentSound(equipmentType: string, action: 'start' | 'alarm' | 'stop') {
    if (!this.audioContext) return;

    switch (equipmentType) {
      case 'ventilator':
        this.playVentilatorSound(action);
        break;
      case 'infusion-pump':
        this.playInfusionPumpSound(action);
        break;
      case 'defibrillator':
        this.playDefibrillatorSound(action);
        break;
    }
  }

  private playVentilatorSound(action: string) {
    if (action === 'start') {
      const ventilatorTimer = setInterval(() => {
        this.createWhiteNoise(0.05, 800, 1500);
      }, 3000); // Every 3 seconds for ventilator cycle
      
      this.activeAlarms.set('ventilator', ventilatorTimer);
    }
  }

  private playInfusionPumpSound(action: string) {
    if (action === 'alarm') {
      this.playComplexAlarm('infusion-alarm', {
        type: 'alarm',
        frequency: 1500,
        duration: 5000,
        volume: 0.3,
        pattern: 'critical'
      });
    }
  }

  private playDefibrillatorSound(action: string) {
    if (action === 'start') {
      // Charging sound
      this.createSweepTone(200, 2000, 3000, 0.2);
      
      setTimeout(() => {
        // Discharge sound
        this.createImpactSound();
      }, 3000);
    }
  }

  private createWhiteNoise(volume: number, lowFreq: number, highFreq: number) {
    if (!this.audioContext) return;

    const bufferSize = this.audioContext.sampleRate * 0.1;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * volume;
    }

    const noise = this.audioContext.createBufferSource();
    const filter = this.audioContext.createBiquadFilter();
    const gainNode = this.audioContext.createGain();

    noise.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.value = (lowFreq + highFreq) / 2;
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    gainNode.gain.value = this.masterVolume;
    noise.start();
  }

  private createSweepTone(startFreq: number, endFreq: number, duration: number, volume: number) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.audioContext.currentTime + duration / 1000);
    
    gainNode.gain.setValueAtTime(volume * this.masterVolume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  private createImpactSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
    filter.type = 'lowpass';
    filter.frequency.value = 100;
    
    gainNode.gain.setValueAtTime(0.8 * this.masterVolume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  playComplexAlarm(type: string, alert: AudioAlert) {
    if (!this.audioContext) return;

    if (alert.pattern === 'critical') {
      // Triple beep pattern for critical alarms
      this.playTripleBeepPattern(alert);
    } else {
      // Keep existing alarm logic
      this.playAlarm(type, alert);
    }
  }

  private playTripleBeepPattern(alert: AudioAlert) {
    const playBeep = (delay: number) => {
      const timeoutId = setTimeout(() => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);
        
        oscillator.frequency.setValueAtTime(alert.frequency || 1200, this.audioContext!.currentTime);
        gainNode.gain.setValueAtTime((alert.volume || 0.4) * this.masterVolume, this.audioContext!.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.15);
        
        oscillator.start();
        oscillator.stop(this.audioContext!.currentTime + 0.15);
      }, delay);
      return timeoutId;
    };

    // Triple beep: beep-beep-beep with short intervals
    playBeep(0);
    playBeep(200);
    playBeep(400);
  }

  playAmbientSound(type: string, volume: number, loop: boolean = false) {
    // Simulate ambient hospital sounds (would normally load actual audio files)
    if (type === 'hospital-background') {
      // Create subtle background hum
      this.createWhiteNoise(volume * 0.3, 50, 200);
    }
  }

  speakMedicalAlert(message: string, urgency: 'routine' | 'urgent' | 'critical' = 'routine') {
    if (!this.voiceSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(message);
    
    switch (urgency) {
      case 'critical':
        utterance.rate = 1.3;
        utterance.pitch = 1.2;
        utterance.volume = 0.9 * this.masterVolume;
        break;
      case 'urgent':
        utterance.rate = 1.1;
        utterance.pitch = 1.1;
        utterance.volume = 0.8 * this.masterVolume;
        break;
      default:
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 0.7 * this.masterVolume;
    }
    
    this.voiceSynthesis.speak(utterance);
  }

  playAlarm(type: string, alert: AudioAlert) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(alert.frequency || 1000, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime((alert.volume || 0.3) * this.masterVolume, this.audioContext.currentTime);
    
    if (alert.pattern === 'intermittent') {
      const pulseInterval = setInterval(() => {
        gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime);
        gainNode.gain.setValueAtTime((alert.volume || 0.3) * this.masterVolume, this.audioContext!.currentTime + 0.1);
      }, 500);
      
      const stopTimer = setTimeout(() => clearInterval(pulseInterval), alert.duration || 5000);
      this.activeAlarms.set(`${type}-pulse`, stopTimer);
    }
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + (alert.duration || 5000) / 1000);
    
    this.activeAlarms.set(type, oscillator);
  }

  speakAlert(message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    this.speakMedicalAlert(message, priority === 'high' ? 'critical' : priority === 'medium' ? 'urgent' : 'routine');
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  stopAlarm(type: string) {
    const alarm = this.activeAlarms.get(type);
    if (alarm) {
      if (alarm instanceof OscillatorNode) {
        alarm.stop();
      } else {
        clearInterval(alarm as NodeJS.Timeout);
      }
      this.activeAlarms.delete(type);
    }
  }

  stopAllAlarms() {
    this.activeAlarms.forEach((alarm, type) => {
      this.stopAlarm(type);
    });
  }
}
