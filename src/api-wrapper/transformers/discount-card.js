import Moment from 'moment';

const DiscountCardTransformer = {
  fromAPIModel(apiModel) {
    if (!apiModel) {
      return {
        valid: false,
        activated: false,
        startDate: false,
      }
    }
    const activated = apiModel.active === 'true';
    const currentDate = Moment.unix(apiModel.currentDate);
    const startDate = apiModel.startDate && activated ? Moment(apiModel.startDate) : null;
    const endDate = apiModel.endDate && activated ? Moment(apiModel.endDate) : currentDate.clone().add(3, 'days');

    let expired = false;

    if (startDate) {
      if (currentDate.isAfter(endDate)) {
        expired = true;
      }
    }

    return {
      ...apiModel,
      valid: !startDate || apiModel.active !== 'true' || !expired,
      expired: startDate && activated && expired,
      activated: activated,
      id: apiModel.nid,
      dateNow: Moment(),
      currentDate: currentDate,
      endDate: endDate,
      startDate: startDate ? startDate : currentDate,
    };
  },
};

export default DiscountCardTransformer;
