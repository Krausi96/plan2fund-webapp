import aws from "../data/rules/aws_preseed.rules.json";
import ffg from "../data/rules/ffg_basisprogramm.rules.json";
import eu from "../data/rules/eu_startup_call.rules.json";
import visa from "../data/rules/visa_rwr.rules.json";
import ams from "../data/rules/ams_wko_basic.rules.json";
import bank from "../data/rules/bank_loan_leasing.rules.json";

export const PROGRAM_RULES = {
  "aws_preseed": aws,
  "ffg_basisprogramm": ffg,
  "eu_startup_call": eu,
  "visa_rwr": visa,
  "ams_wko_basic": ams,
  "bank_loan_leasing": bank
};