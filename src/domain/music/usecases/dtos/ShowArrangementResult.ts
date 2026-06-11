import { Arrangement } from "../../entities/Arrangement";

export type ShowArrangementResult = {
  musicId: string;
  title: string;
  arrangement: Arrangement;
};