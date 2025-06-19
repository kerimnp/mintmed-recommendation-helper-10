
export interface AudioAlert {
  type: 'alarm' | 'beep' | 'voice' | 'ambient';
  frequency?: number;
  duration?: number;
  volume?: number;
  pattern?: 'continuous' | 'intermittent' | 'pulse';
  voice?: string;
}

export class AdvancedAudioEngine {
  private audioContext: AudioContext | null = null;
  private activeAlarms: Map<string, OscillatorNode> = new Map();
  private voiceSynthesis: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.voiceSynthesis = window.speechSynthesis;
    }
  }

  playHeartMonitor(heartRate: number) {
    if (!this.audioContext) return;

    const beepInterval = 60000 / heartRate; // ms between beeps
    
    if (this.activeAlarms.has('heartbeat')) {
      this.stopAlarm('heartbeat');
    }

    const playBeep = () => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
      
      oscillator.frequency.setValueAtTime(800, this.audioContext!.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext!.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(this.audioContext!.currentTime + 0.1);
    };

    const heartbeatTimer = setInterval(playBeep, beepInterval);
    (this.activeAlarms as any).set('heartbeat', heartbeatTimer);
  }

  playAlarm(type: string, alert: AudioAlert) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(alert.frequency || 1000, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(alert.volume || 0.3, this.audioContext.currentTime);
    
    if (alert.pattern === 'intermittent') {
      // Create pulsing alarm
      const pulseInterval = setInterval(() => {
        gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime);
        gainNode.gain.setValueAtTime(alert.volume || 0.3, this.audioContext!.currentTime + 0.1);
      }, 500);
      
      setTimeout(() => clearInterval(pulseInterval), alert.duration || 5000);
    }
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + (alert.duration || 5000) / 1000);
    
    this.activeAlarms.set(type, oscillator);
  }

  speakAlert(message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    if (!this.voiceSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = priority === 'high' ? 1.2 : 1.0;
    utterance.pitch = priority === 'high' ? 1.1 : 1.0;
    utterance.volume = priority === 'high' ? 0.9 : 0.7;
    
    this.voiceSynthesis.speak(utterance);
  }

  stopAlarm(type: string) {
    const alarm = this.activeAlarms.get(type);
    if (alarm) {
      if (typeof alarm === 'number') {
        clearInterval(alarm);
      } else {
        alarm.stop();
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
