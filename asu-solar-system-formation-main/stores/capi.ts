import { CAPI } from 'api/Capi';
import { ICapiModel } from 'domainTypes';
import { capiSchema } from 'utils/capiSchema';
import { IS_DEBUG } from 'utils/consts';

export const capi = new CAPI<ICapiModel>(IS_DEBUG);
capi.init(capiSchema);

if (typeof window !== 'undefined') {
  (window as any).capi = capi;
}
