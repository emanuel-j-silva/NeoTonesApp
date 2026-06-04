export interface MusicComponent {
  shiftTone(semitones: number): MusicComponent;
  equals(other: MusicComponent): boolean;
}