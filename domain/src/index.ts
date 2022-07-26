import config from '@farmainfo/config';

import getPharmacyDetailUseCase from './pharmacy/useCases/factories/getPharmacyDetailUseCase';
import getPharmacyListUseCase from './pharmacy/useCases/factories/getPharmacyListUseCase';

const useCases = {
  get_pharmacy_detail_use_case: getPharmacyDetailUseCase,
  get_pharmacy_list_use_case: getPharmacyListUseCase,
};

const domain = {
  get: (useCase: keyof typeof useCases) => useCases[useCase]({ config }),
};

export default domain;
