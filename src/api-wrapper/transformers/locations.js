const LocationsTransformer = {
  fromAPIModel(apiModel) {
    return apiModel.map(location => {

      const coordinate = location.field_location.length > 0 ? {
        latitude: parseFloat(location.field_location[0].lat),
        longitude: parseFloat(location.field_location[0].lon),
      } : null;

      const tags = location.field_tag.length > 0 ? location.field_tag.map(tag => tag.target_id) : null;

      return {
        name: location.field_location_name.length > 0 ? location.field_location_name[0].value : null,
        address: location.field_address.length > 0 ? location.field_address[0].value : null,
        locationId: location.nid[0].value,
        coordinate,
        tags,
      }
    });
  },
};

export default LocationsTransformer;
