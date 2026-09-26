import { ANATOMY_IDS } from "./anatomyIds";

const organAliases = {
  heart: ANATOMY_IDS.ORGANS.HEART,
  lungs: ANATOMY_IDS.ORGANS.LUNGS,
  brain: ANATOMY_IDS.ORGANS.BRAIN,
  liver: ANATOMY_IDS.ORGANS.LIVER,
  kidneys: ANATOMY_IDS.ORGANS.KIDNEYS,
  bones: ANATOMY_IDS.ORGANS.BONES,
  blood: ANATOMY_IDS.ORGANS.BLOOD,
};

class AnatomyModelAdapter {
  constructor() {
    this.sourceMappings = new Map();
  }

  registerSource(sourceName, mappings) {
    this.sourceMappings.set(
      sourceName,
      mappings
    );
  }

  resolveOrgan(sourceName, sourceOrgan) {
    const mappings =
      this.sourceMappings.get(sourceName);

    if (!mappings) {
      return null;
    }

    return mappings[sourceOrgan] || null;
  }

  resolveCanonicalOrgan(sourceOrgan) {
    return organAliases[sourceOrgan] || null;
  }

  registerMesh(
    sourceName,
    meshName,
    canonicalId
  ) {
    if (!this.sourceMappings.has(sourceName)) {
      this.sourceMappings.set(
        sourceName,
        {}
      );
    }

    const mappings =
      this.sourceMappings.get(sourceName);

    mappings[meshName] = canonicalId;
  }

  getCanonicalId(
    sourceName,
    meshName
  ) {
    const mappings =
      this.sourceMappings.get(sourceName);

    return mappings?.[meshName] || null;
  }
}

export const anatomyModelAdapter =
  new AnatomyModelAdapter();