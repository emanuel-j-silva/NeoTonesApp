import { Tone } from "../entities/note/Tone";
import { Note } from "../entities/note/Note";

export class ArrangementTextTransposer {
    private static readonly NOTE_MAP: { [key: string]: Note } = {
        // English
        "C": Note.C, "C#": Note.C_SHARP, "Db": Note.C_SHARP,
        "D": Note.D, "D#": Note.D_SHARP, "Eb": Note.D_SHARP,
        "E": Note.E,
        "F": Note.F, "F#": Note.F_SHARP, "Gb": Note.F_SHARP,
        "G": Note.G, "G#": Note.G_SHARP, "Ab": Note.G_SHARP,
        "A": Note.A, "A#": Note.A_SHARP, "Bb": Note.A_SHARP,
        "B": Note.B,

        // Portuguese Solfege (traditional)
        "DO": Note.C, "DÓ": Note.C,
        "DO#": Note.C_SHARP, "DÓ#": Note.C_SHARP, "DOB": Note.B, "DÓB": Note.B, "DB": Note.C_SHARP,
        "RE": Note.D, "RÉ": Note.D,
        "RE#": Note.D_SHARP, "RÉ#": Note.D_SHARP, "REB": Note.C_SHARP, "RÉB": Note.C_SHARP, "EB": Note.D_SHARP, "MIB": Note.D_SHARP,
        "MI": Note.E,
        "FA": Note.F, "FÁ": Note.F,
        "FA#": Note.F_SHARP, "FÁ#": Note.F_SHARP, "FAB": Note.E, "GB": Note.F_SHARP, "SOLB": Note.F_SHARP,
        "SOL": Note.G,
        "SOL#": Note.G_SHARP, "AB": Note.G_SHARP, "LAB": Note.G_SHARP, "LÁB": Note.G_SHARP,
        "LA": Note.A, "LÁ": Note.A,
        "LA#": Note.A_SHARP, "LÁ#": Note.A_SHARP, "BB": Note.A_SHARP, "SIB": Note.A_SHARP,
        "SI": Note.B,
    };

    static transpose(textContent: string, fromTone: Tone, toTone: Tone): string {
        const semitones = toTone.getNote().getOrdinal() - fromTone.getNote().getOrdinal();
        if (semitones === 0) return textContent;

        // Transpose brackets [chord]
        let result = textContent.replace(/\[([^\]]+)\]/g, (match, chordContent) => {
            return `[${this.transposeChordContent(chordContent, semitones)}]`;
        });

        // Transpose slash /chord
        result = result.replace(/\/([A-Za-zÇçÁáÉéÍíÓóÚúÃãÕõ#b]+[a-zA-Z0-9/]*)/g, (match, chordContent) => {
            return `/${this.transposeChordContent(chordContent, semitones)}`;
        });

        return result;
    }

    private static transposeChordContent(chordContent: string, semitones: number): string {
        const parts = chordContent.split("/");
        const transposedParts = parts.map((part) => {
            const match = part.match(/^([A-Za-zÇçÁáÉéÍíÓóÚúÃãÕõ#b]+)(.*)$/);
            if (!match) return part;
            const [, noteStr, suffix] = match;
            return this.transposeNoteToken(noteStr, suffix, semitones);
        });
        return transposedParts.join("/");
    }

    private static transposeNoteToken(noteStr: string, suffix: string, semitones: number): string {
        const upper = noteStr.toUpperCase();
        const note = this.NOTE_MAP[upper];
        if (!note) return noteStr + suffix;

        const transposedNote = note.transpose(semitones);

        // Preserve capitalization style of the input note root (e.g. "Fa#" -> "Sol#", "FA#" -> "SOL#", "do" -> "re")
        const outputSymbol = this.formatOutputNote(noteStr, transposedNote);
        return outputSymbol + suffix;
    }

    private static formatOutputNote(original: string, note: Note): string {
        // If original was Portuguese solfege (starts with Do, Re, Mi, Fa, Sol, La, Si, Dó, Ré, Fá, Lá), use solfege symbol
        const upper = original.toUpperCase();
        const isSolfege = ["DO", "DÓ", "RE", "RÉ", "MI", "FA", "FÁ", "SOL", "LA", "LÁ", "SI"].some(s => upper.startsWith(s));

        let base = isSolfege ? note.getSymbol() : note.getLetter();

        // Match casing of original
        if (original === original.toLowerCase()) {
            return base.toLowerCase();
        }
        if (original[0] === original[0].toUpperCase() && original.slice(1) === original.slice(1).toLowerCase()) {
            return base[0].toUpperCase() + base.slice(1).toLowerCase();
        }
        return base;
    }
}
