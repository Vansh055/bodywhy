import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { anatomyModelAdapter } from "../../anatomy/AnatomyModelAdapter";

const MODEL_PATHS = {
  male: "/models/body-male.glb",
  female: "/models/body-female.glb",
};

function getMaterialName(mesh) {
  if (!mesh?.material) return "";

  if (Array.isArray(mesh.material)) {
    return mesh.material
      .map((material) => material?.name || "")
      .join(" ")
      .toLowerCase();
  }

  return (mesh.material.name || "").toLowerCase();
}

function detectOrgan(mesh) {
  const name = (mesh.name || "").toLowerCase();
  const material = getMaterialName(mesh);

  if (
    material.includes("heart_mat") ||
    name.includes("heart") ||
    name.includes("cardiac_atrium") ||
    name.includes("cardiac_ventricle")
  ) {
    return "heart";
  }

  if (
    material.includes("lung_mat") ||
    name.includes("lung") ||
    name.includes("bronchopulmonary") ||
    name.includes("bronchus")
  ) {
    return "lungs";
  }

  if (
    material.includes("brain_mat") ||
    name.includes("brain") ||
    name.includes("cerebr") ||
    name.includes("cerebell")
  ) {
    return "brain";
  }

  if (
    material.includes("liver_mat") ||
    name.includes("liver") ||
    name.includes("hepatic")
  ) {
    return "liver";
  }

  if (
    material.includes("kidney") ||
    name.includes("kidney") ||
    name.includes("renal")
  ) {
    return "kidneys";
  }

  if (
    material.includes("bone_mat") ||
    name.includes("bone") ||
    name.includes("femur") ||
    name.includes("tibia") ||
    name.includes("fibula") ||
    name.includes("humerus") ||
    name.includes("radius") ||
    name.includes("ulna") ||
    name.includes("vertebra")
  ) {
    return "bones";
  }

  if (
    material.includes("artery_mat") ||
    material.includes("vein_mat") ||
    name.includes("artery") ||
    name.includes("vein") ||
    name.includes("vessel") ||
    name.includes("aorta")
  ) {
    return "blood";
  }

  return null;
}

function setHighlight(mesh, enabled) {
  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];

  materials.forEach((material) => {
    if (!material) return;

    if (enabled) {
      if (!material.userData.bodywhyOriginal) {
        material.userData.bodywhyOriginal = {
          emissive: material.emissive?.clone?.(),
          emissiveIntensity:
            material.emissiveIntensity,
        };
      }

      if (material.emissive) {
        material.emissive.set("#3fa9ff");
        material.emissiveIntensity = 1.5;
      }
    } else {
      const original =
        material.userData.bodywhyOriginal;

      if (!original) return;

      if (
        material.emissive &&
        original.emissive
      ) {
        material.emissive.copy(
          original.emissive
        );
      }

      material.emissiveIntensity =
        original.emissiveIntensity;

      delete material.userData.bodywhyOriginal;
    }
  });
}

export default function HumanModel({
  anatomy = "female",
  hoveredOrgan,
  onOrganSelect,
  onOrganHover,
}) {
  const modelPath =
    MODEL_PATHS[anatomy] || MODEL_PATHS.female;

  const { scene } = useGLTF(modelPath);

  /*
   * Identify interactive anatomy once.
   */
  useEffect(() => {
    let interactiveCount = 0;

    scene.traverse((object) => {
      if (!object.isMesh) return;

      const meshName =
        object.name?.toLowerCase() || "";

      const materialName =
        getMaterialName(object);

      /*
       * Skin remains visible but cannot block
       * interaction with internal anatomy.
       */
      if (
        meshName.includes("_skin") ||
        materialName.includes("skin_mat")
      ) {
        object.userData.bodywhyOrgan = null;
        object.raycast = () => {};
        return;
      }

      const detectedOrgan =
  detectOrgan(object);

const organ =
  anatomyModelAdapter.resolveCanonicalOrgan(
    detectedOrgan
  );

      object.userData.bodywhyOrgan = organ;

      if (organ) {
        object.userData.bodywhyInteractive = true;
        interactiveCount++;
      }
    });

    console.log(
      `BodyWhy: ${interactiveCount} interactive anatomical meshes detected`
    );
  }, [scene]);

  /*
   * Highlight the entire selected organ.
   */
  useEffect(() => {
    scene.traverse((object) => {
      if (!object.isMesh) return;

      const organ =
        object.userData.bodywhyOrgan;

      if (!organ) return;

      setHighlight(
        object,
        organ === hoveredOrgan
      );
    });

    /*
     * Cleanup highlight when component unmounts.
     */
    return () => {
      scene.traverse((object) => {
        if (!object.isMesh) return;

        const organ =
          object.userData.bodywhyOrgan;

        if (organ) {
          setHighlight(object, false);
        }
      });
    };
  }, [scene, hoveredOrgan]);

  return (
    <primitive
      object={scene}
      onPointerMove={(event) => {
        event.stopPropagation();

        const mesh = event.object;

        const organ =
          mesh?.userData?.bodywhyOrgan;

        if (!organ) {
          document.body.style.cursor =
            "default";

          onOrganHover?.(null);
          return;
        }

        document.body.style.cursor =
          "pointer";

        onOrganHover?.(organ);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();

        document.body.style.cursor =
          "default";

        onOrganHover?.(null);
      }}
      onClick={(event) => {
        event.stopPropagation();

        const mesh = event.object;

        const organ =
          mesh?.userData?.bodywhyOrgan;

        console.log(
          "BodyWhy organ clicked:",
          organ,
          mesh?.name
        );

        if (organ) {
          onOrganSelect?.(organ);
        }
      }}
    />
  );
}

useGLTF.preload("/models/body-female.glb");
useGLTF.preload("/models/body-male.glb");