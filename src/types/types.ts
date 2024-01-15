import { RefObject } from "react";
import UnitComponent from "../components/Unit";

export interface Player {
  units: any[],
}

export interface Unit {
  row: number,
  col: number,
  ref: RefObject<UnitComponent>,
}

export interface Hex {
  x: number,
  y: number,
  unit: Unit,
}