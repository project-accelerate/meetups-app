import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { fetchQuery } from "./fetchQuery";

let environment = null;

// Browser Relay interface is created once and cached
export default function browserApiInterface({ records = {} } = {}) {
  if (environment) {
    return environment;
  }

  const network = Network.create(fetchQuery());
  const store = new Store(new RecordSource(records));

  environment = new Environment({
    network,
    store
  });

  return environment;
}
