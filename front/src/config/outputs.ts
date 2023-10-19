import ClientLocalStorage from "../models/client/client.local-storage";
import ProjectLocalStorage from "../models/project/project.local-storage";

const outputs = {
  client: {
    outputs: new ClientLocalStorage(),
  },
  project: {
    outputs: new ProjectLocalStorage(),
  }
}

export default outputs;