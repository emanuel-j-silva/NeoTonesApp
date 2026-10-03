import { Tone } from "../entities/note/Tone";
import { Note } from "../entities/note/Note";

export class ArrangementTextTransposer {
    static transpose(textContent: string, fromTone: Tone, toTone: Tone): string {
        const semitones = toTone.getNote().getOrdinal() - fromTone.getNote().getOrdinal();
        if (semitones === 0) return textContent;

        return textContent.replace(/\[([A-G][#b]?[a-zA-Z0-9]*)\]/g, (match, chordToken) => {
            const transposed = this.transposeChord(chordToken, semitones);
            return `[${transposed}]`;
        });
    }

    static transposePlainNotes(content: string, fromTone: Tone, toTone: Tone): string {
        const semitones = toTone.getNote().getOrdinal() - fromTone.getNote().getOrdinal();
        if (semitones === 0) return content;

        return content.split(/(\s+)/).map(token => {
            if (/^\s+$/.test(token)) return token;
            if (/^[A-G][#b]?[a-zA-Z0-9]*$/.test(token)) {
                return this.transposeChord(token, semitones);
            }
            return token;
        }).join("");
    }

    private static transposeChord(chord: string, semitones: number): string {
        const match = chord.match(/^([A-G][#b]?)(.*)$/);
        if (!match) return chord;

        const [, rootStr, suffix] = match;
        const note = Note.VALUES.find(
            n => n.getLetter() === rootStr || 
                 n.getSymbol() === rootStr || 
                 n.getRelativeFlatLetter() === rootStr || 
                 n.getRelativeFlatSymbol() === rootStr
        );
        if (!note) return chord;

        const transposedNote = note.transpose(semitones);
        return transposedNote.getLetter() + suffix;
    }
}
