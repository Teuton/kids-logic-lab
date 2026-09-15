import {renderPrimeForest} from './primeForest.js';
import {renderFactorFactory} from './factorFactory.js';
import {renderCoprimeGate} from './coprimeGate.js';
import {renderGcdMine} from './gcdMine.js';
import {renderLcmRace} from './lcmRace.js';
import {renderZeroFactory} from './zeroFactory.js';
import {renderRunningTrack} from './runningTrack.js';
import {renderLampMission} from './lampMission.js';
import {renderNumberBalance} from './numberBalance.js';
import {renderRectanglePuzzle} from './rectanglePuzzle.js';
import {renderPaperFold} from './paperFold.js';
import {renderCandyFilter} from './candyFilter.js';
import {renderGearRatio} from './gearRatio.js';
import {renderLcmNumberLine} from './lcmNumberLine.js';
import { lifeMissionLevels } from '../data/lifeMissionLevels.js';
import { makeLifeMissionRenderer } from './lifeMission.js';

const legacyRenderers = {
  'prime-forest':renderPrimeForest,
  'factor-factory':renderFactorFactory,
  'coprime-gate':renderCoprimeGate,
  'gcd-mine':renderGcdMine,
  'lcm-race':renderLcmRace,
  'zero-factory':renderZeroFactory,
  'running-track':renderRunningTrack,
  'lamp-mission':renderLampMission,
  'number-balance':renderNumberBalance,
  'rectangle-puzzle':renderRectanglePuzzle,
  'paper-fold':renderPaperFold,
  'candy-filter':renderCandyFilter,
  'gear-ratio':renderGearRatio,
  'lcm-number-line':renderLcmNumberLine,
};

const lifeMissionRenderers = Object.fromEntries(lifeMissionLevels.map((mission) => [mission.id, makeLifeMissionRenderer(mission)]));

export const levelRenderers = { ...legacyRenderers, ...lifeMissionRenderers };
