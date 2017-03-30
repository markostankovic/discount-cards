import Moment from 'moment';
import transformDiscountCard from '../api-wrapper/transformers/discount-card';
export const REQUEST_DISCOUNT_CARD = 'REQUEST_DISCOUNT_CARD';
export const RECEIVE_DISCOUNT_CARD = 'RECEIVE_DISCOUNT_CARD';
export const INVALIDATE_DISCOUNT_CARD = 'INVALIDATE_DISCOUNT_CARD';
export const UPDATE_DISCOUNT_CARD = 'UPDATE_DISCOUNT_CARD';
export const REGISTERING_NEW_DISCOUNT_CARD = 'REGISTERING_NEW_DISCOUNT_CARD';
export const REGISTERED_NEW_DISCOUNT_CARD = 'REGISTERED_NEW_DISCOUNT_CARD';

export const requestCard = codeId => ({
  type: REQUEST_DISCOUNT_CARD,
  codeId
});

export const receivePosts = (codeId, json) => ({
  type: RECEIVE_DISCOUNT_CARD,
  codeId,
  cardData: json.length > 0 ? transformDiscountCard.fromAPIModel(json[0]) : transformDiscountCard.fromAPIModel(false),
  receivedAt: Date.now()
});

export const fetchCode = codeId => dispatch => {
  dispatch(requestCard(codeId));

  return fetch('http://gotravelersdiscount.com/discount-code/' + codeId)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(codeId, json)))
}

export const updateDiscountCard = cardData => dispatch => {
  return fetch('http://gotravelersdiscount.com/node/'+ cardData.id +'?_format=json', {
    method: 'PATCH',
    headers: {
      'Authorization': 'Basic bWFyZW5ldnJlbWU6M1NsZXBhbWlzYQ==',
      'Accept': 'application/hal+json',
      'Content-Type': 'application/hal+json',
      'X-CSRF-Token': '1_rxiHveMT7lA6ev8HkQcRLEY36Q7cGvy65Oxtjxjq0'
    },
    body: JSON.stringify({
      '_links': {'type': {'href': 'http://gotravelersdiscount.com/rest/type/node/discount_code'}},
      'type': [{
        'target_id': 'discount_code'
      }],
      'field_start_date': [{'value': cardData.startDate.format('X')}],
      'field_end_date': [{'value': cardData.endDate.format('X')}],
      'field_active': [{'value': '1'}],
    })
  }).then(response => console.log('---up---', response))
}

export const registeringCard = serialNumber => ({
  type: REGISTERING_NEW_DISCOUNT_CARD,
  serialNumber
});

export const registeredCard = (codeId, json) => ({
  type: REGISTERED_NEW_DISCOUNT_CARD,
  newCard: json ? json : null,
});

export const registerNewDiscountCard = (serialNumber, distributorId) => dispatch => {
  const startDate = Moment().format('X');

  dispatch(registeringCard(serialNumber));

  const body = {
    '_links': {'type': {'href': 'http://gotravelersdiscount.com/rest/type/node/discount_code'}},
    'type': [{
      'target_id': 'discount_code'
    }],
    'title': [{'value': startDate + '_' + serialNumber}],
    'field_serial_number': [{'value': serialNumber}],
    'field_discount_code': [{'value': '0'}],
    'field_distributor': [{
      target_id: distributorId,
      target_type: "taxonomy_term" }],
  };

  return fetch('http://gotravelersdiscount.com/entity/node?_format=hal_json', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic bWFyZW5ldnJlbWU6M1NsZXBhbWlzYQ==',
      'Accept': 'application/hal+json',
      'Content-Type': 'application/hal+json',
      'X-CSRF-Token': '1_rxiHveMT7lA6ev8HkQcRLEY36Q7cGvy65Oxtjxjq0'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
    .then(json => dispatch(registeredCard(serialNumber, json)))
}