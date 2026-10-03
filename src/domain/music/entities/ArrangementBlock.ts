import { Tone } from "./note/Tone";
import { ArrangementTextTransposer } from "../usecases/ArrangementTextTransposer";

export type BlockType = "notes" | "lyrics" | "section";

export class ArrangementBlock {
    constructor(
        readonly id: string,
        readonly type: BlockType,
        readonly content: string
    ) {
        if (!id) throw new Error("Block id cannot be empty");
        if (!type) throw new Error("Block type cannot be empty");
        if (content == null) throw new Error("Block content cannot be null");
    }

    transpose(fromTone: Tone, toTone: Tone): ArrangementBlock {
        if (this.type !== "notes") {
            return this;
        }
        const transposedContent = ArrangementTextTransposer.transposePlainNotes(this.content, fromTone, toTone);
        return new ArrangementBlock(this.id, this.type, transposedContent);
    }

    equals(other: ArrangementBlock | null | undefined): boolean {
        if (!other) return false;
        return this.id === other.id && this.type === other.type && this.content === other.content;
    }
}
