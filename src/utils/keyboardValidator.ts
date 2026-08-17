import { ALL_KEYBOARDS } from '../data/keyboards';
import { KeyboardLayout, KeyDefinition } from '../types';
import { getPhysicalKeyHint, processPhysicalKeyStroke } from './keyboardEngine';

export interface AuditReportItem {
  keyboardId: string;
  keyboardName: string;
  totalKeys: number;
  keysWithCode: number;
  keysMissingCode: number;
  discrepancies: string[];
  status: 'passed' | 'warning' | 'failed';
}

export interface FullAuditResult {
  totalKeyboards: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  reports: AuditReportItem[];
}

/**
 * Perform a complete audit across all keyboards in KeypadKing
 * Verifies that:
 * A. Physical keyboard keycode resolves correctly
 * B. Virtual keyboard physical-key hint matches layout standards
 * C. Target-language character produced matches keycap char
 */
export function auditAllKeyboards(): FullAuditResult {
  const reports: AuditReportItem[] = [];

  for (const keyboard of ALL_KEYBOARDS) {
    const discrepancies: string[] = [];
    let totalKeys = 0;
    let keysWithCode = 0;
    let keysMissingCode = 0;

    const rowsToCheck: KeyDefinition[][] = keyboard.rows || [];

    for (let rIdx = 0; rIdx < rowsToCheck.length; rIdx++) {
      const row = rowsToCheck[rIdx];
      for (let kIdx = 0; kIdx < row.length; kIdx++) {
        const keyDef = row[kIdx];
        totalKeys++;

        if (!keyDef.char && keyDef.char !== '') {
          discrepancies.push(`Row ${rIdx + 1}, Key ${kIdx + 1}: Missing char property`);
          continue;
        }

        if (keyDef.code) {
          keysWithCode++;

          // 1. Verify hint resolution
          const qwertyHint = getPhysicalKeyHint(keyDef, 'qwerty');
          if (!qwertyHint) {
            discrepancies.push(`Key ${keyDef.char} (${keyDef.code}): No QWERTY physical hint found`);
          }

          // 2. Verify Hardware mode stroke resolution
          const hwResult = processPhysicalKeyStroke('', keyDef.code, false, false, '', 0, 0, keyboard, false, 'qwerty');
          if (!hwResult.handled || hwResult.insertedChar !== keyDef.char) {
            discrepancies.push(`Hardware mismatch on ${keyDef.code}: Keycap='${keyDef.char}', Engine output='${hwResult.insertedChar}'`);
          }

          // 3. Verify Shift stroke resolution if shiftChar exists
          if (keyDef.shiftChar) {
            const shiftResult = processPhysicalKeyStroke('', keyDef.code, true, false, '', 0, 0, keyboard, false, 'qwerty');
            if (!shiftResult.handled || shiftResult.insertedChar !== keyDef.shiftChar) {
              discrepancies.push(`Shift mismatch on ${keyDef.code}: Keycap='${keyDef.shiftChar}', Engine output='${shiftResult.insertedChar}'`);
            }
          }

          // 4. Verify AltGr stroke resolution if altChar exists
          if (keyDef.altChar) {
            const altResult = processPhysicalKeyStroke('', keyDef.code, false, true, '', 0, 0, keyboard, false, 'qwerty');
            if (!altResult.handled || altResult.insertedChar !== keyDef.altChar) {
              discrepancies.push(`AltGr mismatch on ${keyDef.code}: Keycap='${keyDef.altChar}', Engine output='${altResult.insertedChar}'`);
            }
          }
        } else {
          keysMissingCode++;
        }
      }
    }

    const status: 'passed' | 'warning' | 'failed' = 
      discrepancies.length > 0 ? 'failed' : (keysMissingCode > 0 ? 'warning' : 'passed');

    reports.push({
      keyboardId: keyboard.id,
      keyboardName: keyboard.name,
      totalKeys,
      keysWithCode,
      keysMissingCode,
      discrepancies,
      status
    });
  }

  const passedCount = reports.filter(r => r.status === 'passed').length;
  const warningCount = reports.filter(r => r.status === 'warning').length;
  const failedCount = reports.filter(r => r.status === 'failed').length;

  return {
    totalKeyboards: ALL_KEYBOARDS.length,
    passedCount,
    warningCount,
    failedCount,
    reports
  };
}
