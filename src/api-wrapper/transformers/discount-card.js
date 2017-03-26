import Moment from 'moment';

const DiscountCardTransformer = {
  fromAPIModel(apiModel) {
    const activated = apiModel.active === 'true';
    const currentDate = Moment.unix(apiModel.currentDate);
    const startDate = apiModel.startDate && activated ? Moment(apiModel.startDate) : null;
    const endDate = apiModel.endDate && activated ? Moment(apiModel.endDate) : currentDate.clone().add(3, 'days');

    let validCard = true;

    if (startDate) {
      if (currentDate.isAfter(endDate)) {
        validCard = false;
      }
    }

    return {
      ...apiModel,
      valid: !startDate || apiModel.active !== 'true' || validCard,
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
