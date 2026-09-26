import { anatomyConfig } from "./anatomyConfig";
import { ANATOMY_IDS } from "./anatomyIds";

class AnatomyRegistry {
  constructor() {
    this.nodes = new Map();

    Object.entries(anatomyConfig).forEach(
      ([id, config]) => {
        this.nodes.set(id, {
          id,
          ...config,
        });
      }
    );
  }

  get(id) {
    return this.nodes.get(id) || null;
  }

  has(id) {
    return this.nodes.has(id);
  }

  getSystem(id) {
    return Object.values(anatomyConfig).find(
      (node) =>
        node.type === "system" &&
        node.id === id
    ) || null;
  }

  getOrgan(id) {
    const node = this.get(id);

    if (!node) {
      return null;
    }

    if (
      node.type !== "organ" &&
      node.type !== "system_component"
    ) {
      return null;
    }

    return node;
  }

  getBySystem(systemId) {
    return Array.from(this.nodes.values()).filter(
      (node) => node.system === systemId
    );
  }

  getStructures(organId) {
    const organ = this.get(organId);

    return organ?.structures || [];
  }

  getAnimations(organId) {
    const organ = this.get(organId);

    return organ?.animations || [];
  }

  resolve(id) {
    return this.get(id);
  }

  list() {
    return Array.from(this.nodes.values());
  }
}

export const anatomyRegistry =
  new AnatomyRegistry();

export { ANATOMY_IDS };