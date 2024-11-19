import NodeCache from "node-cache";
const cache = new NodeCache({ useClones: false });

export default cache;
