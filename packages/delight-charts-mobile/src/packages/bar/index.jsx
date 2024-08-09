import component from './Bar';
import { withInstall } from "../../utils/componentInstall"

const Bar = withInstall(component);

export { Bar, Bar as default}