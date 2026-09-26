import { ANATOMY_IDS } from "./anatomyIds";

export const anatomyConfig = {
  [ANATOMY_IDS.BODY]: {
    type: "body",
    label: "Human Body",
    systems: [
      ANATOMY_IDS.SYSTEMS.CARDIOVASCULAR,
      ANATOMY_IDS.SYSTEMS.RESPIRATORY,
      ANATOMY_IDS.SYSTEMS.NERVOUS,
      ANATOMY_IDS.SYSTEMS.DIGESTIVE,
      ANATOMY_IDS.SYSTEMS.URINARY,
      ANATOMY_IDS.SYSTEMS.MUSCULOSKELETAL,
      ANATOMY_IDS.SYSTEMS.ENDOCRINE,
      ANATOMY_IDS.SYSTEMS.IMMUNE,
      ANATOMY_IDS.SYSTEMS.REPRODUCTIVE,
      ANATOMY_IDS.SYSTEMS.INTEGUMENTARY,
      ANATOMY_IDS.SYSTEMS.SENSORY,
    ],
  },

  [ANATOMY_IDS.ORGANS.HEART]: {
    type: "organ",
    label: "Heart",
    system: ANATOMY_IDS.SYSTEMS.CARDIOVASCULAR,

    structures: [
      ANATOMY_IDS.STRUCTURES.RIGHT_ATRIUM,
      ANATOMY_IDS.STRUCTURES.RIGHT_VENTRICLE,
      ANATOMY_IDS.STRUCTURES.LEFT_ATRIUM,
      ANATOMY_IDS.STRUCTURES.LEFT_VENTRICLE,
      ANATOMY_IDS.STRUCTURES.MITRAL_VALVE,
      ANATOMY_IDS.STRUCTURES.TRICUSPID_VALVE,
      ANATOMY_IDS.STRUCTURES.AORTIC_VALVE,
      ANATOMY_IDS.STRUCTURES.PULMONARY_VALVE,
    ],

    animations: [
      "heartbeat",
      "blood_flow",
      "electrical_signal",
    ],
  },

  [ANATOMY_IDS.ORGANS.LUNGS]: {
    type: "organ",
    label: "Lungs",
    system: ANATOMY_IDS.SYSTEMS.RESPIRATORY,

    structures: [
      ANATOMY_IDS.STRUCTURES.RIGHT_LUNG,
      ANATOMY_IDS.STRUCTURES.LEFT_LUNG,
      ANATOMY_IDS.STRUCTURES.TRACHEA,
      ANATOMY_IDS.STRUCTURES.BRONCHI,
    ],

    animations: [
      "breathing",
      "airflow",
      "gas_exchange",
    ],
  },

  [ANATOMY_IDS.ORGANS.BRAIN]: {
    type: "organ",
    label: "Brain",
    system: ANATOMY_IDS.SYSTEMS.NERVOUS,

    structures: [
      ANATOMY_IDS.STRUCTURES.BRAINSTEM,
      ANATOMY_IDS.STRUCTURES.CEREBELLUM,
    ],

    animations: [
      "neural_activity",
    ],
  },

  [ANATOMY_IDS.ORGANS.LIVER]: {
    type: "organ",
    label: "Liver",
    system: ANATOMY_IDS.SYSTEMS.DIGESTIVE,

    structures: [],

    animations: [
      "blood_flow",
    ],
  },

  [ANATOMY_IDS.ORGANS.KIDNEYS]: {
    type: "organ",
    label: "Kidneys",
    system: ANATOMY_IDS.SYSTEMS.URINARY,

    structures: [
      ANATOMY_IDS.STRUCTURES.RIGHT_KIDNEY,
      ANATOMY_IDS.STRUCTURES.LEFT_KIDNEY,
    ],

    animations: [
      "filtration",
      "blood_flow",
    ],
  },

  [ANATOMY_IDS.ORGANS.BONES]: {
    type: "organ",
    label: "Bones",
    system: ANATOMY_IDS.SYSTEMS.MUSCULOSKELETAL,

    structures: [],

    animations: [],
  },

  [ANATOMY_IDS.ORGANS.BLOOD]: {
    type: "system_component",
    label: "Blood & Blood Vessels",
    system: ANATOMY_IDS.SYSTEMS.CARDIOVASCULAR,

    structures: [
      ANATOMY_IDS.STRUCTURES.AORTA,
    ],

    animations: [
      "blood_flow",
    ],
  },
};