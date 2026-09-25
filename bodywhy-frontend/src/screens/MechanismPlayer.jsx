import { useParams } from "react-router-dom";
import MechanismPlayerExperience from "../components/mechanism/MechanismPlayer";

export function MechanismPlayer() {
  const { id } = useParams();
  return <MechanismPlayerExperience nodeId={id} />;
}
