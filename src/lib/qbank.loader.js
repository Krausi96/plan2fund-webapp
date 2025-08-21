import qbank from "../data/qbank.json";
import aws from "../data/overlays/aws_preseed.overlay.json";
import ffg from "../data/overlays/ffg_basisprogramm.overlay.json";
import eu from "../data/overlays/eu_startup_call.overlay.json";
import visa from "../data/overlays/visa_rwr.overlay.json";
import ams from "../data/overlays/ams_wko_basic.overlay.json";
import bank from "../data/overlays/bank_loan_leasing.overlay.json";

export const OVERLAYS = {
  "aws_preseed": aws,
  "ffg_basisprogramm": ffg,
  "eu_startup_call": eu,
  "visa_rwr": visa,
  "ams_wko_basic": ams,
  "bank_loan_leasing": bank
};

export function getQBank(){ return qbank; }
export function getOverlay(programId){ return OVERLAYS[programId] || null; }