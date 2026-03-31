ALTER TABLE timeclock_entries
  CHANGE COLUMN clockOUT clockOutTmp DATETIME NULL;

ALTER TABLE timeclock_entries
  CHANGE COLUMN clockOutTmp clockOut DATETIME NULL;