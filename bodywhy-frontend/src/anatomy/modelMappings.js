import { ANATOMY_IDS } from "./anatomyIds";
import { anatomyModelAdapter } from "./AnatomyModelAdapter";

const hraOrganMappings = {
  heart: ANATOMY_IDS.ORGANS.HEART,
  lungs: ANATOMY_IDS.ORGANS.LUNGS,
  brain: ANATOMY_IDS.ORGANS.BRAIN,
  liver: ANATOMY_IDS.ORGANS.LIVER,
  kidneys: ANATOMY_IDS.ORGANS.KIDNEYS,
  bones: ANATOMY_IDS.ORGANS.BONES,
  blood: ANATOMY_IDS.ORGANS.BLOOD,
};

anatomyModelAdapter.registerSource(
  "hra",
  hraOrganMappings
);

export default hraOrganMappings;