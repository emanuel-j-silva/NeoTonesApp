/**
 * Mapeia a posição de uma nota da melodia sobre o texto da frase.
 *
 * noteIndex: índice da nota dentro da Melody associada à frase.
 * charIndex: posição do caractere na frase onde a anotação aparece.
 */
export type NoteLayoutPosition = {
    noteIndex: number;
    charIndex: number;
};
