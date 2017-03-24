import Moment from 'moment';

const DiscountCardTransformer = {
  fromAPIModel(apiModel) {
    const startDate = apiModel.startDate ? Moment(apiModel.startDate).add(3, 'days') : null;
    const currentDate = Moment.unix(apiModel.currentDate);
    let validCard = true;

    if (startDate) {
      if (currentDate.isAfter(startDate)) {
        validCard = false;
      }
    }

    return {
      ...apiModel,
      valid: !startDate || apiModel.active !== 'true' || validCard,
      activated: apiModel.active === 'true',
      dateNow: Moment(),
    };
  },
};

export default DiscountCardTransformer;
