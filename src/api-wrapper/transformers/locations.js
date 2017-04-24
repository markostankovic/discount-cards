const LocationsTransformer = {
  fromAPIModel(apiModel) {
    return apiModel.map(location => {

      const coordinate = location.field_location.length > 0 ? {
        latitude: parseFloat(location.field_location[0].lat),
        longitude: parseFloat(location.field_location[0].lon),
      } : null;

      const tags = location.field_tag.length > 0 ? location.field_tag.map(tag => tag.target_id) : null;
      const images = location.field_images.length > 0 ? location.field_images.map(img => img.url) : null;

      return {
        name: location.field_location_name.length > 0 ? location.field_location_name[0].value : null,
        address: location.field_address.length > 0 ? location.field_address[0].value : null,
        description: location.field_description.length > 0 ? location.field_description[0].value : null,
        discountAmount: location.field_discount_amount.length > 0 ? location.field_discount_amount[0].value : 0,
        locationId: location.nid[0].value,
        coordinate,
        tags,
        images,
      }
    });
  },
};

export default LocationsTransformer;
